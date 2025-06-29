import axios from 'axios';

const newRequest = axios.create({
    baseURL:"https://a4codebackend-1.onrender.com",
    withCredentials:true,
});

export default newRequest;

