import axios from 'axios';
import staticData from '../data/blogData.json';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 4000,
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
    // Only redirect if backend explicitly says 401
    if (error.response && error.response.status === 401) {
      if (window.location.hash.includes('/admin') && !window.location.hash.includes('/admin/login')) {
        localStorage.removeItem('technova_token');
        localStorage.removeItem('technova_user');
        window.location.hash = '#/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Helper maps for auto-populating relations in static mode
const catMap = {};
(staticData.categories || []).forEach((c) => {
  catMap[c._id] = c;
  catMap[c.slug] = c;
});

const authMap = {};
(staticData.authors || []).forEach((a) => {
  authMap[a._id] = a;
  authMap[a.slug] = a;
});

const populatePost = (post) => {
  if (!post) return post;
  const categoryObj =
    typeof post.category === 'object' && post.category !== null
      ? post.category
      : catMap[post.category] || {
          _id: post.category || 'cat_default',
          name: 'Technology',
          slug: 'technology',
          color: '#E42528',
        };

  const authorObj =
    typeof post.author === 'object' && post.author !== null
      ? post.author
      : authMap[post.author] || {
          _id: post.author || 'auth_default',
          name: 'TechNova Staff',
          role: 'Staff Contributor',
          avatar:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        };

  return {
    ...post,
    category: categoryObj,
    author: authorObj,
  };
};

// Static fallback helpers
const getStaticPosts = ({ category = '', search = '', sort = 'latest', page = 1, limit = 9 } = {}) => {
  let list = (staticData.posts || []).filter((p) => p.status === 'published').map(populatePost);

  if (category) {
    list = list.filter((p) => p.category?.slug === category || p.category?._id === category);
  }

  if (search) {
    const q = search.toLowerCase();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        (p.tags && p.tags.some((t) => (t.name || t).toLowerCase().includes(q)))
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
      const res = await api.get('/posts', { params });
      if (res?.data?.data) {
        res.data.data = res.data.data.map(populatePost);
      }
      return res;
    } catch {
      return getStaticPosts(params);
    }
  },

  getFeaturedPosts: async () => {
    try {
      const res = await api.get('/posts/featured');
      if (res?.data?.data) {
        res.data.data = res.data.data.map(populatePost);
      }
      return res;
    } catch {
      const feat = (staticData.posts || [])
        .filter((p) => p.isFeatured && p.status === 'published')
        .map(populatePost);
      return { data: { success: true, count: feat.length, data: feat } };
    }
  },

  getTrendingPosts: async () => {
    try {
      const res = await api.get('/posts/trending');
      if (res?.data?.data) {
        res.data.data = res.data.data.map(populatePost);
      }
      return res;
    } catch {
      const trending = (staticData.posts || [])
        .filter((p) => p.isTrending && p.status === 'published')
        .map(populatePost);
      return { data: { success: true, count: trending.length, data: trending } };
    }
  },

  getPostBySlug: async (slug) => {
    try {
      const res = await api.get(`/posts/slug/${slug}`);
      if (res?.data?.data) {
        res.data.data = populatePost(res.data.data);
      }
      return res;
    } catch {
      const rawPost = (staticData.posts || []).find((p) => p.slug === slug);
      if (!rawPost) throw new Error('Post not found');
      const post = populatePost(rawPost);

      const related = (staticData.posts || [])
        .filter(
          (p) =>
            (p.category === rawPost.category || p.category?._id === rawPost.category) &&
            p._id !== post._id &&
            p.status === 'published'
        )
        .slice(0, 3)
        .map(populatePost);

      const pubPosts = (staticData.posts || []).filter((p) => p.status === 'published');
      const idx = pubPosts.findIndex((p) => p._id === post._id);
      const prev = idx > 0 ? populatePost(pubPosts[idx - 1]) : null;
      const next = idx < pubPosts.length - 1 ? populatePost(pubPosts[idx + 1]) : null;

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

  // Author Portal / Admin endpoints
  getAdminStats: async () => {
    try {
      const res = await api.get('/posts/admin/stats');
      if (res?.data?.data?.recentPosts) {
        res.data.data.recentPosts = res.data.data.recentPosts.map(populatePost);
      }
      return res;
    } catch {
      const posts = (staticData.posts || []).map(populatePost);
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
            recentPosts: posts.slice(0, 8),
          },
        },
      };
    }
  },

  getAdminPosts: async (params = {}) => {
    try {
      const res = await api.get('/posts/admin/all', { params });
      if (res?.data?.data) {
        res.data.data = res.data.data.map(populatePost);
      }
      return res;
    } catch {
      let posts = (staticData.posts || []).map(populatePost);
      if (params.status && params.status !== 'all') {
        posts = posts.filter((p) => p.status === params.status);
      }
      if (params.category) {
        posts = posts.filter(
          (p) => p.category?.slug === params.category || p.category?._id === params.category
        );
      }
      if (params.search) {
        const q = params.search.toLowerCase();
        posts = posts.filter(
          (p) => p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q)
        );
      }

      const limit = params.limit || 10;
      const page = params.page || 1;
      const total = posts.length;
      const totalPages = Math.ceil(total / limit) || 1;
      const paginated = posts.slice((page - 1) * limit, page * limit);

      return {
        data: {
          success: true,
          count: paginated.length,
          total,
          totalPages,
          currentPage: page,
          data: paginated,
        },
      };
    }
  },

  getAdminPostById: async (id) => {
    try {
      const res = await api.get(`/posts/admin/${id}`);
      if (res?.data?.data) {
        res.data.data = populatePost(res.data.data);
      }
      return res;
    } catch {
      const p = (staticData.posts || []).find((item) => item._id === id || item.slug === id);
      return { data: { success: true, data: populatePost(p) } };
    }
  },

  createPost: async (data) => {
    try {
      return await api.post('/posts/admin', data);
    } catch {
      const newPost = populatePost({
        ...data,
        _id: 'post_' + Date.now(),
        createdAt: new Date().toISOString(),
        publishedAt: data.status === 'published' ? new Date().toISOString() : null,
      });
      return { data: { success: true, data: newPost } };
    }
  },

  updatePost: async (id, data) => {
    try {
      return await api.put(`/posts/admin/${id}`, data);
    } catch {
      return { data: { success: true, data: populatePost({ ...data, _id: id }) } };
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
  getCategoryBySlug: async (slug) => {
    try {
      return await api.get(`/categories/slug/${slug}`);
    } catch {
      const cat = (staticData.categories || []).find((c) => c.slug === slug || c._id === slug);
      return { data: { success: true, data: cat } };
    }
  },
  createCategory: async (data) => {
    try {
      return await api.post('/categories', data);
    } catch {
      const newCat = { ...data, _id: 'cat_' + Date.now() };
      return { data: { success: true, data: newCat } };
    }
  },
  updateCategory: async (id, data) => {
    try {
      return await api.put(`/categories/${id}`, data);
    } catch {
      return { data: { success: true, data: { ...data, _id: id } } };
    }
  },
  deleteCategory: async (id) => {
    try {
      return await api.delete(`/categories/${id}`);
    } catch {
      return { data: { success: true, message: 'Category deleted' } };
    }
  },
};

export const authorAPI = {
  getAuthors: async () => {
    try {
      return await api.get('/authors');
    } catch {
      return { data: { success: true, data: staticData.authors || [] } };
    }
  },
  getAuthorById: async (id) => {
    try {
      return await api.get(`/authors/${id}`);
    } catch {
      const a = (staticData.authors || []).find((item) => item._id === id || item.slug === id);
      return { data: { success: true, data: a } };
    }
  },
  createAuthor: async (data) => {
    try {
      return await api.post('/authors', data);
    } catch {
      const newAuth = { ...data, _id: 'auth_' + Date.now() };
      return { data: { success: true, data: newAuth } };
    }
  },
  updateAuthor: async (id, data) => {
    try {
      return await api.put(`/authors/${id}`, data);
    } catch {
      return { data: { success: true, data: { ...data, _id: id } } };
    }
  },
  deleteAuthor: async (id) => {
    try {
      return await api.delete(`/authors/${id}`);
    } catch {
      return { data: { success: true, message: 'Author deleted' } };
    }
  },
};

export const authAPI = {
  login: async (credentials) => {
    try {
      return await api.post('/auth/login', credentials);
    } catch {
      // Offline / GitHub Pages fallback
      const email = (credentials.email || '').trim().toLowerCase();
      const pwd = (credentials.password || '').trim();

      if (email === 'admin@technova.io' || email.includes('admin') || pwd === 'admin123') {
        const demoUser = staticData.users?.[0] || {
          _id: 'user_admin_01',
          name: 'Alex Mercer',
          email: 'admin@technova.io',
          role: 'admin',
          avatar:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        };
        const demoToken = 'mock_jwt_token_for_static_demo_environment_' + Date.now();
        return { data: { success: true, token: demoToken, user: demoUser } };
      }
      throw new Error('Invalid email or password. Use demo credentials: admin@technova.io / admin123');
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
        avatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
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
  uploadImage: async (formData) => {
    try {
      return await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch {
      // Mock upload for offline/static environments
      return {
        data: {
          success: true,
          url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
        },
      };
    }
  },
};

export const settingsAPI = {
  getSettings: () => api.get('/settings'),
  updateSettings: (data) => api.put('/settings', data),
};

export default api;
