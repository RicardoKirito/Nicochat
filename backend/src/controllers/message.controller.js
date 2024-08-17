import Message from "../models/message.model.js";
import userModel from "../models/user.model.js";
import Chat from "../models/chat.model.js";
import { deleteFile } from "../libs/uploadFile.js";
import { updateChat } from "./chat.controller.js";

export const getMessages = async (req, res) => {
  const messages = await Message.find({
    chatid: req.params.id,
  });

  res.json([messages]);
};

export const addMessage = async (message) => {
  const add = await Message.create({
    from: message.from,
    body: message.body,
    file: message.file,
    chatid: message.chatid,
    state: message.state,
    edided: false,
  });

  // If there is not chat on the receiver we add it
  const chat = await userModel.findOne(
    { _id: message.to, "contacts.chat_id": message.chatid },
    { contacts: 1 }
  );

  if (!chat) {
    await userModel.updateOne(
      { _id: message.to },
      {
        $addToSet: {
          contacts: {
            chat_id: message.chatid,
            userid: message.from,
            username: message.username,
            nickname: "",
            blocked: false,
          },
        },
      }
    );
  }
  await Chat.updateOne({ _id: message.chatid }, { last_message: add._id });
  unreadMessages({ id: message.to, chatid: message.chatid }, 1);
  return add;
};
//Update the new messages for the receiver
async function unreadMessages(opt, valor) {
  const count = await userModel.findOne(  { _id: opt.id, "contacts.chat_id": opt.chatid }, {'contacts.$': 1, _id: 0})
  console.log(count)
  if(count.contacts[0].unreadMessages-1<0 && valor===-1){

    await userModel.updateOne(
      { _id: opt.id, "contacts.chat_id": opt.chatid },
      { $set: { "contacts.$.unreadMessages": 0 } }
    );
  }else{
    await userModel.updateOne(
      { _id: opt.id, "contacts.chat_id": opt.chatid },
      { $inc: { "contacts.$.unreadMessages": valor } }
    );

  } 
}
export const deleteMessage = async (req, res) => {
  const hasFile = await Message.find(
    { _id: req.params.id },
    { file: 1, chatid: 1 }
  );
  if (hasFile[0].file) {
    deleteFile(hasFile[0].file, hasFile[0].chatid);
  }
  const deletedMessage = await Message.updateOne(
    { _id: req.params.id },
    { $set: { body: "Deleted Message", state: "deleted", file: null } }
  );
  res.json(deletedMessage);
};
export const updateMessage = async (req, res) => {
  const updatedMessage = await Message.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  const chatid = await Message.find(
    { _id: req.params.id },
    { chatid: 1, _id: 0 }
  );
  if (updatedMessage.acknowledged === true && req.body.state === "seen")
    unreadMessages({ id: req.user.id, chatid: chatid[0].chatid }, -1);

  res.json(updatedMessage);
};
