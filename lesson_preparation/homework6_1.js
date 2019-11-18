'use strict';

let money;

let start = function(){
    do{
        money = prompt('Ваш месячный доход?', 30000);
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
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    periodMission:0,
    percentDeposite: 0,
    moneyDeposite: 0,
    asking: function(){

        if(confirm("Есть ли у вас дополнительный доход?")){
            let itemIncome;
            do{
                itemIncome = prompt("Какой у вас дополнительный доход?", "Репетитор");
            }
            while(!isNaN(itemIncome) || itemIncome === '' || itemIncome === null);
            let cashIncome;
            do{
                cashIncome = prompt("Сколько в месяц вы на этом зарабатываете?", 5000);
            }
            while(isNaN(cashIncome) || cashIncome === '' || cashIncome === null);
            
            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses = prompt('Возможные расходы за рассчитываемый период через запятую', 'квартплата,проезд');
            appData.addExpenses = addExpenses.toLocaleLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
        let expenditures,
            expendituresValue;
            for(let i = 0; i < 2; i++){
                do{
                    expenditures = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Страховка' + (i + 1));
                }
                while(!isNaN(expenditures) || expenditures === '' || expenditures === null);
                
                    do{
                        expendituresValue = prompt('Во сколько это обойдется?', 1000);
                    }
                    while(isNaN(expendituresValue) || expendituresValue === '' || expendituresValue === null);
                    appData.expenses[expenditures] =+ expendituresValue;
            }
        
   },
    getExpensesMonth: function(){ //Сумма всех расходов за месяц
        for (let key in appData.expenses){
            appData.expensesMonth += appData.expenses[key];
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
    },
    getInfoDeposit: function(){
        if(appData.deposit){
            do{
                appData.percentDeposite = prompt('Какой годовой процент?', 10);
            }
            while(isNaN(appData.percentDeposite) || appData.percentDeposite === '' || appData.percentDeposite === null);
                        
            do{
                appData.moneyDeposite = prompt('Какая сумма заложена?', 10000);
            }
            while(isNaN(appData.moneyDeposite) || appData.moneyDeposite === '' || appData.moneyDeposite === null);
            
        }
    },
    calcSaveMoney: function(){
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
appData.getInfoDeposit();

let string = appData.addExpenses.join(", ");

console.log(
string.split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ')
);

//console.log("Возможные расходы: " + string);




/*for (let key in appData){
    console.log(" Наша программа включает в себя данные: " + key + " составляет " + appData[key]);
}*/




