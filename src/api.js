import { isServerError } from './utils.js';

export class ProductApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async fetchProducts({ category, query, offset, limit }) {
    const url = new URL(this.baseUrl, window.location.origin);
    url.searchParams.set('category', category);
    if (query) {
      url.searchParams.set('q', query);
    }
    if (typeof offset === 'number') {
      url.searchParams.set('offset', String(offset));
    }
    if (typeof limit === 'number') {
      url.searchParams.set('limit', String(limit));
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      if (isServerError(response.status)) {
        throw new Error('Server error while loading products');
      }
      throw new Error('Request failed');
    }

    const data = await response.json();
    return {
      items: Array.isArray(data.items) ? data.items : [],
      total: typeof data.total === 'number' ? data.total : data.items?.length || 0
    };
  }
}
