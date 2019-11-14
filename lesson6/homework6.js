'use strict';

let money;

let start = function(){
    do{
        money = prompt('Ваш месячный доход?');
        console.log('money: ', money); 
    }
    while(isNaN(money) || money === '' || money === null);
};
start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 12,
    budget: {money},
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    periodMission:0,
    asking: function(){
        let addExpenses = prompt('Возможные расходы за рассчитываемый период через запятую', 'квартплата, проезд');
            appData.addExpenses = addExpenses.toLocaleLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
        let expenditures,
            expendituresValue;
            for(let i = 0; i < 2; i++){
                expenditures = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Страховка' + (i + 1));
                do{
                    expendituresValue = prompt('Во сколько это обойдется?');
                }
                while(isNaN(expendituresValue) || expendituresValue === '' || expendituresValue === null);
                appData.expenses[expenditures] =+ expendituresValue;
            }
        
   },
    getExpensesMonth: function(){ //Сумма всех расходов за месяц
        for (let key in appData.expenses){
            appData.expensesMonth +=appData.expenses[key];
        }
    },
    
    getBudget: function(){
        appData.budgetMonth = money - appData.expensesMonth;  //Месячный бюджет (доход - сумма расходов)
        appData.budgetDay = Math.floor(appData.budgetMonth/30); //Дневной бюдже (Месячный бюджет разделенный на 30 дней)
    },

    getTargetMonth: function(){
        appData.periodMission = Math.floor(appData.mission / appData.budgetMonth);
    },
    getStatusIncome: function(){
        if (appData.budgetDay >= 800){
            console.log('Высокий уровень дохода');
        } else if(appData.budgetDay < 800 && appData.budgetDay >= 300){
            console.log('Средний уровень дохода');
        } else if(appData.budgetDay < 300 && appData.budgetDay >= 0){
            console.log('Низкий уровень дохода');
        } else {console.log('Что-то пошло не так');
        }
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.log("Расходы за месяц - " + appData.expensesMonth);
console.log("Цель будет достигнута через - " + appData.periodMission);
console.log("Месячный бюджет - " + appData.budgetMonth);




for (let key in appData){
    console.log(" Наша программа включает в себя данные: " + key + " составляет " + appData[key]);
}





/*let expentsesAmount = appData.getExpensesMonth();

let accumulatedMonth = appData.getAccumulatedMonth();

let period = appData.getTargetMonth();

let savingMmoney = function(data){
    console.log("Месячный бюджет составит" + ' ' + data);
};
savingMmoney(accumulatedMonth);

let budgetDay = accumulatedMonth / 30;

appData.getStatusIncome();

let purpose = function(data){
    if (data > 0){
        console.log("Цель будет достигнута через" + ' ' + Math.floor(data) + ' ' + 'месяцев');
    } else {
        console.log("Цель не будет достигнута" );
    }
};
purpose(period);*/