export function lastMessageAgo(time){
    const dateTime = new Date(time)
    const now = new Date();
    const timeAgo = {
        year: dateTime.getFullYear()-now.getFullYear(), 
        month: now.getMonth()-dateTime.getMonth(),
        date: dateTime.getDate(),
        hour: dateTime.getHours(),
        minute: dateTime.getMinutes()
    }

    const dayAgo = (timeAgo.date>now.getDate() || timeAgo.month>0)? new Date(timeAgo.year, timeAgo.month-1, 0).getDate() - timeAgo.date + now.getDate(): now.getDate() - timeAgo.date;
    if(timeAgo.year<0 && timeAgo.month>=0) return dateTime.toLocaleDateString();
    
    if(dayAgo === 0 && timeAgo.month===0) return "today"

    if(dayAgo===1 && timeAgo.month === 0) return "yesterday";

    if(dayAgo<=6 && timeAgo.month<=1) return dateTime.toLocaleDateString(undefined, {weekday: 'long'});
    
    if(dayAgo>6) return dateTime.toLocaleDateString(undefined, {month: 'long', day: 'numeric'});  
    

}
export function DateTime(time){

    if(lastMessageAgo(time) == "today") return new Date(time).toLocaleTimeString([],{hour:"numeric", minute:"2-digit", hour12:true});

    return lastMessageAgo(time);


}

export function getFileDate(filename){
    const code = parseInt(filename.substring(10, 23));
    return lastMessageAgo(new Date(code))

}