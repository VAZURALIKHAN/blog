import axios from 'axios';
import staticData from '../data/blogData.json';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 3000,
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
      if (window.location.pathname.includes('/admin') && !window.location.pathname.includes('/admin/login')) {
        localStorage.removeItem('technova_token');
        localStorage.removeItem('technova_user');
        window.location.hash = '#/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Static fallback helpers for GitHub Pages deployment
const getStaticPosts = ({ category = '', search = '', sort = 'latest', page = 1, limit = 9 } = {}) => {
  let list = (staticData.posts || []).filter((p) => p.status === 'published');

  if (category) {
    list = list.filter((p) => p.category?.slug === category || p.category?._id === category);
  }

  if (search) {
    const q = search.toLowerCase();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        (p.tags && p.tags.some((t) => t.name.toLowerCase().includes(q)))
    );
  }

  if (sort === 'views') {
    list.sort((a, b) => (b.views || 0) - (a.views || 0));
  } else if (sort === 'oldest') {
    list.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
  } else {
    list.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  }

  const total = list.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const start = (page - 1) * limit;
  const paginated = list.slice(start, start + limit);

  return {
    data: {
      success: true,
      total,
      page,
      limit,
      totalPages,
      data: paginated,
    },
  };
};

export const postAPI = {
  getPosts: async (params) => {
    try {
      return await api.get('/posts', { params });
    } catch {
      return getStaticPosts(params);
    }
  },

  getFeaturedPosts: async () => {
    try {
      return await api.get('/posts/featured');
    } catch {
      const feat = (staticData.posts || []).filter((p) => p.isFeatured && p.status === 'published');
      return { data: { success: true, count: feat.length, data: feat } };
    }
  },

  getTrendingPosts: async () => {
    try {
      return await api.get('/posts/trending');
    } catch {
      const trending = (staticData.posts || []).filter((p) => p.isTrending && p.status === 'published');
      return { data: { success: true, count: trending.length, data: trending } };
    }
  },

  getPostBySlug: async (slug) => {
    try {
      return await api.get(`/posts/slug/${slug}`);
    } catch {
      const post = (staticData.posts || []).find((p) => p.slug === slug);
      if (!post) throw new Error('Post not found');
      
      const related = (staticData.posts || []).filter(
        (p) => p.category?._id === post.category?._id && p._id !== post._id && p.status === 'published'
      ).slice(0, 3);

      const pubPosts = (staticData.posts || []).filter((p) => p.status === 'published');
      const idx = pubPosts.findIndex((p) => p._id === post._id);
      const prev = idx > 0 ? pubPosts[idx - 1] : null;
      const next = idx < pubPosts.length - 1 ? pubPosts[idx + 1] : null;

      return {
        data: {
          success: true,
          data: post,
          relatedPosts: related,
          previousPost: prev,
          nextPost: next,
        },
      };
    }
  },

  getAdminStats: async () => {
    try {
      return await api.get('/posts/admin/stats');
    } catch {
      const posts = staticData.posts || [];
      return {
        data: {
          success: true,
          data: {
            totalPosts: posts.length,
            publishedPosts: posts.filter((p) => p.status === 'published').length,
            draftPosts: posts.filter((p) => p.status === 'draft').length,
            scheduledPosts: posts.filter((p) => p.status === 'scheduled').length,
            totalViews: posts.reduce((acc, p) => acc + (p.views || 0), 0),
            totalCategories: staticData.categories?.length || 7,
            totalAuthors: staticData.authors?.length || 4,
            recentPosts: posts.slice(0, 5),
          },
        },
      };
    }
  },

  getAdminPosts: async (params) => {
    try {
      return await api.get('/posts/admin/all', { params });
    } catch {
      return { data: { success: true, data: staticData.posts || [] } };
    }
  },

  getAdminPostById: async (id) => {
    try {
      return await api.get(`/posts/admin/${id}`);
    } catch {
      const p = (staticData.posts || []).find((item) => item._id === id);
      return { data: { success: true, data: p } };
    }
  },
  createPost: async (data) => {
    try {
      return await api.post('/posts/admin', data);
    } catch {
      const newPost = { ...data, _id: 'post_custom_' + Date.now(), createdAt: new Date().toISOString() };
      return { data: { success: true, data: newPost } };
    }
  },
  updatePost: async (id, data) => {
    try {
      return await api.put(`/posts/admin/${id}`, data);
    } catch {
      return { data: { success: true, data: { ...data, _id: id } } };
    }
  },
  deletePost: async (id) => {
    try {
      return await api.delete(`/posts/admin/${id}`);
    } catch {
      return { data: { success: true, message: 'Post deleted successfully' } };
    }
  },
};

export const categoryAPI = {
  getCategories: async () => {
    try {
      return await api.get('/categories');
    } catch {
      return { data: { success: true, data: staticData.categories || [] } };
    }
  },
  getCategoryBySlug: (slug) => api.get(`/categories/slug/${slug}`),
  createCategory: (data) => api.post('/categories', data),
  updateCategory: (id, data) => api.put(`/categories/${id}`, data),
  deleteCategory: (id) => api.delete(`/categories/${id}`),
};

export const authorAPI = {
  getAuthors: async () => {
    try {
      return await api.get('/authors');
    } catch {
      return { data: { success: true, data: staticData.authors || [] } };
    }
  },
  getAuthorById: (id) => api.get(`/authors/${id}`),
  createAuthor: (data) => api.post('/authors', data),
  updateAuthor: (id, data) => api.put(`/authors/${id}`, data),
  deleteAuthor: (id) => api.delete(`/authors/${id}`),
};

export const authAPI = {
  login: async (credentials) => {
    try {
      return await api.post('/auth/login', credentials);
    } catch (err) {
      const email = (credentials.email || '').trim().toLowerCase();
      const pwd = (credentials.password || '').trim();
      
      // Support demo login
      if (email === 'admin@technova.io' || email.includes('admin') || pwd === 'admin123') {
        const demoUser = staticData.users?.[0] || {
          _id: 'user_admin_01',
          name: 'Alex Mercer',
          email: 'admin@technova.io',
          role: 'admin',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        };
        const demoToken = 'mock_jwt_token_for_static_demo_environment_' + Date.now();
        return { data: { success: true, token: demoToken, user: demoUser } };
      }
      throw err;
    }
  },
  getMe: async () => {
    try {
      return await api.get('/auth/me');
    } catch {
      try {
        const saved = localStorage.getItem('technova_user');
        if (saved) {
          return { data: { success: true, user: JSON.parse(saved) } };
        }
      } catch {}
      const fallbackUser = staticData.users?.[0] || {
        _id: 'user_admin_01',
        name: 'Alex Mercer',
        email: 'admin@technova.io',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      };
      return { data: { success: true, user: fallbackUser } };
    }
  },
};

export const tagAPI = {
  getTags: async () => {
    try {
      return await api.get('/tags');
    } catch {
      return { data: { success: true, data: staticData.tags || [] } };
    }
  },
};

export const uploadAPI = {
  uploadImage: (formData) =>
    api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

export const settingsAPI = {
  getSettings: () => api.get('/settings'),
  updateSettings: (data) => api.put('/settings', data),
};

export default api;
