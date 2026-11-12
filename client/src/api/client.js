import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to inject JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('technova_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle 401 unauth
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token if expired or invalid
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('technova_token');
        localStorage.removeItem('technova_user');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// API Functions
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

export const postAPI = {
  getPosts: (params) => api.get('/posts', { params }),
  getFeaturedPosts: () => api.get('/posts/featured'),
  getTrendingPosts: () => api.get('/posts/trending'),
  getPostBySlug: (slug) => api.get(`/posts/slug/${slug}`),
  // Admin endpoints
  getAdminStats: () => api.get('/posts/admin/stats'),
  getAdminPosts: (params) => api.get('/posts/admin/all', { params }),
  getAdminPostById: (id) => api.get(`/posts/admin/${id}`),
  createPost: (data) => api.post('/posts/admin', data),
  updatePost: (id, data) => api.put(`/posts/admin/${id}`, data),
  deletePost: (id) => api.delete(`/posts/admin/${id}`),
};

export const categoryAPI = {
  getCategories: () => api.get('/categories'),
  getCategoryBySlug: (slug) => api.get(`/categories/slug/${slug}`),
  createCategory: (data) => api.post('/categories', data),
  updateCategory: (id, data) => api.put(`/categories/${id}`, data),
  deleteCategory: (id) => api.delete(`/categories/${id}`),
};

export const authorAPI = {
  getAuthors: () => api.get('/authors'),
  getAuthorById: (id) => api.get(`/authors/${id}`),
  createAuthor: (data) => api.post('/authors', data),
  updateAuthor: (id, data) => api.put(`/authors/${id}`, data),
  deleteAuthor: (id) => api.delete(`/authors/${id}`),
};

export const tagAPI = {
  getTags: () => api.get('/tags'),
  createTag: (data) => api.post('/tags', data),
  deleteTag: (id) => api.delete(`/tags/${id}`),
};

export const uploadAPI = {
  uploadImage: (formData) =>
    api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
};

export default api;
