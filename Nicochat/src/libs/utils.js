export function repositionImage(imgId){
    const img = imgId.target;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    console.log(img)

    img.onload = function (){
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        canvas.width = width;
        canvas.height = height;
        const crop = getComputedStyle(img).objectPosition;
        
        console.log(`crop${crop}, width:${width}, height:${height} img: ${this.naturalWidth} ${this.height}`)

        context.drawImage(img, 0, 99, width, height, 0, 0, width, height);
        const img2 = document.getElementById('umm');

        const render = new FileReader();

        canvas.toBlob(blob=>{
            if(blob){
                render.readAsDataURL(blob)
            }
        })
        render.onload = (e)=>{
            img2.src = render.result;
            console.log(img2)
        }
    }


}
export function findParent(target, id){
    if(target.id === id) return target
    return findParent(target.parentElement, id)
}

(function prepareTheme(){
    if(localStorage.getItem('theme')){
        const currentTheme = localStorage.getItem('theme');
        document.body.className = currentTheme;
    }else{
        if(window.matchMedia('(prefers-color-scheme: dark)').matches){
            localStorage.setItem('theme', 'dark');
            console.log(document.getElementById('dark'));  
            document.getElementById('dark').checked = true;  
        }else{
            localStorage.setItem('theme', 'default')  
            document.getElementById('default').checked = true;  
        }
    }
})()

export function setTheme(theme){
    console.log(theme)
        localStorage.setItem('theme', theme);
        document.body.className = theme;
}

