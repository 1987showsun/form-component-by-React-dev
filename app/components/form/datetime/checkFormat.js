export function checkFormat(val,showTime){
    let str            = val;
    let re;
    if( showTime ){
        re = new RegExp("^([0-9]{4})[.-]{1}([0-9]{1,2})[.-]{1}([0-9]{1,2})[. ]{1}([0-9]{1,2})[.:]{1}([0-9]{1,2})[.:]{1}([0-9]{1,2})$");
    }else{
        re = new RegExp("^([0-9]{4})[.-]{1}([0-9]{1,2})[.-]{1}([0-9]{1,2})$");
    }
    let strDataValue;
    let infoValidation = true;
    if ((strDataValue  = re.exec(str)) != null) {
        var i;
        i = parseFloat(strDataValue[1]);
        if (i <= 0 || i > 9999) { /*年*/
        infoValidation = false;
        }
        i = parseFloat(strDataValue[2]);
        if (i <= 0 || i > 12) { /*月*/
        infoValidation = false;
        }
        i = parseFloat(strDataValue[3]);
        if (i <= 0 || i > 31) { /*日*/
        infoValidation = false;
        }
    } else {
        infoValidation = false;
    }
    if (!infoValidation) {
        //alert("請輸入 YYYY/MM/DD 日期格式");
    }
    return infoValidation;
}


export function checkDate(type,val){
    let valLength  = String( val ).length;
    let supplement = type=='year'? 4-valLength : 2-valLength ;
    let text       = "";

    for( let i=0 ; i<supplement ; i++ ){
        text = text+'0';
    }
    text = text+String( val<=0? 1:val );

    return text;
}