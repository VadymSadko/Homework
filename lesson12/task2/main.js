    'use strict';
    
    function getTimerRemaining(){
        let  date = new Date(), 
             dateStop = new Date('January 1, 2020').getTime(), 
             dateNow = new Date().getTime(),
             timeRemaining = (dateStop - dateNow) / 1000, 
             seconds = Math.floor(timeRemaining % 60), 
             minutes = Math.floor((timeRemaining / 60) % 60), 
             hours = Math.floor(timeRemaining / 60 /60) % 24, 
             day = Math.floor(timeRemaining / 60 /60 / 24),
             timeToString = date.toLocaleTimeString();
            
        return{ timeRemaining, hours, minutes, seconds, day, timeToString, date };
    }
    
      let timeDay = document.createElement('p'),  
            today = document.createElement('p'),  
            currentTime  = document.createElement('p'), 
            newYear = document.createElement('p'); 

    function presentDay(){  
            let time = getTimerRemaining();
            if(time.hours >= 0 && time.hours <= 5){
                timeDay.textContent = ('Доброй ночи');
            }
            else if(time.hours >= 6 && time.hours <= 9){
                timeDay.innerText = ('Доброt утро');
            }
            else if(time.hours >= 10 && time.hours <= 17){
                timeDay.innerText = ('Добрый день');
            }
            else if(time.hours >= 18 && time.hours <= 21){
                timeDay.innerText = ('Добрый вечер');
            }
            else if(time.hours >= 22 && time.hours <= 24){
                timeDay.innerText = ('Доброй ночи');
            }
           
            let  week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
            today.textContent = 'Сегодня: ' + week[time.date.getDay()];
    
            function clock(){
                let time = getTimerRemaining();
                currentTime.textContent = `Текущее время: ${time.timeToString}`;
                setInterval(clock, 1000);
            } 
            clock();

            if(time.timeRemaining > 0){
                newYear.textContent = `До Нового года осталось ${time.day} дней`;
            } else{
                newYear.textContent = ' Новый год наступил!';
            }
    } 

        document.body.appendChild(timeDay);
        
        document.body.appendChild(today);
       
        document.body.appendChild(currentTime);
        
        document.body.appendChild(newYear);

        presentDay();
