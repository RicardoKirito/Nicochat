import { findParent } from "/src/libs/utils.js"

export function showMenu(e){
    document.addEventListener("click", e=>{
        document.querySelectorAll(".float-menu").forEach(el=> el.style.scale="0")
    })
    document.querySelectorAll(".float-menu").forEach(el=> el.style.scale="0")
    e.stopPropagation()
    
    const menuParent = findParent(e.target, 'parent')

    const menu = menuParent.querySelector(".float-menu");
    menu.style.scale = "1";
    const rects = menu.getBoundingClientRect();
    const coords = {x: rects.x<70?Math.abs(rects.x)+50:0, y: rects.y<70?Math.abs(rects.y)+50:0};
    menu.style.translate = `${coords.x}px ${coords.y}px`;

}