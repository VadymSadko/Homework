'use strict';

let income = 'Freelance';

let mission = 50000;

let money;

let start = function(){
    do{
        money = prompt('Ваш месячный доход?');
        console.log('money: ', money); 
    }
    while(isNaN(money) || money === '' || money === null);
};
start();

let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'квартплата, проезд');

let deposit = confirm('Есть ли у вас депозит в банке?');

let costsName1,
    costsName2;

let getExpensesMonth = function(){
    let sum = 0;
    let num;
    for (let i = 0; i < 2; i++){
        if (i === 0){
            costsName1 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Страховка');
        }
            
        if (i === 1){
            costsName2 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Кредит');
        }
        do{
            num = prompt('Во сколько это обойдется?');
        }
        while(isNaN(num) || num === '' || num === null);
        sum += +num;
        }
    return sum;
};
let expentsesAmount = getExpensesMonth();

let getAccumulatedMonth = function(){
    return money - expentsesAmount;
};
let accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function(){
    return mission / accumulatedMonth;
};
let showTypeOf = function(data){
    console.log(data, typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let period = getTargetMonth();

let savingMmoney = function(data){
    console.log("Месячный бюджет составит" + ' ' + data);
};
savingMmoney(accumulatedMonth);

let budgetDay = accumulatedMonth / 30;

let getStatusIncome = function(){
    if (budgetDay >= 800){
        console.log('Высокий уровень дохода');
    } else if(budgetDay < 800 && budgetDay >= 300){
        console.log('Средний уровень дохода');
    } else if(budgetDay < 300 && budgetDay >= 0){
        console.log('Низкий уровень дохода');
    } else {console.log('Что-то пошло не так');
    }
};
getStatusIncome();

let purpose = function(data){
    if (data > 0){
        console.log("Цель будет достигнута через" + ' ' + Math.floor(data) + ' ' + 'месяцев');
    } else {
        console.log("Цель не будет достигнута" );
    }
};
purpose(period);