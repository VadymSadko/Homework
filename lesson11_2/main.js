'use strict';
const start = document.getElementById('start'), 
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
    additionalExpenses = document.querySelector('.additional_expenses'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    targetAmount = document.querySelector('.target-amount'),
    main = document.querySelector('.main'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');
    
    class AppData{
        constructor(){
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
    }
    start(){
        this.budget = +salaryAmount.value;
        this.getExpInc();
        this.getExpensesMonth();
        this.getInfoDeposit();
        this.getBudget();
        this.getAddExpInc();
        this.getIncomeMonth();
        this.changeRange();
        this.blocking();
        this.showResult();
    }
    reset(){
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
    }
    cancel() {
        let inputs = main.querySelectorAll('input[type=text]');
            for (let i = 0; i < inputs.length; i++) {
              inputs[i].value = '';
            }
            document.querySelectorAll('input[type=text]').forEach(function(item){
                item.disabled = false;
            });
            start.style.display = 'block';
            cancel.style.display = 'none';
    }
    activBtn(){
        if (salaryAmount.value !== '') {
            start.removeAttribute('disabled');
            //start.disablede('disabled');
        }
    }
    showResult (){
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
    }
    blocking (){
        document.querySelectorAll('input[type=text]').forEach(function(item){
            item.disabled = true;
        });
        start.style.display = 'none';
        cancel.style.display = 'block';
    }
    addBlock (){
        if(event.target.classList[1] === 'expenses_add'){   // обратился к кнопке expenses_add и делегировал ей событие
            let cloneExpensesItem = expensesItems[0].cloneNode(true);
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
            expensesItems = document.querySelectorAll('.expenses-items');
            if(expensesItems.length === 3){
                expensesPlus.style.display = 'none';
            }
        }else if(event.target.classList[1] === 'income_add'){
            let cloneIncomeItem = incomeItems[0].cloneNode(true);
            incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
            incomeItems = document.querySelectorAll('.income-items');
            if(incomeItems.length === 3){
                incomePlus.style.display = 'none';
            }
        }
    }
    getExpInc (){
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== ''){
                this[startStr][itemTitle] = itemAmount;
            }
        };
        expensesItems.forEach(count);
        incomeItems.forEach(count);
    }
    getInfoDeposit (){
        if (this.deposit){
         this.percentDeposit = depositPercent.value;
         this.moneyDeposit = depositAmount.value;
        }
    }
    changeRange (){
        periodAmount.textContent = periodSelect.value;
    }
    getAddExpInc (){
        const _this = this;
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(item =>{
            item = item.trim(); //убирает пробелы в начале и в конце
            if (item !== ''){
                _this.addExpenses.push(item); 
            }
        });
    
        additionalIncomeItem.forEach(item =>{
            const itemValue = item.value.trim();
            if (itemValue !== ''){
                _this.addIncome.push(itemValue);
            }
        });
    }
    getExpensesMonth (){ //Сумма всех расходов за месяц
        for (let key in this.expenses){
            this.expensesMonth += +this.expenses[key];
        }
    }
    getIncomeMonth (){ //Сумма всех доходов за месяц
        for (let key in this.income){
            this.incomeMonth += +this.income[key];
        }
    }
    getBudget (){
        //Месячный бюджет (доход - сумма расходов)
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + (this.moneyDeposit * this.percentDeposit)/12;  
        //Дневной бюдже (Месячный бюджет разделенный на 30 дней)
        this.budgetDay = this.budgetMonth/30; 
    }
    getTargetMonth (){
        return targetAmount.value / this.budgetMonth;
    }
    calcPeriod (){
        return this.budgetMonth * periodSelect.value;
    }
    addEventListeners (){
        salaryAmount.addEventListener('keyup', appData.activBtn);
        salaryAmount.addEventListener('keyup', appData.checkLength);
        cancel.addEventListener('click',appData.reset.bind(appData));
        cancel.addEventListener('click',appData.cancel.bind(appData));
        start.addEventListener('click', appData.start.bind(appData));
        //btnPlus.addEventListener('click', appData.addExpensesBlock);
        let index,
            button;
        for (index = 0; index < btnPlus.length; index++) {
        button = btnPlus[index];
        button.addEventListener('click', appData.addBlock);
    }
        incomePlus.addEventListener('click', appData.addIncomeBlock);
        periodSelect.addEventListener('input', appData.changeRange);
    }
}

depositCheck.addEventListener('change', function(){
    if(depositCheck.checked){
        depositBank.style.display = 'inline-block';
        depositAmount.style.display = 'inline-block';
        appData.deposit = 'true';
        depositBank.addEventListener('change', function(){
            let selectIndex = this.options[this.selectedIndex].value;
            if (selectIndex === 'other'){
                depositPercent.style.display = 'inline-block';
                depositPercent.value = '';
            } else{
                depositPercent.style.display = 'none';
                depositPercent.value = selectIndex;
            }
        });
    } else{
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        appData.deposit = 'false';
        depositAmount.value = '';
    }
});


const appData = new AppData();

appData.addEventListeners();



