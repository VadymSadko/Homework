window.addEventListener('DOMContentLoaded', function(){
'use strict';

function countTimer(deadline){
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');
        
    function getTimeRemaining(){
        let dataStop = new Date(deadline).getTime(),
            dataNow = new Date().getTime(),
            timeRemaining = (dataStop - dataNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);
            if (hours <= 9){
                hours = "0" + hours;
            }
            if (minutes <= 9) {
                minutes = "0" + minutes;
            }
            if (seconds <= 9) {
                seconds = "0" + seconds;
            }
            return{timeRemaining, hours, minutes, seconds};
    }

    function updateClock(){
        let timer = getTimeRemaining();

        timerHours.textContent = timer.hours;
        timerMinutes.textContent = timer.minutes;
        timerSeconds.textContent = timer.seconds;

        if(timer.timeRemaining > 0){
            setInterval(updateClock, 1000);
        } else{
            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
        }
    }

    updateClock();

}

countTimer ('03 december 2019');

});