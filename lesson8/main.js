'use strict';
let start = document.getElementById('start'), 
    cancel = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'), 
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1], 
    depositCheck = document.querySelector('#deposit-check'), 
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'), 
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpenses = document.querySelector('.additional_expenses'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    targetAmount = document.querySelector('.target-amount'),
    incomeItems = document.querySelectorAll('.income-items');
         

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    expensesMonth: 0,
    addExpenses: [],
    deposit: false,
    persentDeposit: 0,
    momeyDeposit: 0,
    start: function(){

        appData.budget = +salaryAmount.value;
        
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getIncomeMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.changeRange();
        appData.blocking();

        appData.showResult();

        

    },
    activBtn: function() {
        if (salaryAmount.value !== '') {
            start.disablede('disabled');
        }
      },

    showResult:function(){
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = Math.ceil(appData.budgetDay);
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth()); //округление в большую сторону
        periodSelect.addEventListener('change', function(){
            incomePeriodValue.value = appData.calcPeriod();
        });

    }, 

    blocking: function(){
        document.querySelectorAll('input[type=text]').forEach(function(item){
            item.disabled = true;
        });
        start.style.display = 'none';
        cancel.style.display = 'block';
    },

    addExpensesBlock: function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        }
    },
    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            incomePlus.style.display = 'none';
        }
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cachExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cachExpenses !== ''){
                appData.expenses[itemExpenses] = cachExpenses;
            }
        });
    },
    getIncome: function(){
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cachIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cachIncome !== ''){
                appData.income[itemIncome] = cachIncome;
            }
        });


        /*if(confirm('Есть ли у Вас дополнительный источник заработка?')){
            let itemIncome = prompt('Какой?', 'Репетитор');
            let cachIncome = prompt('Сумма дополнительного дохода?', '10000');
            appData.income[itemIncome] = cachIncome;
        }
        for(let key in appData.income){
            appData.incomeMonth += +appData.income[key];
        }*/
    },
    
    changeRange: function(){
        periodAmount.textContent = periodSelect.value;
    },

    getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim(); //убирает пробелы в начале и в конце
            if (item !== ''){
                appData.addExpenses.push(item); 
            }
        });
    },
    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },

    getExpensesMonth: function(){ //Сумма всех расходов за месяц
        for (let key in appData.expenses){
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getIncomeMonth: function(){ //Сумма всех расходов за месяц
        for (let key in appData.income){
            appData.incomeMonth += +appData.income[key];
        }
    },
    
    getBudget: function(){
        //Месячный бюджет (доход - сумма расходов)
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;  
        //Дневной бюдже (Месячный бюджет разделенный на 30 дней)
        appData.budgetDay = appData.budgetMonth/30; 
    },

    getTargetMonth: function(){
        return targetAmount.value / appData.budgetMonth;
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
    calcPeriod: function(){
        return appData.budgetMonth * periodSelect.value;
    }

};

salaryAmount.addEventListener('keyup', appData.activBtn);
  
salaryAmount.addEventListener('keyup', appData.checkLength);

start.addEventListener('click', appData.start);

expensesPlus.addEventListener('click', appData.addExpensesBlock);

incomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('change', appData.changeRange);




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