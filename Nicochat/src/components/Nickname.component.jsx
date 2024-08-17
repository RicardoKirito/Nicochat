export function NicknameComponent(props){
    const {newNickname, selectedChat, setNewNickname, addNickname} = props;

    function handler(e){

        e.preventDefault();
        const valid = e.target.querySelector("input").validity.valid;
        const err = e.target.querySelector(".no-show");
        !valid? err.classList.remove("no-show") : addNickname('submit');
        setTimeout(()=>{
            err.classList.add("no-show");
        }, 5000)
    }

    return(
        <div className="upload-image h-100">
            <div className="preview-container">
                <div className="card w-50 d-flex flex-column h-fit" style={{backgroundColor: "rgb(var(--backgroundL1))", color: "rgb(var(--color1))"}}>
                    <div className="card-body">
                        <h5 className="card-title">Change contacts nickname</h5>
                            <form className='d-flex flex-column  gap-2 card-body h-100' onSubmit={handler}>
                                <div className="card-tex d-flex flex-column">
                                    <div className="d-flex gap-3 align-items-center mb-2">
                                        <h5>Nickname</h5>{(selectedChat.reset !== selectedChat.username) && (<button className="btn btn-outline-warning" onClick={e=>addNickname('reset')}>Reset</button>)}
                                    </div>
                                    <span className="text-danger no-show">Nickname can't be empty</span>
                                    <input type='text' required pattern=".*\S+.*" className="rounded-pill border-1 ps-3" value={newNickname==null? selectedChat.username: newNickname} onChange={e=>setNewNickname(e.target.value)} />
                                    
                                </div>
                                <div className='car-link'>
                                    <button type='submit' className='btn text-highlight me-4 '>save</button>
                                    <button className='btn btn-outline-secondary' value={"cancel"} onClick={e=>{e.preventDefault(); setNewNickname(null)}}>cancel</button>

                                </div>
                            </form>
                    </div>
                </div>
            </div>
        </div>
    )
}