const form = document.querySelector('#add-transaction form');
const list = document.querySelector('.transactions');
const card = document.querySelector('#summary-balance');
const dateInput = document.querySelector('#transaction-date');
 
const categoryNames = {
    food: 'Їжа та продукти',
    transport: 'Транспорт',
    entertainment: 'Розваги та відпочинок',
    health: "Здоров'я та аптека",
    shopping: 'Одяг та шопінг',
    housing: 'Комунальні / Житло',
    other: 'Інше',
    income: 'Дохід'
};
 
const states = {
    good: { emoji: '😄', text: 'Усе під контролем' },
    warn: { emoji: '😐', text: 'Витрати зростають' },
    bad: { emoji: '☠️', text: 'Перевитрата' }
};
 
function updateBalance() {
    let income = 0;
    let expense = 0;
 
    list.querySelectorAll('.transaction').forEach(row => {
        const value = Number(row.dataset.amount);
        if (value > 0) income += value;
        else expense += Math.abs(value);
    });
 
    const left = income - expense;
    let percent = 100;
    if (income > 0) percent = (left / income) * 100;
    else if (expense > 0) percent = -1;
 
    let state = 'good';
    if (percent < 15) state = 'bad';
    else if (percent <= 50) state = 'warn';
 
    card.dataset.state = state;
    card.querySelector('.balance__mood').textContent = states[state].emoji;
    card.querySelector('.balance__status').textContent = states[state].text;
    card.querySelector('.balance__value').textContent = left.toFixed(2) + ' грн';
    card.querySelector('.balance__bar span').style.width = Math.max(0, Math.min(100, percent)) + '%';
    card.querySelector('.balance__spent').innerHTML =
        'Витрачено <strong>' + expense.toFixed(2) + '</strong> із <strong>' + income.toFixed(2) + '</strong> грн';
}
 
function formatDate(iso) {
    const [y, m, d] = iso.split('-');
    return d + '.' + m + '.' + y;
}
 
form.addEventListener('submit', event => {
    event.preventDefault();
 
    const name = form.elements.name.value.trim();
    const amount = Number(form.elements.amount.value);
    const category = form.elements.category.value;
    const date = form.elements.date.value;
    if (!name || !amount) return;
 
    const isIncome = category === 'income';
    const signed = isIncome ? amount : -amount;
 
    const row = document.createElement('article');
    row.className = 'transaction';
    row.dataset.amount = signed;
    row.innerHTML =
        '<h3 class="transaction__name"></h3>' +
        '<p class="transaction__category"><span class="cat cat--' + category + '"></span></p>' +
        '<time class="transaction__date" datetime="' + date + '">' + formatDate(date) + '</time>' +
        '<span class="amount amount--' + (isIncome ? 'income' : 'expense') + '">' +
        (isIncome ? '+' : '-') + amount.toFixed(2) + ' грн</span>';
    row.querySelector('.transaction__name').textContent = name;
    row.querySelector('.cat').textContent = categoryNames[category];
 
    list.prepend(row);
    updateBalance();
    form.reset();
    dateInput.valueAsDate = new Date();
});
 
dateInput.valueAsDate = new Date();
updateBalance();
 