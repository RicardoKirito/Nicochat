import { useChat } from "../context/ChatContext";
import { showMenu } from "../libs/Show_menu";
import { Menu } from "./Menu.component";
import { DateTime } from "../libs/message_time";
export function ContactComponent(props){
    const {chat, chats, id, selectedChat, setSelectedChat, user} = props
    const {deleteChat, editChat} =useChat()
    const menuOptions = [];
    menuOptions.push({name: "Delete chat", action(e){
        if(id){
            deleteChat(id); 
            setTimeout(()=>{

                if(id === selectedChat.id){
                    chats();
                    setSelectedChat([])
                }

            }, 500)
            e.stopPropagation()
        }
        e.target.parentElement.parentElement.parentElement.style.scale="0";
    }})
    menuOptions.push({name: "Block chat", action(e){
        if(id){
            editChat({id:id,blocked: true});
            chats();
            e.stopPropagation()

        }
        e.target.parentElement.parentElement.parentElement.style.scale="0";
        
    }})
    return(
        <div style={{position: "relative", width: "100%"}} id="parent">
            <div style={{display:"flex", justifyContent:"space-between"}}>
                <div style={{display:"flex"}}>    
                    <div className="avatar">
                        {(chat?.userid?.picture || chat?.picture)&&(
                            <img src={chat?.userid?.picture || chat?.picture} alt={chat.username} />
                        )}
                    </div>
                    <div className="chat-info">
                        <div className="contact-name">
                            {chat.nickname||chat.username}
                        </div>
                        {chat.chat_id && (
                        <div className="last-contact-message ">
                            {(chat.chat_id?.last_message?.state === 'deleted') && (<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-square-rounded-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10l4 4m0 -4l-4 4" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /></svg>)}

                            <span title={chat.chat_id?.last_message?.body}>
                                {chat.chat_id?.last_message?.body}
                            </span>
                        </div>
                        )}

                    </div>
                </div>
                <div className="d-flex align-items-center">

                {(chat.chat_id)&&(
                    <>                
                    {chat?.unreadMessages !== 0 && (
                        <div className=" d-flex align-items-center flex-wrap" >
                            <sub className="new-message-count" style={{alignContent: 'center'}}>{chat.unreadMessages}</sub>
                        </div>
                    )}
                        <div className="elipsis-mn align-self-center" onClick={(e)=>{showMenu(e)}}>
                            <svg height="24" width="28" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                            </svg>
                        </div>
                    </>
                )}
                </div>
                
            </div>
                <div className="message-status">
                    <sub style={{fontSize:"0.7rem", right:"0px", position:"absolute"}}>{chat.chat_id? DateTime(chat?.chat_id?.last_message?.createdAt): ""} <span>{(user.id === chat?.chat_id?.last_message?.from)&& (chat.chat_id?.last_message?.state)}</span></sub> 
                </div>
            <Menu options={menuOptions} />
            
        </div>
    )
}