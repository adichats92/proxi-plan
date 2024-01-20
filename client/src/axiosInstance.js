import axios from 'axios';

const instance = axios.create({
	baseURL: import.meta.env.VITE_SERVER_BASE_URL || '',
});

export default instance;
