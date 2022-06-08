import axiosClient from './axiosClient';

class CategoryApi {
  getCategories = async (page, limit) => {
    return axiosClient.get('/categories', {
      params: { page, limit },
    });
  };

  createCategory = async (data) => {
    return axiosClient.post('/categories', data);
  };

  updateCategory = async (id, data) => {
    return axiosClient.patch(`/categories/${id}`, data);
  };
}

export default new CategoryApi();
