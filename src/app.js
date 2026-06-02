import { ProductApi } from './api.js';
import { Cache } from './cache.js';
import { EventBus } from './events.js';
import { ProductList } from './components/exampleComponent.js';
import { SearchBar } from './components/searchBar.js';
import { createKey } from './utils.js';

const baseUrl = '/api/products';

const eventBus = new EventBus();
const cache = new Cache(window.localStorage);
const api = new ProductApi(baseUrl);

const categorySelect = document.getElementById('category-select');
const searchInput = document.getElementById('search-input');
const productListContainer = document.getElementById('product-list');
const errorBanner = document.getElementById('error-banner');
const statusBar = document.getElementById('status-bar');
const loadingIndicator = document.getElementById('loading-indicator');

const productList = new ProductList(productListContainer, eventBus);
const searchBar = new SearchBar(searchInput, categorySelect, eventBus);

let currentCategory = categorySelect.value;
let currentQuery = '';
let currentOffset = 0;
let currentLimit = 20;

function setLoading(isLoading) {
  loadingIndicator.style.display = isLoading ? 'inline-block' : 'none';
}

function setError(message) {
  if (!message) {
    errorBanner.style.display = 'none';
    errorBanner.textContent = '';
    return;
  }
  errorBanner.textContent = message;
  errorBanner.style.display = 'block';
}

function setStatus(message) {
  statusBar.textContent = message || '';
}

async function loadProducts({ category, query, offset, limit, append }) {
  const key = createKey(category, query, offset, limit);

  setError('');
  setLoading(true);

  const cached = cache.get(key);
  if (cached && !append) {
    productList.render(cached.items, { append: false });
    setStatus(cached.statusText || 'Loaded from cache');
    setLoading(false);
    return;
  }

  try {
    const response = await api.fetchProducts({ category, query, offset, limit });
    const result = {
      items: response.items || [],
      total: response.total || 0,
      statusText: 'Loaded from network'
    };

    cache.set(key, result, 10 * 60 * 1000);

    productList.render(result.items, { append: Boolean(append) });
    const visibleCount = productList.getRenderedCount();
    const label = query ? `Results for "${query}"` : `Showing ${category}`;
    setStatus(`${label} · ${visibleCount} items shown`);
  } catch (err) {
    const fallback = cache.get(key);
    if (fallback && !append) {
      productList.render(fallback.items, { append: false });
      setStatus('Showing previously loaded products');
    }
    setError('Unable to load products. Please try again.');
  } finally {
    setLoading(false);
  }
}

function initialLoad() {
  currentCategory = categorySelect.value;
  currentQuery = '';
  currentOffset = 0;
  loadProducts({ category: currentCategory, query: currentQuery, offset: currentOffset, limit: currentLimit, append: false });
}

eventBus.on('search:changed', ({ category, query }) => {
  currentCategory = category;
  currentQuery = query;
  currentOffset = 0;
  loadProducts({ category: currentCategory, query: currentQuery, offset: currentOffset, limit: currentLimit, append: false });
});

eventBus.on('list:loadMore', () => {
  currentOffset += currentLimit;
  loadProducts({ category: currentCategory, query: currentQuery, offset: currentOffset, limit: currentLimit, append: true });
});

categorySelect.addEventListener('change', () => {
  const category = categorySelect.value;
  const query = searchInput.value || '';
  eventBus.emit('search:changed', { category, query });
});

initialLoad();
