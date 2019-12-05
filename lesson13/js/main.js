window.addEventListener('DOMContentLoaded', function(){
'use strict';

// таймер 
const countTimer = (deadline) => {
    const timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');
        
    const getTimeRemaining = () => {
        const dataStop = new Date(deadline).getTime(),
            dataNow = new Date().getTime(),
            timeRemaining = (dataStop - dataNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);
            return{timeRemaining, hours, minutes, seconds};
};
    const addZero = (hours, minutes, seconds) => {
    if (hours <= 9){
        hours = "0" + hours;
    }
    if (minutes <= 9){
        minutes = "0" + minutes;
    }
    if (seconds <= 9){
        seconds = "0" + seconds;
    }
};
addZero();

    const updateClock = () =>{
        const timer = getTimeRemaining();

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
    };

    updateClock();

};

countTimer ('10 december 2019');

// меню
const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
        menu = document.querySelector('menu'),
        closeBtn = document.querySelector('.close-btn'),
        menuItems = menu.querySelectorAll('ul>li');

    const handlerMenu = () => {
        menu.classList.toggle('active-menu'); // появление меню css + js
        
        
        /*if(!menu.style.transform || menu.style.transform === `translate(-100%)`){  //появление меню js
            menu.style.transform = `translate(0)`;
        }else{
            menu.style.transform = `translate(-100%)`;
        }*/
    };
    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);
    
    menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));  //перебираем элементы li

};

toggleMenu();

});

//popup
const togglePopup = () => {
    const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupClose = document.querySelector('.popup-close'),
        popupContent = document.querySelector('.popup-content');
        

    popupBtn.forEach((elem) => {
        elem.addEventListener('click', () => {
            popup.style.display = 'block';
            if(window.screen.availWidth > 768){
                let count = 0;
                let flyInterval;
                const popupMoov =() => {
                    flyInterval = requestAnimationFrame(popupMoov);
                    count++;
                    if(count <= 10){
                        popupContent.style.top = count + '%';
                        popupContent.style.left = count * 5 + '%';
                    }else{
                    cancelAnimationFrame(flyInterval);
                    }
                };
                let idInterval = setTimeout(popupMoov, 10);
            }else{
                popupContent.style.top = 10 + '%';
                popupContent.style.left = 50 + '%';
            }
        });
    });

    popupClose.addEventListener('click', () => {
        popup.style.display = 'none';
    });
};

togglePopup();