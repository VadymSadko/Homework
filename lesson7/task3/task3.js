'use strict';

function clock() {
    let d = new Date(),
        monthNum = d.getMonth(),
        day = d.getDate(),
        hours = d.getHours(),
        minutes = d.getMinutes(),
        seconds = d.getSeconds(),
        month=new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
    
    if (day <= 9) day = "0" + day;
    if (hours <= 9) hours = "0" + hours;
    if (minutes <= 9) minutes = "0" + minutes;
    if (seconds <= 9) seconds = "0" + seconds;
    
    var dateTime =  hours + ":" + minutes + ":" + seconds + " " + day + "." + month[monthNum] + "." + d.getFullYear();
    if (document.layers) {
     document.layers.doc_time.document.write(dateTime);
     document.layers.doc_time.document.close();
    }
    else document.getElementById("doc_time").innerHTML = dateTime;
     setTimeout("clock()", 1000);
    }