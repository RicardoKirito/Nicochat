import { useAuth } from "../context/AuthContext";
import { showMenu } from "../libs/Show_menu";
import { findParent, setTheme } from "../libs/utils";
import { ChangePasswordComponent } from "./ChangePassword.component";
import { Menu } from "./Menu.component";

export function AppSettings(props) {

    const { filesPath, setImagePreview, logoutHandler, ws } = props
    const { user } = useAuth()
    function hiddeSettings() {

        const theRoot = document.querySelector(":root");
        theRoot.style.setProperty("--profileSettingsShow", "opacityandhidde");
        theRoot.style.setProperty("--profileSettingsOpCl", "0% 100%");
    }

    function choosePicture(e){
        findParent(e.target, "parent").querySelector("#image").click()
    }
    function renderPriview(e){
        const picture = e.target.files[0];
        const render = new FileReader();
        render.readAsDataURL(picture);
        render.onload = ()=>{
        const file = {
            info: picture.name,
            data: render.result
          }
          ws.send(JSON.stringify({
            profilePicture: { id: user.id, file }
        }))
        location.reload();
        }
        
      }
    return (
        <div className='app-settings'>
            <div className='settings-wrapper pt-4 px-4'>
                <div className='d-flex justify-content-between align-items-center'>
                    <h1>Profile</h1>
                    <span className='close-btn' title='close' onClick={() => { hiddeSettings() }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon icon-tabler icons-tabler-outline icon-tabler-x">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M18 6l-12 12" />
                            <path d="M6 6l12 12" />
                        </svg>
                    </span>
                </div>
                <div className='my-profile d-flex gap-2 align-items-center'>
                    <div className="position-relative" style={{ width: "fit-content" }} id="parent">
                        <figure className='avatar' style={{ width: "100px", height: "100px" }}  onClick={e => showMenu(e)}>
                            {(user.picture) && (
                                <img src={`${filesPath}/profile/${user?.picture}`} />
                            )}
                        </figure>
                        <Menu options={[
                            user?.picture?{ name: "View Picture", action() {setImagePreview(`${filesPath}/profile/${user.picture}`) } }:{},
                            { name: `${user?.picture?"Change Picture":"Add a picture"}`, action(e) { choosePicture(e) } }

                        ]}></Menu>
                        <input type="file" hidden name="image" id="image" onChange={renderPriview} />
                    </div>
                    <div className='my-info '>
                        <h3>{user.username}</h3>
                        <p>{user.email}</p>
                    </div>
                </div>
                <div className="settings-opt flex-grow-1 d-flex flex-column mt-3">
                    <h5 className='mb-3'>Settings</h5>
                    <div className="opt">
                        <div className='d-flex gap-2' onClick={e => { findParent(e.target, "chanpas").nextElementSibling.classList.toggle("no-show") }} id="chanpas">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-password-user">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 17v4" /><path d="M10 20l4 -2" />
                                <path d="M10 18l4 2" /><path d="M5 17v4" />
                                <path d="M3 20l4 -2" /><path d="M3 18l4 2" />
                                <path d="M19 17v4" /><path d="M17 20l4 -2" />
                                <path d="M17 18l4 2" /><path d="M9 6a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                                <path d="M7 14a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2" />
                            </svg>
                            <h4 className='flex-grow-1'>Change password</h4>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon align-self-center icon-tabler icons-tabler-outline icon-tabler-message-cog" >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M6 9l6 6l6 -6" />
                            </svg>
                        </div>
                        <div className='opt-show no-show'>
                            <ChangePasswordComponent></ChangePasswordComponent>
                        </div>
                    </div>
                    <div className="opt">
                        <div className='d-flex gap-2' onClick={e => { findParent(e.target, "chanpas").nextElementSibling.classList.toggle("no-show") }} id="chanpas">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-message-cog">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M8 9h8" />
                                <path d="M8 13h6" />
                                <path d="M12.031 18.581l-4.031 2.419v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v5" />
                                <path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                <path d="M19.001 15.5v1.5" />
                                <path d="M19.001 21v1.5" />
                                <path d="M22.032 17.25l-1.299 .75" />
                                <path d="M17.27 20l-1.3 .75" />
                                <path d="M15.97 17.25l1.3 .75" />
                                <path d="M20.733 20l1.3 .75" />
                            </svg>
                            <h4 className='flex-grow-1'>Chats settings</h4>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon align-self-center icon-tabler icons-tabler-outline icon-tabler-message-cog" >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M6 9l6 6l6 -6" />
                            </svg>
                        </div>
                        <div className='opt-show no-show'>
                            <div className="form-check d-flex flex-column">
                                <div>

                                    <label className="form-check-label" htmlFor="default">Default </label>
                                    <input className="form-check-input" type="radio" role="radio" name='theme' id="default" value={"default"} onChange={e => { if (e.target.checked) setTheme(e.target.value) }} />
                                </div>
                                <div>

                                    <label className="form-check-label" htmlFor="lighty">Lighty Mode</label>
                                    <input className="form-check-input" type="radio" role="radio" name='theme' id="lighty" value={"lighty"} onChange={e => { if (e.target.checked) setTheme(e.target.value) }} />
                                </div>
                                <div>

                                    <label className="form-check-label" htmlFor="dark">Dark Mode</label>
                                    <input className="form-check-input" type="radio" role="radio" name='theme' id="dark" value={"dark"} onChange={e => { if (e.target.checked) setTheme(e.target.value) }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opt">
                        <div className='d-flex gap-2' onClick={e => { findParent(e.target, "chanpas").nextElementSibling.classList.toggle("no-show") }} id="chanpas">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-bell">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                                <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                            </svg>
                            <h4 className='flex-grow-1'>Notifications</h4>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon align-self-center icon-tabler icons-tabler-outline icon-tabler-message-cog" >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M6 9l6 6l6 -6" />
                            </svg>
                        </div>
                        <div className='opt-show no-show'>

                        </div>
                    </div>
                </div>
                <div className="logout-c">
                    <button className='logout-b d-flex gap-2' onClick={logoutHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-logout">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                            <path d="M9 12h12l-3 -3" />
                            <path d="M18 15l3 -3" />
                        </svg>
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    )
}