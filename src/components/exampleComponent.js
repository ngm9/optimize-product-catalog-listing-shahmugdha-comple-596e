import { createElement } from '../utils.js';

export class ProductList {
  constructor(rootElement, eventBus) {
    this.rootElement = rootElement;
    this.eventBus = eventBus;
    this.items = [];
    this.observer = null;
  }

  clear() {
    this.rootElement.textContent = '';
    this.items = [];
  }

  render(items, options = {}) {
    const append = Boolean(options.append);
    if (!append) {
      this.clear();
    }

    const fragment = document.createDocumentFragment();

    items.forEach((item) => {
      const card = createElement('article', { className: 'product-card' });

      const img = createElement('img', {
        attrs: {
          alt: item.name || 'Product image'
        }
      });
      img.src = item.imageUrl || '';
      card.appendChild(img);

      const title = createElement('h2', { className: 'product-title', text: item.name || 'Untitled product' });
      const price = createElement('div', { className: 'product-price', text: item.price ? String(item.price) : '' });
      const status = createElement('div', { className: 'status', text: item.status || '' });

      card.appendChild(title);
      card.appendChild(price);
      card.appendChild(status);

      fragment.appendChild(card);
    });

    this.rootElement.appendChild(fragment);
    this.items = this.items.concat(items);
  }

  getRenderedCount() {
    return this.items.length;
  }
}
