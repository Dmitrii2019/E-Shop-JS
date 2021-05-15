const goods = [
    {title: 'Shirt', price: 150},
    {title: 'Socks', price: 50},
    {title: 'Jacket', price: 350},
    {title: 'Shoes', price: 250},
    {title: 'Shirt', price: 150},
    {title: 'Socks', price: 50},
    {title: 'Jacket', price: 350},
    {title: 'Shoes', price: 250},
    {title: 'Shirt', price: 150},
    {title: 'Socks', price: 50},
];


const renderGoodsItem = (title = 'товар', price = 0) => {
    return `
        <div class="col text-center">
          <div class="card-body">
            <ul class="list-unstyled mt-3 mb-4">
              <li>${title}</li>
            </ul>
            <h1 class="card-title pricing-card-title">${price}</h1>
            <button type="button" class="btn btn-lg btn-block btn-outline-primary">купить</button>
            </div>
          </div>
        </div>
      `;
}

const renderGoodsList = (list) => {
    const goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.goods-list').innerHTML = goodsList.join(" ");
}

renderGoodsList(goods);
