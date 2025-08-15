import axios from 'axios';

const newRequest = axios.create({
    baseURL:"https://a4codebackend.onrender.com",
    withCredentials:true,
});

export default newRequest;
