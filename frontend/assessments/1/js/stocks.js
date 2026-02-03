const buy = document.querySelector('.buy');
const sell = document.querySelector('.sell');

const exchange = document.querySelector('.exchanges');

buy.addEventListener('click',() =>{
         const stocks = document.querySelector('.stock-input');
        const stocksNumber = Number.parseInt(stocks.value.trim());
        if(stocksNumber > 0) {

        const currentdate = new Date();
        const datetime = currentdate.getDay() + "/" + currentdate.getMonth() 
        + "/" + currentdate.getFullYear() + " @ " 
        + currentdate.getHours() + ":" 
        + currentdate.getMinutes() + ":" + currentdate.getSeconds();

            const divElement = document.createElement('div');
            divElement.className = 'stock-history';
            const divElementStock = document.createElement('div');
            divElementStock.className = 'stock-number';
            const divElementBuy = document.createElement('div');
            divElementBuy.className = 'stock-hold-buy';
            divElementStock.innerHTML = `
            <p>${stocksNumber} stocks</p>
            <p class="date">${datetime}</p>
            `
            divElementBuy.innerHTML = `<span>Buy</span>`
            divElement.appendChild(divElementStock);
            divElement.appendChild(divElementBuy);
            exchange.appendChild(divElement);
            stocks.value = "";
        }
    })

 sell.addEventListener('click',() =>{
         const stocks = document.querySelector('.stock-input');
        const stocksNumber = Number.parseInt(stocks.value.trim());
        if(stocksNumber > 0) {

        const currentdate = new Date();
        const datetime = currentdate.getDay() + "/" + currentdate.getMonth() 
        + "/" + currentdate.getFullYear() + " @ " 
        + currentdate.getHours() + ":" 
        + currentdate.getMinutes() + ":" + currentdate.getSeconds();

            const divElement = document.createElement('div');
            divElement.className = 'stock-history';
            const divElementStock = document.createElement('div');
            divElementStock.className = 'stock-number';
            const divElementSell = document.createElement('div');
            divElementSell.className = 'stock-hold-sell';
            divElementStock.innerHTML = `
            <p>${stocksNumber} stocks</p>
            <p class="date">${datetime}</p>
            `
            divElementSell.innerHTML = `<span>Sell</span>`
            divElement.appendChild(divElementStock);
            divElement.appendChild(divElementSell);
            exchange.appendChild(divElement);
            stocks.value = "";

        }
    })