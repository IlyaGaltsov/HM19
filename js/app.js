function showCategories() {
  const parentElement = document.getElementById('left');

  for (let categoryKey in categories) {
    const category = categories[categoryKey];

    let element = document.createElement('div');
    element.textContent = category.name;
    element.setAttribute('data-category', categoryKey);
    element.addEventListener('click', () => {
      const center = document.getElementById('center');
      center.innerHTML = '';
      
      const right = document.getElementById('right');
      right.innerHTML = '';

      const message = document.querySelector('h2');
      if (message) {
        message.remove();
      }

      const categoryProducts = categories[categoryKey].products;
      showProducts(categoryProducts, categoryKey);
    });

    parentElement.appendChild(element);
  }
}


function showProducts(products, category) {
  const parentElement = document.getElementById('center');
  parentElement.innerHTML = '';

  for (let product of products) {
    let element = document.createElement('div');
    element.textContent = `${product.name} $${product.price}`;
    element.setAttribute('data-product', product.id);
    element.setAttribute('data-category', category);

    parentElement.appendChild(element);
  }
  element.addEventListener('click', () => {
    showDescription(product);
  })
}

showCategories(); 

function showDescription(product) {
  const description = document.getElementById('right');
  description.innerHTML = '';

  const element = document.createElement('div');
  const buy = document.createElement('button');

  element.textContent = `${product.description}`;

  buy.textContent='Купить';

  description.appendChild(element);
  description.appendChild(buy);

  buy.addEventListener('click', showMessage) ;

}

function showMessage(){
  const message = document.createElement('h2');
  message.textContent = 'Дякую! Ваш товар успiшно куплено';
  message.style.textAlign = 'center';
  document.body.appendChild(message);
}

document.getElementById('left').addEventListener('click', event => {
  if (event.target.nodeName === 'DIV') {
    const categoryKey = event.target.getAttribute('data-category');
    const categoryProducts = categories[categoryKey].products;
    showProducts(categoryProducts, categoryKey);
  }
});


document.getElementById('center').addEventListener('click', event => {
  if (event.target.nodeName === 'DIV') {
    const productId = event.target.getAttribute('data-product');
    const categoryKey = event.target.getAttribute('data-category');

    const product = categories[categoryKey].products.find(product => product.id == productId);
    showDescription(product);
  }
});