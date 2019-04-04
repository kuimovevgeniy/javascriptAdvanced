function sendRequest(url) {
  return fetch(url, {
    method: 'GET',
  }).then(
    (response) => response.json(), // onFulfilled
    () => {} // onRejected
  );
}

class ItemsList {
  constructor() {
    this.items = [];
  }

  getItems() {
    return sendRequest('http://localhost:3000/clothes.json').then((template) => {
      this.items = template.map(item => new Item(item.name, item.price, item.cover));
      this.filteredItems = this.items;
      return this.items;
    });
  }

  total() {
    return this.items.reduce((acc, item) => acc + item.price, 0);
  }

  render() {
    const itemsHtml = this.filteredItems.map(item => item.render());

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
    return `<div><h3 class="name">${this.name}</h3><img class="pic" src="img/${this.cover}" /><p>Цена: <span class="price"></span>${this.price}</p><button id="button">Добавить в корзину</button></div></div>`;
  }
}

// const renderProduct = ({name, price, cover}) => `<div><h3 class="name">${name}</h3><img class="pic" src="${cover}" /><p>Цена: <span class="price"></span>${price}</p><button id="button">Добавить в корзину</button></div></div>`;

// const renderList = (products) => {
//   const productsHtml = products.map(renderProduct);
//   document.querySelector('#template').innerHTML = productsHtml.join('');
// }

// renderList(products);
const items = new ItemsList();
items.getItems().then(() => {
  document.querySelector('#template').innerHTML = items.render();
});

// функции добавления в корзину

var $catalog = document.getElementById('catalog');
$catalog.addEventListener('click', buyClick);

function getIndex(name) {
	var idx = -1;
	for (var i = 0; i < cart.length; i++) {
		if (cart[i].name === name) {
			idx = i;
		}
	}
	return idx;
}


function buyClick(event) {
	if (event.target.tagName === 'BUTTON') {
		var $product = event.target.parentElement;
		var name = $product.querySelector('.name').textContent;
		var image = $product.querySelector('.pic').src;
		var price = +$product.querySelector('.price').textContent;
		var index = getIndex(name);
		if (index === -1) {
			cart.push({
				name: name,
				price: price,
				quantity: 1,
				cover: image
			});
		} else {
			cart[index].quantity++;
		}
	}
	getTotal(cart);
}

function clearBtn() {
	var cart = [];
	getTotal(cart);
}

// var $catalogCart = document.getElementById('catalogCart');
var $templateCart = document.getElementById('templateCart');

function remove(event) {
	if (event.target.tagName === 'BUTTON') {
		var $product = event.target.parentElement;
		var name = $product.querySelector('.name').textContent;
		var index = getIndex(name);
		var product = cart[index];
		if (product.quantity > 1) {
			cart[index].quantity--;
		} else {
			cart.splice(index, 1);
		}
		getTotal(cart);
	}
}

function getTotal(cart) {
	var total = 0;
	var n = 0;
	// var b = 0;
	$cart.innerHTML = '';
	for (var i = 0; i < cart.length; i++) {
		total = total + cart[i].price * cart[i].quantity;
		n = n + cart[i].quantity;
		var $item = $templateCart.children[0].cloneNode(true);
		$item.querySelector('.name').textContent = cart[i].name;
		$item.querySelector('.price').textContent = cart[i].price;
		$item.querySelector('.quantity').textContent = cart[i].quantity;
		$item.querySelector('.pic').src = cart[i].cover;
		$cart.appendChild($item);
		// b = cart[i].name + cart[i].quantity;
	}
	// $catalogCart.innerHTML = '';
	var $div = document.createElement('div');
	// var $divItem = document.createElement('div');
	if (cart.length === 0) {
		$div.textContent = 'Корзина пуста';
	} else {
		// $divItem.textContent = b;
		$div.textContent = 'Итого: ' + n + ' шт. товаров на сумму ' + total + ' $';
	}
	$cart.appendChild($div);
	// $catalogCart.appendChild($divItem);
}
getTotal(cart);



// модальное окно

var $modal = document.getElementById('modal');
var $overlay = document.getElementById('overlay');
var $close = document.getElementById('close');
var $modalImage = document.getElementById('modalImage');

document.body.addEventListener('click', imgClick);
$close.addEventListener('click', closeClick)

function imgClick(event) {
	if(event.target.classList.contains('pic')) {
		$modalImage.src = event.target.src;
		$modal.style.display = 'block';
		$overlay.style.display = 'block';
	}
}

function closeClick() {
	$modal.style.display = 'none';
	$overlay.style.display = 'none';
}