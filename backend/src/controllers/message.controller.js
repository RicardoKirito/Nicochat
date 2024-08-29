import Message from "../models/message.model.js";
import userModel from "../models/user.model.js";
import Chat from "../models/chat.model.js";
import imgModel from "../models/img.model.js";

export const getMessages = async (req, res) => {
  const messages = await Message.find({
    chatid: req.params.id,
  }).populate({path: 'file', select: 'img'});

  res.json([messages]);
};

export const addMessage = async (message) => {

  const add = await Message.create({
    from: message.from,
    body: message.body,
    file: null,
    chatid: message.chatid,
    state: message.state,
    edided: false,
  });
 if(message.file){
   const imgAdd = await imgModel.create({
     folder: `chat/${message.chatid}`,
     img: message.file,
     messageid: add._id
   });
   await Message.updateOne(
     { _id: add._id },
     { $set: {file: imgAdd._id }}
   );
   add.file = imgAdd
 }


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
  if(count)
    {
      if (count.contacts[0].unreadMessages - 1 < 0 && valor === -1) {
        await userModel.updateOne(
          { _id: opt.id, "contacts.chat_id": opt.chatid },
          { $set: { "contacts.$.unreadMessages": 0 } }
        );
      } else {
        await userModel.updateOne(
          { _id: opt.id, "contacts.chat_id": opt.chatid },
          { $inc: { "contacts.$.unreadMessages": valor } }
        );
      }
    }
}
export const deleteMessage = async (req, res) => {
  const deletedMessage = await Message.updateOne(
    { _id: req.params.id },
    { $set: { body: "Deleted Message", state: "deleted", file: null } }
  );
  await imgModel.deleteOne({messageid: req.params.id})
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
