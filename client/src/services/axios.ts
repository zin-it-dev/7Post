import axios from 'axios';

export const clientHttp = axios.create({
	baseURL: 'http://127.0.0.1:5000',
	headers: {
		'Content-Type': 'application/json',
	},
});
