import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import JwtService from '@/common/jwt.service';
import { API_URL } from '@/common/config';

function setHeader() {
  Vue.axios.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${JwtService.getToken()}`;
}

const ApiService = {
  setHeader,
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
    if (JwtService.getToken()) {
      setHeader();
    }
  },

  query(resource, params) {
    return Vue.axios.get(resource, params).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  get(resource, slug = '') {
    return Vue.axios.get(`${resource}/${slug}`).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },

  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  delete(resource) {
    return Vue.axios.delete(resource).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  }
};

export default ApiService;

export const ChartsService = {
  list() {
    return ApiService.get('/api/v1/charts');
  }
};

export const ArticlesService = {
  query(type, params) {
    return ApiService.query('articles' + (type === 'feed' ? '/feed' : ''), {
      params: params
    });
  },
  get(slug) {
    return ApiService.get('articles', slug);
  },
  create(params) {
    return ApiService.post('articles', { article: params });
  },
  update(slug, params) {
    return ApiService.update('articles', slug, { article: params });
  },
  destroy(slug) {
    return ApiService.delete(`articles/${slug}`);
  }
};

export const SheetService = {
  create(payload) {
    return ApiService.post('/api/v1/sheets', payload);
  },
  list() {
    return ApiService.get('/api/v1/sheets');
  }
};
export const ChartService = {
  create(payload) {
    return ApiService.post('/api/v1/charts', payload);
  },
  update(id, payload) {
    return ApiService.put(`/api/v1/charts/${id}`, payload);
  },
  list() {
    return ApiService.get('/api/v1/charts');
  }
};
export const DchartsService = {
  create(payload) {
    return ApiService.post('/api/v1/dcharts', payload);
  },
  update(id, payload) {
    return ApiService.put(`/api/v1/dcharts/${id}`, payload);
  },
  list() {
    return ApiService.get('/api/v1/dcharts');
  },
  show(id) {
    return ApiService.get(`/api/v1/dcharts/${id}`);
  }
};
export const CommentsService = {
  get(slug) {
    if (typeof slug !== 'string') {
      throw new Error(
        '[RWV] CommentsService.get() article slug required to fetch comments'
      );
    }
    return ApiService.get('articles', `${slug}/comments`);
  },

  post(slug, payload) {
    return ApiService.post(`articles/${slug}/comments`, {
      comment: { body: payload }
    });
  },

  destroy(slug, commentId) {
    return ApiService.delete(`articles/${slug}/comments/${commentId}`);
  }
};

export const FavoriteService = {
  add(slug) {
    return ApiService.post(`articles/${slug}/favorite`);
  },
  remove(slug) {
    return ApiService.delete(`articles/${slug}/favorite`);
  }
};
