import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL+'/api/rooms/';

class RoomService {
    async index(params) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('userToken')}`;
        const response = await axios
          .get(API_URL + 'index',{params: params}).catch(error => {
            return false;
          });
        if (response) {
          return response.data;
        }
      }
      async create(params) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('userToken')}`;
        const response = await axios
          .post(API_URL + 'create',params).catch(error => {
            return error.response;
          });
        if (response) {
          return response.data;
        }
      }
      async update(id,params) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('userToken')}`;
        const response = await axios
          .put(API_URL + 'update/'+id,params).catch(error => {
            return error.response;
          });
        if (response) {
          return response.data;
        }
      }
}

export default new RoomService();