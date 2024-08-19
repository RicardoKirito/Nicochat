import { useEffect, useRef, useState } from 'react';
import close_icon from '../assets/close.svg'
import { useAuth } from "../context/AuthContext.jsx";
import { uniqueBy } from "../libs/uniqueBy.js"
import { useMessage } from '../context/MessageContext.jsx';
import Message from '../components/Message.componen.jsx';
import { useChat } from '../context/ChatContext.jsx';
import { ContactComponent } from '../components/Contact.component.jsx';
import { ObserveMessages } from '../libs/observer.js';
import { lastMessageAgo } from "../libs/message_time.js";
import { GalleryComponent } from '../components/Gallery.component.jsx';
import { NicknameComponent } from '../components/Nickname.component.jsx';
import { ContactsMenu } from '../components/ContactsMenu.component.jsx';
import { AppSettings } from '../components/AppSettings.component.jsx';
import { ChatInfo } from '../components/ChatInfo.component.jsx';
import { ChatSettings } from '../components/ChatSettings.component.jsx';
import { Emojie } from '../components/emoji.component.jsx';


export default function Chat() {

    const { user, logout } = useAuth()
    const { getMessages, editMessage, getFile } = useMessage();
    const { getChats, addChat, search, editChat } = useChat();
    const [id, setId] = useState('');
    const [filesPath, setFilesPath] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([])
    const [selectedChat, setSelectedChat] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [onlinePeople, setOnlinePeople] = useState({})
    const [ws, setWs] = useState(null);
    const [file, setFile] = useState(null)
    const [newNickname, setNewNickname] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageGallery, setImageGallery] = useState(null);
    const messageDates = useRef(null);
    const [ChatFiles, setChatFiles] = useState([])
    const [chatSettings, setChatSettings] = useState(null);
    const Obv = useRef(null);

    function getAllChatMessages(id) {
        getMessages(id).then(res => {
            res.status === 200 ? setMessages(...res.data) : Promise.reject(res)
        }).catch(err => {
            console.error(err)

        })
        getFile().then(res => setFilesPath(res));
    }

    useEffect(() => {
        if (selectedChat.id) {
            getAllChatMessages(selectedChat.id)
        }
        setChatSettings(null)
    }, [selectedChat])

    function scrollToLastMessage(behavior="instant"){
        const m = document.querySelector(".m-last") || document.querySelector(".last")
        if (m) {
            m.scrollIntoView({
                alignToTop: true,
                block: "nearest",
                behavior: behavior
            })
        }
        if (user.id == messages[messages.length-1]?.from) {
            const m = document.querySelector(".last")
            if (m) {
                m.scrollIntoView({
                    alignToTop: true,
                    block: "end",
                    behavior: behavior
                })
            }/* 
            var eso =  new Audio("../assets/sounds/MynewMessagesound.mp3")
            var qe = document.getElementsByTagName("audio").play()
            eso.play() */
        }
    }
    useEffect(() => {
        
        scrollToLastMessage();
        const noread = document.querySelectorAll("[data-state='sent']");
        noread.forEach(element => {
            Obv.current.observe(element)
        });
    }, [messages])


    const showOnlinePeople = (e) => {
        const online = {}
        if ('online' in e) {
            e.online.forEach(({ userid, username }) => {

                if (!(user.username === username)) {
                    online[userid] = username;
                }

            });
        }
        setOnlinePeople(online);

    }



    const messageHandler = (e) => {
        if (e.data) {
            const messageData = JSON.parse(e.data)

            if ('online' in messageData) {
                showOnlinePeople(messageData)
            }
            else if ('from' in messageData) {
                setMessages(prev => [...prev, messageData])
                
                
            } else if ('newMessage' in messageData) {
                Chats()

            }
            else if ('updateMessage' in messageData) {
                const container = document.querySelector(`[data-id='${messageData.updateMessage}']`)
                if (container) {
                    const messageuptaded = container.querySelector(".message-b")
                    if (!messageuptaded) {
                        const p = document.createElement("p")
                        container.insertAdjacentElement("afterbegin", p)
                        p.classList.add("message-b")
                    }
                    const state = container.querySelector(".state")
                    const edited = container.querySelector(".edited")
                    const img = container.querySelector(".file")
                    switch (messageData.state) {
                        case "deleted":
                            if (messageData.state === "deleted") {
                                if (img) container.removeChild(img);
                                state.textContent = messageData.state
                                const elipsisMn = container.querySelector(".elipsis-mn")
                                if (messageuptaded) messageuptaded.innerHTML = `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-square-rounded-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10l4 4m0 -4l-4 4" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /></svg>> ${messageData.body || messageuptaded.textContent}`;
                                elipsisMn.parentElement.removeChild(elipsisMn)
                            }
                            break;
                        case "sent":
                            if (messageuptaded) messageuptaded.textContent = messageData.body || messageuptaded.textContent;
                            break;
                        case "seen":
                            if (messageData.body == null) {
                                container.classList.remove('last');
                                state.textContent = messageData.updater === user.id ? "" : messageData.state;
                            }

                            break
                        case true:
                            if (messageuptaded) messageuptaded.textContent = messageData.body || messageuptaded.textContent;
                            edited.textContent = "edited ";
                            break;

                    }
                }
                setTimeout(() => {
                    Chats();

                }, 500)

            }
        }

    }

    function updateMessage(id, text, state = 'sent') {
        ws.send(JSON.stringify({
            update: id,
            body: text,
            state,
        }))

    }
    function sendMessage(event) {
        event.preventDefault();

        if (id) {
            editMessage(id, { body: message, edited: true })
            setMessage('');
            setId('');
            setFile(null);
            setImagePreview(null);
            updateMessage(id, message, true)
            return
        }

        ws.send(JSON.stringify({
            body: message,
            file,
            to: selectedChat.to,
            chatid: selectedChat.id
        }
        ))
        setMessage('');
        setFile(null)
        setImagePreview(null)
    }
    useEffect(() => {
        const seenMessage = (id) => {
            setTimeout(() => {
                editMessage(id, { state: 'seen' });
                updateMessage(id, null, "seen")
            }, 500)
        }
        Obv.current = ObserveMessages("messages", seenMessage);
    }, [ws]);
    function connectToServer() {
        try {

            if (!ws) {
                const ws = new WebSocket(`wss://${window.location.host}/api`)
                setWs(ws);

                ws.addEventListener('message', messageHandler)
                ws.addEventListener('close', (e) => {
                    const timer = setTimeout(() => {
                        console.log("reconectiong")
                        connectToServer();
                    }, 5000)
                    clearTimeout(timer);
                    messageHandler(e)
                })
            }
            Chats()

        } catch (err) {
            console.error(err)
        }
    }
    function sendFile(ev) {
        const file = ev.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setFile({
                info: file.name,
                data: reader.result
            })
            setImagePreview(reader.result)
        }

    }
    const theRoot = document.querySelector(":root");
    async function addNickname(opt) {

        switch (opt) {
            case 'submit':
                if (newNickname.nickname !== selectedChat.username && newNickname.nickname !== '') {
                    await editChat({ id: selectedChat.id, nickname: newNickname })
                    selectedChat.username = newNickname;
                    Chats();
                    setNewNickname(null)
                } else {
                    setNewNickname(null);
                }
                break
            case 'reset':
                setNewNickname(null);
                await editChat({ id: selectedChat.id, nickname: "" })
                selectedChat.username = selectedChat.reset;
                Chats();
                break
            case 'show':
                setNewNickname(selectedChat.username)
                break
        }

    }
    async function addToChat(user) {
        const chat = await addChat({ userid: user._id, username: user.username })
        setSelectedChat({ id: chat._id, username: user.username, to: user.id, picture: user.picture,email: user.email })
        Chats()
    }
    async function Chats() {
        const chats = await getChats();
        setSearchResult(chats);
    }
    async function searchChat(username) {
        if (username) {
            const results = await search(username)
            setSearchResult(results);
        } else {
            Chats()
        }
    }
    useEffect(() => {
        connectToServer();
        getFile().then(res => setFilesPath(res));
    }, []);

    function logoutHandler() {
        ws.close()
        setWs(null);
        logout()

    }
    return (
        <div className='chatContainer'>
            <div className='chatWrapper'>
                {(newNickname || newNickname == '') && (

                    <NicknameComponent newNickname={newNickname} selectedChat={selectedChat} setNewNickname={setNewNickname} addNickname={addNickname}></NicknameComponent>
                )}
                {(imageGallery) && (
                    <GalleryComponent files={ChatFiles} showGallery={setImageGallery} filepath={filesPath} chatid={selectedChat.id} setImage={setImagePreview}></GalleryComponent>
                )}
                {(imagePreview) && (
                    <div className='upload-image' >
                        <div className='controls' onClick={() => {
                            setFile(null)
                            setImagePreview(null)

                        }}>
                            <span className='close-btn'>
                                <img src={close_icon} alt="close" />
                            </span>
                        </div>
                        <div className='preview-container'>
                            <img src={imagePreview} />
                        </div>
                    </div>
                )}
                <div className='left'>
                    <div className='left-wrapper'>

                        <AppSettings  filesPath={filesPath} setImagePreview={setImagePreview} ws={ws} logoutHandler={logoutHandler}></AppSettings>
                        <div className='contacts-wrapper'>

                            <ContactsMenu filesPath={filesPath} searchChat={searchChat} logoutHandler= {logoutHandler}></ContactsMenu>
                            <div className="contacts overflowtext">
                                {searchResult.map((chat, i) => (

                                    <div className={"contact"} id={(chat.chat_id?._id || chat.id) === selectedChat.id ? "selected-contact" : ""} key={i}
                                        onClick={() => {
                                            chat.chat_id ?
                                                setSelectedChat({ id: chat.chat_id._id, reset: chat.username, username: chat.nickname || chat.username, to: chat?.userid?._id, picture: chat?.userid?.picture || chat?.picture, email:  chat?.userid?.email || chat?.email})
                                                : addToChat(chat)
                                        }}>
                                        <ContactComponent chat={chat} chats={Chats} filesPath={filesPath} id={chat.chat_id?._id} selectedChat={selectedChat} user={user} setSelectedChat={setSelectedChat} ></ContactComponent>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right">
                    {selectedChat.id ? (
                        <>
                            <div className="conversation">

                                <ChatInfo onlinePeople={onlinePeople} selectedChat={selectedChat} filesPath={filesPath} setSelectedChat={setSelectedChat} setChatFiles={setChatFiles} setImageGallery={setImageGallery} setChatSettings={setChatSettings}></ChatInfo>
                                <div className='messages px-3'>
                                    {

                                        uniqueBy(messages, '_id').map((msg, i) => (
                                            <>
                                                {messageDates.current !== lastMessageAgo(msg.createdAt) && (
                                                    <div key={i + 1} className='date-devider sticky'>{messageDates.current = lastMessageAgo(msg.createdAt)} </div>
                                                )}
                                                <Message key={i} setId={setId} msg={msg} filesPath={filesPath} setImagePreview={setImagePreview} setMessage={setMessage} user={user} refresh={updateMessage}></Message>
                                                {(msg.state === 'sent' && msg.from !== user.id) && (<div className='m-last' style={{ height: "3px" }}></div>)}
                                            </>
                                        ))
                                    }
                                    <div className="last" style={{ height: "3px" }}></div>
                                    <div className='rounded-circle position-absolute to-last'onClick={()=>scrollToLastMessage("smooth")} >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                                        </svg>

                                    </div>
                                </div>

                                <form className="form" onSubmit={(e)=>{sendMessage(e); e.target.querySelector("#parent").classList.add("no-show")}} style={{ zIndex: (file) ? "var(--z-index-6)" : "" }}>
                                    <div className='rounded-pill form-wrapper'>
                                        <Emojie setMessage={setMessage}></Emojie>
                                        <span className='emojie' onClick={e=>e.target.previousElementSibling.classList.toggle('no-show')}>☺️</span>
                                        <input type="text" className="input-message" name='message' placeholder='type your message' onChange={e => setMessage(e.target.value)} value={message} autoComplete='off' />
                                        <input hidden type="file" name="file" id="file" title='upload a file' onChange={sendFile} />
                                        {(!id) && (<label htmlFor="file">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-paperclip"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5" /></svg>
                                        </label>)}
                                    </div>
                                    <button type="submit">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-send-2">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" />
                                            <path d="M6.5 12h14.5" />
                                        </svg>
                                    </button>
                                    {(id) && (
                                        <label onClick={e => {
                                            e.preventDefault()
                                            setId('')
                                            setMessage('')
                                        }}>X</label>
                                    )}
                                </form>
                            </div>
                            {(chatSettings) && (

                                <ChatSettings selectedChat={selectedChat} setChatSettings={setChatSettings} filesPath={filesPath}  setImagePreview={setImagePreview} addNickname={addNickname}></ChatSettings>
                            )}
                        </>
                    ) : (
                        <div className="no-selected-chat w-100">
                            <h1 >Select  a person to start chatting</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
