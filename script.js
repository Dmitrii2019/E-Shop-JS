class GoodsItem {
    constructor(title = 'товар', price = 0) {
        this.title = title;
        this.price = price;
    }

    render() {
        return `
        <div class="col text-center border border-dark">
          <div class="card-body">
            <ul class="list-unstyled mt-3 mb-4">
              <li>${this.title}</li>
            </ul>
            <h1 class="card-title pricing-card-title">${this.price}</h1>
            <button type="button" class="btn btn-lg btn-block btn-outline-primary">купить</button>
            </div>
          </div>
        </div>
      `;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods() {
        this.goods = [
            {title: 'Shirt', price: 155},
            {title: 'Socks', price: 50},
            {title: 'Jacket', price: 350},
            {title: 'Shoes', price: 250},
            {title: 'Shoes', price: 250},
            {title: 'Shirt', price: 150},
            {title: 'Shoes', price: 250},
            {title: 'Shirt', price: 150},
            {title: 'Shoes', price: 250},
            {title: 'Shirt', price: 150},
        ];
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

    getTotalSum() {
        let prices = this.goods.map(function (item) {
                return item.price
            }
        );

        let result = prices.reduce(function (sum, current) {
            return sum + current;
        }, 0);
        document.querySelector('.basket').innerHTML = result;
    }
}

class Cart {
    openCart() {
    };

    closeCart() {
    };

    сlearCart() {
    };
}

class CartItems extends GoodsItem {
    constructor(title, price) {
        super(title, price);
    }

    addItem() {
    }

    deleteItem() {
    }

    render() {
        return `<span>Товар ${this.title} цена ${this.price}</span>`;
    }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
console.log(list.getTotalSum());