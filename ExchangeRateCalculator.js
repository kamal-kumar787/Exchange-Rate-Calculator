const currentElementOne = document.getElementById('currency-one');
const amountElementOne = document.getElementById('amount-one');

const currentElementTwo = document.getElementById('currency-two');
const amountElementTwo = document.getElementById('amount-two');

const rateElement = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update DOM
function calculate() {
    const currency_one = currentElementOne.value;
    const currency_two = currentElementTwo.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[currency_two];

            rateElement.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

            amountElementTwo.value = (amountElementOne.value * rate).toFixed(2);
        });
}

// Event Listeners
currentElementOne.addEventListener('change', calculate);
currentElementTwo.addEventListener('change', calculate);
amountElementOne.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currentElementOne.value;
    currentElementOne.value = currentElementTwo.value;
    currentElementTwo.value = temp;
    calculate();
});

// Initial call
calculate();
