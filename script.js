console.log('script.js підключено');
 
// Дані: масив операцій трекера витрат (type — 'дохід' або 'витрата')
const operations = [
    { amount: 35000, type: 'дохід' },
    { amount: 530, type: 'витрата' },
    { amount: 30, type: 'витрата' },
    { amount: 200, type: 'витрата' },
    { amount: 470, type: 'витрата' }
];
 
// Відсоток частини від цілого, округлений до цілого числа
const toPercent = (part, total) => Math.round(part / total * 100);
 
// Підсумовує баланс циклом for: дохід додає, витрата віднімає
function calculateTotals(items) {
    let balance = 0;
    let income = 0;
    let expense = 0;
 
    for (let i = 0; i < items.length; i++) {
        if (items[i].type === 'дохід') {
            balance += items[i].amount;
            income += items[i].amount;
        } else {
            balance -= items[i].amount;
            expense += items[i].amount;
        }
    }
 
    return { balance, income, expense };
}
 
// Виводить кожну операцію в консоль, позначаючи її знаком (потрійний оператор)
function printOperations(items) {
    for (const item of items) {
        const sign = item.type === 'дохід' ? '+' : '-';
        console.log(`${sign}${item.amount} грн (${item.type})`);
    }
}
 
// Формує та виводить підсумковий звіт, класифікуючи баланс умовою if/else
function printReport(items) {
    const { balance, income, expense } = calculateTotals(items);
 
    console.log('Кількість операцій:', items.length);
    console.log(`Дохід: ${income} грн, витрати: ${expense} грн`);
    console.log(`Підсумковий баланс: ${balance} грн`);
 
    if (balance > 0) {
        console.log('Баланс додатний: бюджет у плюсі');
    } else if (balance === 0) {
        console.log('Баланс нульовий: доходи дорівнюють витратам');
    } else {
        console.log('Баланс від’ємний: витрати перевищують доходи');
    }
 
    console.log(`Витрати становлять ${toPercent(expense, income)}% від доходів`);
}
 
printOperations(operations);
printReport(operations);
