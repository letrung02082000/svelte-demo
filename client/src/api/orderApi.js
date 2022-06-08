import axiosClient from './axiosClient';

class Api {
  getOrders = async (page, limit, search) => {
    return axiosClient.get('/orders', {
      params: {
        search,
        page,
        limit,
      },
    });
  };

  createOrder = async (data) => {
    return axiosClient.post('/orders', data);
  };
}

export default new Api();
