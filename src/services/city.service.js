import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL+'/api/';

class CityService {
    async indexCiudad(depto) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('userToken')}`;
        const response = await axios
          .get(API_URL + 'ciudades/index?departamento='+depto).catch(error => {
            return false;
          });
        if (response) {
          return response.data;
        }
      }
      async indexDepto() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('userToken')}`;
        const response = await axios
          .get(API_URL + 'deptos/index').catch(error => {
            return false;
          });
        if (response) {
          return response.data;
        }
      }
}

export default new CityService();