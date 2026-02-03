document.addEventListener('DOMContentLoaded',() =>{
    const price = document.querySelector('.price-value');
    const priceChange = document.querySelector('.price-change');
    const graph = document.querySelector('.graph');
    let oldPrice = Math.floor(1 + Math.random() * 500);
    price.innerHTML = oldPrice;
    price.style.color = '#2f9e44';
    priceChange.innerHTML = '0 %'
    priceChange.style.color = 'grey'
    priceChange.style.fontSize = 'small'

    setInterval(()=>{
        const newPrice = Math.floor(1 + Math.random() * 500);
        const priceDiff = newPrice - oldPrice;

        const divElement = document.createElement('div');
        divElement.className = 'bar';
        divElement.style.width = '20px';
        divElement.style.height = (priceDiff >= 0) ? `${priceDiff}px` : `${-priceDiff}px`;
        divElement.style.backgroundColor = (priceDiff >= 0) ? ' #62f266' : '#ffc9c9';
        divElement.style.border = (priceDiff >= 0) ? ' 1px solid #2f9644' : ' 1px solid #e03131'

        graph.appendChild(divElement);
        oldPrice = newPrice;
        price.innerHTML = (priceDiff >= 0) ? `${newPrice} &#8593` : `${newPrice} &#8595`;
        price.style.color = (priceDiff >= 0) ? ' #2f9644' : '#e03131';
        priceChange.innerHTML = `${priceDiff} %`;
    },5000)



})