

export function uniqueBy(array, by){
    const unique = new Set()
    const objs = []
    array.forEach(obj => {
        if(!unique.has(obj[by])){
            unique.add(obj[by])
            objs.push(obj)
        }
    });
    return objs
}
