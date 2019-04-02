

class ItemsList {
  constructor() {
    this.items = [];
  }

  getItems() {
    this.items = [{
      name: 'Шорты',
      price: 100,
      quantity: 1,
      cover: 'img/shorts-2.jpg',
    }, {
      name: 'Сланцы',
      price: 50,
      quantity: 1,
      cover: 'img/slans-2.jpg',
    }, {
      name: 'Футболка',
      price: 200,
      quantity: 1,
      cover: 'img/futbolki-2.jpg',
    }];    
  }

  total() {
    
  }

  render() {
    const itemsHtml = this.items.map(item => (new Item(item.name, item.price, item.cover)).render());

    return itemsHtml.join('');
  }
}

 class Item {
      constructor(name, price, cover) {
        this.price = price;
        this.name = name;
        this.cover = cover;
      }

      render() {
        return `<div><h3 class="name">${this.name}</h3><img class="pic" src="${this.cover}" /><p>Цена: <span class="price"></span>${this.price}</p><button id="button">Добавить в корзину</button></div></div>`;
      }
    }

// const renderProduct = ({name, price, cover}) => `<div><h3 class="name">${name}</h3><img class="pic" src="${cover}" /><p>Цена: <span class="price"></span>${price}</p><button id="button">Добавить в корзину</button></div></div>`;

// const renderList = (products) => {
//   const productsHtml = products.map(renderProduct);
//   document.querySelector('#template').innerHTML = productsHtml.join('');
// }

// renderList(products);
const items = new ItemsList();
items.getItems();
  document.querySelector('#template').innerHTML = items.render();
