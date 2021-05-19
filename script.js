const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

const makeGETRequest = (url, callback) => {
  let xhr;

  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) { 
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      callback(xhr.responseText);
    }
  }

  const promise = new Promise((res, rej) => {
    res(xhr.open('GET', url));
    res(xhr.send());
    rej('error')
  })
}

class GoodsItem {
  constructor(product_name, price, quantity, result) {
    this.product_name = product_name;
    this.price = price;
    this.quantity = quantity;
    this.result = result;    
  }

  render(list='index') {
    if (list == 'index') {
      return `
        <div class="col text-center border border-dark">
        <div class="card-body">
          <ul class="list-unstyled mt-3 mb-4">
            <li>${this.product_name}</li>
          </ul>
          <h1 class="card-title pricing-card-title">${this.price}</h1>
          <button type="button" class="btn btn-lg btn-block btn-outline-primary">купить</button>
          </div>
        </div>
      </div>
      `;
    }
    else if (list == 'cart') {
      return `
        <div class="col text-center border border-dark">
        <div class="card-body">
          <ul class="list-unstyled mt-3 mb-4">
            <li>${this.product_name}</li>
            <li>${this.price}</li>
            <li>кол. - ${this.quantity}</li>
          </ul>
          </div>
        </div>
      </div>
      `;
    }
    else if (list == 'addCart') {
      return `
        <div class="col text-center border border-dark">
        <div class="card-body">
          <ul class="list-unstyled mt-3 mb-4">
            <li>${this.result}</li>
          </ul>
          </div>
        </div>
      </div>
      `;
    }
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }

  fetchGoods(cb, url) {
    makeGETRequest(`${API_URL}/${url}.json`, (goods) => {
      this.goods = JSON.parse(goods);
      cb();
    })
  }

  render(selector, goodItemRender) {
    let listHtml = '';
    if (goodItemRender == "index") {
      this.goods.forEach(good => {
        const goodItem = new GoodsItem(good.product_name, good.price);
        listHtml += goodItem.render(`${goodItemRender}`);
      });
    }
    else if (goodItemRender == "cart"){
      this.goods.contents.forEach(good => {
        const goodItem = new GoodsItem(good.product_name, good.price, good.quantity);
        listHtml += goodItem.render(`${goodItemRender}`);
      });
    }
    else if (goodItemRender == "addCart") {
      const goodItem = new GoodsItem('a', 'b', 'c', this.goods.result);
      listHtml += goodItem.render(`${goodItemRender}`);
    }
    document.querySelector(`${selector}`).innerHTML = listHtml;
  }

  getTotalSum() {
    const totalSum = this.goods.reduce((acc, item) => {
      if (!item.price) return acc;
      return acc + item.price;
    }, 0);
    console.log(totalSum);
  }
}

class Basket extends GoodsList {
  constructor(...args) {
    super(...args);
  }

  getListItems(){
    this.fetchGoods(() => {
      this.render('.cart-list', 'cart');
    }, 'getBasket');
  }

  clearAll() {}

  addItem() {
    this.fetchGoods(() => {
      this.render('.add-list', 'addCart');
    }, 'addToBasket');
  }

  deleteItem() {
    this.fetchGoods(() => {
      this.render('.del-list', 'addCart');
    }, 'deleteFromBasket');
  }
}

class BasketItem extends GoodsItem {
  constructor(...args) {
    super(...args);
    this.count = 0;
  }

  addOne() {}

  removeOne() {}
}

const list = new GoodsList();
list.fetchGoods(() => {
  list.render('.goods-list', 'index')
}, 'catalogData');

const listBasket = new Basket();
listBasket.getListItems()
listBasket.addItem()
listBasket.deleteItem()
