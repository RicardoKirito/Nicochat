import { useEffect, useRef } from 'react';
import close_icon from '../assets/close.svg'
import { lastMessageAgo } from '../libs/message_time';
export function GalleryComponent(props){

    const {files, showGallery, chatid, setImage} = props;
    const DateGrup = useRef(null)
    const f = [...files]

    return(
        <div className="upload-image h-100">
            <div className='controls' onClick={()=>{
                showGallery(null)          
            }}>
                <span className='close-btn'>
                    <img src={close_icon} alt="close" />
                </span>
            </div>
            <div className="preview-container">
                <div className="card w-50 d-flex flex-column w-100" style={{backgroundColor: "rgb(var(--backgroundL1))", color: "rgb(var(--color1))"}}>
                    <div className="card-body overflow-auto">
                        <h5 className="card-title">Gallery</h5>
                        <div className="grid">
                            {f.length>0?
                                f.reverse().map((imgObj, i)=>(
                                    <>
                                        {(DateGrup.current !== lastMessageAgo(new Date(imgObj?.createdAt))) && (<h3 key={i+2}>{DateGrup.current = lastMessageAgo(new Date(imgObj?.createdAt))}</h3>)}
                                            <div key={i} style={{maxWidth: "15rem", height:"15rem"}} onClick={e=>setImage(imgObj.img)}>
                                                <img src={imgObj.img} />
                                            </div>
                                        
                                    </>
                                )).concat(DateGrup.current = null)
                                
                            :
                            <h1 className='position-absolute' style={{top: "30%", left: "50%", translate: "-50%"}}>Aun no hay imagenes</h1>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}