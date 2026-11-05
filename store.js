const search = document.getElementById('search');
const category = document.getElementById('category');
const list = document.getElementById('products');
const count = document.getElementById('count');

const label = value => value.replace(/-/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase());

[...new Set(products.flatMap(product => product.categories))].sort().forEach(value => {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = label(value);
  category.appendChild(option);
});

function render() {
  const query = search.value.trim().toLowerCase();
  const matches = products.filter(product =>
    (product.name + ' ' + product.description).toLowerCase().includes(query) &&
    (!category.value || product.categories.includes(category.value))
  );
  count.textContent = matches.length + (matches.length === 1 ? ' product' : ' products') + ' shown';
  list.replaceChildren();
  if (!matches.length) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = 'No products match. Try another search or category.';
    list.appendChild(empty);
    return;
  }
  matches.forEach((product, index) => {
    const card = document.createElement('article');
    card.className = 'product';
    const number = document.createElement('div');
    number.className = 'number';
    number.textContent = String(index + 1).padStart(2, '0') + ' / SAMPLE PRODUCT';
    const name = document.createElement('h3');
    name.textContent = product.name;
    const description = document.createElement('p');
    description.textContent = product.description;
    const type = document.createElement('div');
    type.className = 'category';
    type.textContent = label(product.categories[0]);
    card.append(number, name, description, type);
    list.appendChild(card);
  });
}
search.addEventListener('input', render);
category.addEventListener('change', render);
render();
