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
    incomeItems = document.querySelectorAll('.income-items'),
    main = document.querySelector('.main');
         
const AppData = function(){
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.persentDeposit = 0;
    this.momeyDeposit = 0;
};

AppData.prototype.start = function(){

    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getIncomeMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.changeRange();
    this.blocking();
    this.showResult();
};
AppData.prototype.reset = function(){
    this.budget = 0;    
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.persentDeposit = 0;
    this.momeyDeposit = 0;
    
};
AppData.prototype.cancel = function() {
    let inputs = main.querySelectorAll('input[type=text]');
        for (let i = 0; i < inputs.length; i++) {
          inputs[i].value = '';
        }
        document.querySelectorAll('input[type=text]').forEach(function(item){
            item.disabled = false;
        });
        start.style.display = 'block';
        cancel.style.display = 'none';
  };
AppData.prototype.activBtn = function() {
    if (salaryAmount.value !== '') {
        start.removeAttribute('disabled');
        //start.disablede('disabled');
    }
};
AppData.prototype.showResult =function(){
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.ceil(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth()); //округление в большую сторону
    periodSelect.addEventListener('input', function(){
    incomePeriodValue.value = _this.calcPeriod();
    });

};
AppData.prototype.blocking = function(){
    document.querySelectorAll('input[type=text]').forEach(function(item){
        item.disabled = true;
    });
    start.style.display = 'none';
    cancel.style.display = 'block';
};
AppData.prototype.addExpensesBlock = function(){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3){
        expensesPlus.style.display = 'none';
    }
};
AppData.prototype.addIncomeBlock = function(){
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3){
        incomePlus.style.display = 'none';
    }
};
AppData.prototype.getExpenses = function(){
    const _this = this;
    expensesItems.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cachExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cachExpenses !== ''){
            _this.expenses[itemExpenses] = cachExpenses;
        }
    });
};
AppData.prototype.getIncome = function(){
    const _this = this;
    incomeItems.forEach(function(item){
        let itemIncome = item.querySelector('.income-title').value;
        let cachIncome = item.querySelector('.income-amount').value;
        if(itemIncome !== '' && cachIncome !== ''){
            _this.income[itemIncome] = cachIncome;
        }
    });
};
AppData.prototype.changeRange = function(){
    periodAmount.textContent = periodSelect.value;
};
AppData.prototype.getAddExpenses = function(){
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
        item = item.trim(); //убирает пробелы в начале и в конце
        if (item !== ''){
            _this.addExpenses.push(item); 
        }
    });
};
AppData.prototype.getAddIncome = function(){
    const _this = this;
    additionalIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
        if (itemValue !== ''){
            _this.addIncome.push(itemValue);
        }
    });
};
AppData.prototype.getExpensesMonth = function(){ //Сумма всех расходов за месяц
    for (let key in this.expenses){
        this.expensesMonth += +this.expenses[key];
    }
};
AppData.prototype.getIncomeMonth = function(){ //Сумма всех доходов за месяц
    for (let key in this.income){
        this.incomeMonth += +this.income[key];
    }
};
AppData.prototype.getBudget = function(){
    //Месячный бюджет (доход - сумма расходов)
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;  
    //Дневной бюдже (Месячный бюджет разделенный на 30 дней)
    this.budgetDay = this.budgetMonth/30; 
};
AppData.prototype.getTargetMonth = function(){
    return targetAmount.value / this.budgetMonth;
};
AppData.prototype.getStatusIncome = function(){
    if (appData.budgetDay >= 800){
        console.log('Высокий уровень дохода');
    } else if(appData.budgetDay < 800 && appData.budgetDay >= 300){
        console.log('Средний уровень дохода');
    } else if(appData.budgetDay < 300 && appData.budgetDay >= 0){
        console.log('Низкий уровень дохода');
    } else {console.log('Что-то пошло не так');
    }
};
AppData.prototype.calcPeriod = function(){
    return this.budgetMonth * periodSelect.value;
};

AppData.prototype.addEventListeners = function(){
    salaryAmount.addEventListener('keyup', appData.activBtn);
    salaryAmount.addEventListener('keyup', appData.checkLength);
    cancel.addEventListener('click',appData.reset.bind(appData));
    cancel.addEventListener('click',appData.cancel.bind(appData));
    start.addEventListener('click', appData.start.bind(appData));
    expensesPlus.addEventListener('click', appData.addExpensesBlock);
    incomePlus.addEventListener('click', appData.addIncomeBlock);
    periodSelect.addEventListener('input', appData.changeRange);
};

const appData = new AppData();

appData.addEventListeners();

console.log(appData);



