import { findParent } from "../libs/utils"

export function Menu(props){
    const {options} = props
    return(
        <div className="float-menu" id="menu" onClick={e=> findParent(e.target, 'menu').style.scale="0"}>
            <ul className="fl-mn-ul">                
                {options.map((element, i) => (
                    <div key={i}>
                    {(element.name!=null)&&(
                        
                        <li key={i} onClick={e=> element.action(e)}>
                            <div className="fl-mn-btn">{element.name}</div>
                        </li>
                    )}
                    </div>
                ))} 
            </ul>
            
        </div>
    )  
}