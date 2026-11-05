const search = document.getElementById('search');
const category = document.getElementById('category');
const list = document.getElementById('products');
const count = document.getElementById('count');
const savedOnly = document.getElementById('savedOnly');
const savedCount = document.getElementById('savedCount');
const storageMessage = document.getElementById('storageMessage');
const storageKey = 'poultry-catalogue-shortlist-v1';
let saved = new Set();
try {
  const data = JSON.parse(localStorage.getItem(storageKey) || '[]');
  if (Array.isArray(data)) {
    const names = new Set(products.map(product => product.name));
    saved = new Set(data.filter(name => typeof name === 'string' && names.has(name)));
  }
} catch {
  storageMessage.textContent = 'Saved products will be available only while this page is open.';
}

function saveSelection() {
  try {
    localStorage.setItem(storageKey, JSON.stringify([...saved]));
  } catch {
    storageMessage.textContent = 'Saved products will be available only while this page is open.';
  }
}

const label = value => value.replace(/-/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase());

[...new Set(products.flatMap(product => product.categories))].sort().forEach(value => {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = label(value);
  category.appendChild(option);
});

const illustrations = {
  equipment: '<path d="M40 32h80l-10 68H50zM30 100h100l-8 12H38zM64 32v-9h32v9"/><path d="M56 68h48M80 49v40"/>',
  feed: '<path d="M48 26h64l8 82H40zM48 26l8-13h48l8 13M49 40h62"/><path d="M80 90V53m0 20c-13 0-19-6-20-14 12 1 18 6 20 14zm0 7c13 0 19-6 20-14-12 1-18 6-20 14z"/>',
  health: '<path d="M62 17h36v15l8 10v65H54V42l8-10zM61 17h38M55 54h50v32H55"/><path d="M80 59v22M69 70h22"/>',
  housing: '<path d="M25 62l55-42 55 42M35 56v50h90V56M68 106V70h24v36M45 68h13v14H45z"/>',
  incubator: '<rect x="30" y="35" width="100" height="70" rx="10"/><path d="M38 35l12-14h60l12 14M45 53h70v33H45zM58 65c0-8 7-12 9-12s9 4 9 12a9 9 0 01-18 0zm25 0c0-8 7-12 9-12s9 4 9 12a9 9 0 01-18 0z"/>'
};

function productGuide(product) {
  if (product.categories.includes('coops-housing')) return 'coop';
  if (product.categories.includes('incubators-brooders')) return 'incubator';
  if (product.categories.includes('cleaning-supplies')) return 'cleaning';
  if (product.categories.includes('health-medication')) return 'health';
  if (product.categories.includes('feed-nutrition')) return 'feed';
  return 'equipment';
}

function illustrationFor(product) {
  if (product.name.toLowerCase().includes('coop')) return 'housing';
  if (product.name.toLowerCase().includes('incubator')) return 'incubator';
  const guide = productGuide(product);
  return guide === 'cleaning' ? 'health' : guide;
}

function render() {
  const query = search.value.trim().toLowerCase();
  const matches = products.filter(product =>
    (product.name + ' ' + product.description).toLowerCase().includes(query) &&
    (!category.value || product.categories.includes(category.value)) &&
    (!savedOnly.checked || saved.has(product.name))
  );
  savedCount.textContent = saved.size + (saved.size === 1 ? ' saved product' : ' saved products');
  count.textContent = matches.length + (matches.length === 1 ? ' product' : ' products') + ' shown';
  list.replaceChildren();
  if (!matches.length) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = savedOnly.checked && saved.size === 0
      ? 'No saved products yet. Turn off this filter to explore the catalogue.'
      : 'No products match. Try another search or category.';
    list.appendChild(empty);
    return;
  }
  matches.forEach((product, index) => {
    const card = document.createElement('article');
    card.className = 'product';
    const visual = document.createElement('div');
    const visualType = illustrationFor(product);
    visual.className = 'product-visual visual-' + visualType;
    visual.setAttribute('aria-hidden', 'true');
    visual.innerHTML = '<svg viewBox="0 0 160 130" focusable="false">' + illustrations[visualType] + '</svg>';
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
    const guide = document.createElement('a');
    guide.className = 'product-guide';
    guide.href = '#guide-' + productGuide(product);
    guide.textContent = 'Explore the guide ↗';
    guide.setAttribute('aria-label', 'Explore the guide for ' + product.name);
    const save = document.createElement('button');
    save.type = 'button';
    save.className = 'save-product';
    save.textContent = saved.has(product.name) ? 'Remove from saved' : 'Save product';
    save.setAttribute('aria-label', (saved.has(product.name) ? 'Remove ' : 'Save ') + product.name);
    save.setAttribute('aria-pressed', String(saved.has(product.name)));
    save.addEventListener('click', () => {
      if (saved.has(product.name)) saved.delete(product.name);
      else saved.add(product.name);
      saveSelection();
      if (savedOnly.checked && !saved.has(product.name)) {
        render();
        savedOnly.focus();
      } else {
        save.textContent = saved.has(product.name) ? 'Remove from saved' : 'Save product';
        save.setAttribute('aria-label', (saved.has(product.name) ? 'Remove ' : 'Save ') + product.name);
        save.setAttribute('aria-pressed', String(saved.has(product.name)));
        savedCount.textContent = saved.size + (saved.size === 1 ? ' saved product' : ' saved products');
      }
    });
    card.append(visual, number, name, description, type, guide, save);
    list.appendChild(card);
  });
}
search.addEventListener('input', render);
category.addEventListener('change', render);
savedOnly.addEventListener('change', render);
render();
