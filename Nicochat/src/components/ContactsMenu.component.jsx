import { useAuth } from "../context/AuthContext";
import { showMenu } from "../libs/Show_menu";
import { Menu } from "./Menu.component";

export function ContactsMenu(props) {
    const { filesPath, searchChat, logoutHandler} = props
    const {user} = useAuth()
    function showSettings(){
        const theRoot = document.querySelector(":root");
        theRoot.style.setProperty("--profileSettingsShow", "opacityandshow");
        theRoot.style.setProperty("--profileSettingsOpCl", "100% 100%");
    }
    
    return (
        <div className="menu-contacts d-flex align-items-center">
            <div className='d-flex gap-1 p-3 justify-content-around w-100 align-items-center'>
                <div className='rounded-pill flex-grow-1 overflow-hidden ps-1 d-flex search' style={{ height: "40px" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon icon-tabler icons-tabler-outline icon-tabler-search">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                        <path d="M21 21l-6 -6" />
                    </svg>
                    <input type="search" placeholder='Search...' className='border-0' name="search" id="search" onChange={e => searchChat(e.target.value)} autoComplete='off' />
                </div>
                <div className='avatar' title={user.username} onClick={() => showSettings()}>
                    {(user.picture) && (
                        <img src={`${filesPath}/profile/${user?.picture}`} />
                    )} 
                </div>
                <div id="parent" title='settings' className='p-1 settings-profile' onClick={e => showMenu(e)} >
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                        <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                    </svg>
                    <div className='position-relative'>
                        <Menu options={[
                            { name: "Settings", action() { showSettings() } },
                            { name: "Logout", action() { logoutHandler() } }
                        ]} />
                    </div>
                </div>
            </div>
        </div>
    )
}