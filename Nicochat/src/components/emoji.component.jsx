import { findParent } from "../libs/utils";

export function Emojie(props) {

    const { setMessage } = props;

    const style = {
        height: "300px",
        width: "350px",
        background: "rgb(var(--backgroundL2))",
        fontSize: "1.5rem",
        color: "rgb(var(--color2))",
        userSelect: "none",
        padding: "4px",
        top: '-309px',
        left: '-91px',
    }
    const emojies = `😀 😃 😄 😁 😆 😅 😂 🤣 🥲 🥹 ☺️ 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤨 🧐 🤓 😎 🥸 🤩 🥳 🙂‍↕️ 😏 😒 🙂‍↔️ 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 🥺 😢 😭 😮‍💨 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓 🫣 🤗 🫡 🤔 🫢 🤭 🤫 🤥 😶 😶‍🌫️ 😐 😑 😬 🫨 🫠 🙄 😯 😦 😧 😮 😲 🥱 😴 🤤 😪 😵 😵‍💫 🫥 🤐 🥴 🤢 🤮 🤧 😷 🤒 🤕 🤑 🤠 😈 👿 👹 👺 🤡 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾`
    const emjiesList = emojies.split(' ');
    return (
        <div style={{ height: "0px" }} className="position-relative no-show" id="parent">

            <div className="d-flex flex-wrap gap-1 position-absolute " style={style}>
                <div className="flex-grow-1 w-100 d-flex justify-content-between">
                    <span>Emojies</span>
                    <span className="close-btn" onClick={e=> findParent(e.target, 'parent').classList.add('no-show')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon icon-tabler icons-tabler-outline icon-tabler-x">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M18 6l-12 12" />
                            <path d="M6 6l12 12" />
                        </svg>
                    </span>
                </div>
                <div className="d-flex flex-wrap overflow-auto" style={{height: "80%"}}>

                    {
                        emjiesList.map((emojie, i) => (
                            <div key={i} className="emojie" onClick={() => setMessage(m => m + emojie)}>{emojie}</div>
                        ))


                    }
                </div>
            </div>
        </div>
    )

} 