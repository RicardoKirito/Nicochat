export function ChatSettings(props) {
    const { selectedChat, setChatSettings,  setImagePreview, addNickname } = props
    return (
        <div className='settings px-3'>
            <div className='d-flex justify-content-around align-items-center'>
                <h1>Contact Info</h1>
                <span className='close-btn' title='close' onClick={() => setChatSettings(null)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon icon-tabler icons-tabler-outline icon-tabler-x">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M18 6l-12 12" />
                        <path d="M6 6l12 12" />
                    </svg>
                </span>
            </div>
            <hr />
            <div className='user-info d-flex flex-column align-items-center mt-4'>
                <div className='avatar' style={{ width: "200px", height: "200px" }}>
                    {(selectedChat.picture) && (
                        <img src={selectedChat.picture} onClick={() => setImagePreview(selectedChat.picture)} />
                    )}
                </div>
                <div className='d-flex justify-content-center align-items-center w-100'>
                    {(selectedChat.username !== selectedChat.reset) ? (
                        <>
                            <h3 className='ms-5 d-flex flex-column'>
                                {selectedChat.username}
                                <h6>Nickname</h6>
                            </h3>
                            <div className='button-outline-highlight' onClick={() => addNickname('show')} title='change'>
                                <svg title='change' xmlns="http://www.w3.org/2000/svg" width={18} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                            </div>
                        </>
                    ) : (
                        <button className='btn text-outline-highlight mt-3' onClick={() => addNickname('show')} title='Add a nickname'>Add a nickname</button>
                    )}

                </div>
            </div>
            <hr />
            <div>
                <h4></h4>
                <div className='text-start ps-4'>
                    <label>Username</label>
                    <h6>{selectedChat.reset}</h6>
                    <label>Email</label>
                    <h6>{selectedChat.email}</h6>
                </div>
            </div>
        </div>
    )
}