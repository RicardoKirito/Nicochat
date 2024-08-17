
export function ObserveMessages(rootClass, action){
    const root = document.querySelector(rootClass)
    const obv = new IntersectionObserver(
        entries=>{
            entries.forEach(element => {
                if(element.isIntersecting){
                    action(element.target.dataset.id)
                    element.target.nextElementSibling.classList.remove("m-last")
                    element.target.dataset.state = "seen"
                    obv.unobserve(element.target)

                }
                
            });
        }, 
        {
            root,
            threshold: 1,
            
        }
    )
    return obv
}