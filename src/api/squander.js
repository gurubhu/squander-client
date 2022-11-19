import axios from 'axios';

export default axios.create({
    baseURL : 'https://squander-backend.herokuapp.com/api'
});