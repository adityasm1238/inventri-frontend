exports.getDateString = (date)=>{
    let date_ob = new Date(date);
    let d = ("0" + date_ob.getDate()).slice(-2);
    let m = ("0" + (date_ob.getMonth() + 1)).slice(-2); 
    let y = date_ob.getFullYear();  
    return d + "-" + m + "-" + y;  
};

exports.getDate = (date)=>{
    let date_ob = new Date(date);
    let d = ("0" + date_ob.getDate()).slice(-2);
    let m = ("0" + (date_ob.getMonth() + 1)).slice(-2); 
    let y = date_ob.getFullYear();  
    return y + "-" + m + "-" + d;  
};