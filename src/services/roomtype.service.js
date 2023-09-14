import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL+'/api/roomtypes/';

class RoomTypeService {
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
    async show(id,params) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('userToken')}`;
          const response = await axios
            .get(API_URL + 'show/'+id,{params: params}).catch(error => {
              return false;
            });
        if (response) {
            return response.data;
        }
    }
}
export default new RoomTypeService();