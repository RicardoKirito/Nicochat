import { useMessage } from "../context/MessageContext";
import deleted_icon from "../assets/deleted.svg";
import { Menu } from "./Menu.component";
import { showMenu } from "../libs/Show_menu";

export default function Message(props){
    const {msg, setImagePreview, filesPath, user, refresh, setId, setMessage} = props; 
    const {deleteMessage} = useMessage();
    const Menuoptions = [];
    const currentTime = new Date();
    const messageDate = new Date(msg.createdAt)
    if(msg.body 
        && currentTime.toLocaleDateString() === messageDate.toLocaleDateString() 
        && currentTime.getHours() === messageDate.getHours() 
        && (currentTime.getMinutes() - messageDate.getMinutes()<15)
    )
    {
        Menuoptions.push(
        {name: "Edit", action(e){
        if(msg._id){
            const menu = e.target.parentElement.parentElement;
            menu.style.scale="0";
            setId(msg._id);
            setMessage(menu.parentElement.parentElement.querySelector(".message-b")?.textContent)
        }
        }})
    }
    Menuoptions.push({ name: "Delete", action(e){
            if(msg._id)
            {
                deleteMessage(msg._id); 
                refresh(msg._id, "Deleted Message", "deleted");
                e.stopPropagation();
            }
                e.target.parentElement.parentElement.parentElement.style.scale="0";
            }
    })

    return (

            <div id='parent' className={"message position-relative overflowtext "+ (msg.from===user.id?"my-message ":"contact-message ")} data-id={msg._id} data-state={msg.from!== user.id?msg.state: ""}>
                
                <div className="position-absolute h-100 ">
                   <Menu options={Menuoptions}/>
                </div>

                {msg.file && (
                    <div className="file" onClick={()=> setImagePreview(filesPath+`chat/${msg.chatid}/`+msg.file)}>
                        <img src={filesPath+`chat/${msg.chatid}/`+msg.file} alt={msg.file} />
                    </div>
                )}

                <div>
                    {(msg.body) && (
                        <p className="message-b"><span>{(msg.state==="deleted") && (<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-square-rounded-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10l4 4m0 -4l-4 4" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /></svg>)}</span>{msg.body}</p>
                    )}
                    {(msg.from === user.id && msg.state !=="deleted") &&(
                        <div className="elipsis-mn" onClick={(e)=>{showMenu(e)}}>
                                <svg height="24" width="28" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                        </div>

                    )}
                </div>
                <p className="time">
                    {new Date(msg.createdAt).toLocaleTimeString([],{hour:"numeric", minute:"2-digit", hour12:true})}<span className="edited">{msg.edited === true?"edited ": ""}</span> <span className="state">{user.id === msg.from? msg.state : ''}</span>
                </p>
            </div>

    )
}