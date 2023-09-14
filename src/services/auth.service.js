import axios from 'axios';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('userToken')}`;

const API_URL = import.meta.env.VITE_API_URL+'/api/auth/';

class AuthService {
  async login(user) {
    localStorage.removeItem('user');
    localStorage.removeItem('userToken');
    const response = await axios
      .post(API_URL + 'login', user).catch(error => {
        return false;
      });
    if (response) {
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('userToken', response.data.authorization.token);
      return response.data;
    }
  }

  async logout() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('userToken')}`;
    localStorage.removeItem('user');
    localStorage.removeItem('userToken');
    await axios
    .post(API_URL + 'logout');
  }

  register(user) {
    return axios.post(API_URL + 'register', user);
  }

  async refresh() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('userToken')}`;
    const response = await axios
      .post(API_URL + 'refresh').catch(error => {
        return false;
      });
    if (response) {
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('userToken', response.data.authorization.token);
      return response.data;
    }else{
      localStorage.removeItem('user');
      localStorage.removeItem('userToken');
      return false;
    }
  }

}

export default new AuthService();