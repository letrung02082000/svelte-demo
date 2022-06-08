import axiosClient from './axiosClient';

class TagApi {
  getTags = async (page, limit) => {
    return axiosClient.get('/admin/tag', {
      params: { page, limit },
    });
  };

  getVisibleTags = async (page, limit) => {
    return axiosClient.get('/admin/tag', {
      params: { page, limit, search: { isVisible: true } },
    });
  };

  getTagsByCategory = async (page, limit, category) => {
    return axiosClient.get('/admin/tag', {
      params: { page, limit, search: { category, parent: null } },
    });
  };

  getTagsByParent = async (page, limit, parent) => {
    return axiosClient.get('/admin/tag', {
      params: { page, limit, search: { parent } },
    });
  };

  createTag = async (data) => {
    return axiosClient.post('/api/admin/photocopy/tag', data);
  };
}

export default new TagApi();
