import { useState } from "react"
import { useAuth } from "../context/AuthContext"


export function ChangePasswordComponent(){
    const {user, changePassword} = useAuth()
    const [current, setCurrent] = useState('')
    const [newP, setNewP] = useState('')
    const [confirm, setConfirm] = useState('')
    const [err, setErr] = useState('')
    const [success, setSucces] = useState(null);
    const [waiting, setWaiting] = useState(null)
    const handler =async (e)=>{
        e.preventDefault();
        if(newP !== confirm){
            setErr("The password doesn't match")
            setTimeout(()=>setErr(''), 5000)
        }else{
            setWaiting(true)
            const res = await changePassword({
                id: user.id,
                current: current, 
                newP: newP, 
            })
            if(res.status === 200){
                setSucces(res.res);
                setTimeout(()=>{
                    setConfirm('');
                    setNewP('')
                    setCurrent('')
                    setWaiting(null)
                    setSucces(null)
                    setErr('')
                }, 10000)
            }else{
                setErr(res.res)
                
                setWaiting(null)
            }
        }
    }
    




    return (
        <>
        {waiting?(
            <div className="h-100 w-100 d-flex align-items-center justify-content-center">
                {(!success && !err)&&(
                    <div className="loader"></div>
                )}
                <h1 className="text-success">{success}</h1>
            </div>
        ):(
            
            <form onSubmit={handler} className="ps-3 outline-0">
                <span className="text-danger d-block">{err}</span>
                <label>Current password</label>
                <input className="rounded-pill border-0 ps-3 outline-0" placeholder="your password..." type="password" name='current' value={current} onChange={e=>setCurrent(e.target.value)} required/>
                <label>New password</label>
                <input className="rounded-pill border-0 ps-3" placeholder="your password..." type="password" name='new' value={newP} onChange={e=>setNewP(e.target.value)} required/>
                <label>Confimr password</label>
                <input className="rounded-pill border-0 ps-3" placeholder="confirm it..." type="password" name='repeat' value={confirm} onChange={e=>setConfirm(e.target.value)} required/>
                <button className="btn mt-2 text-highlight"  type="submit">save</button>
            </form>
        )}
        </>
    )


}