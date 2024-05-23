import axios from 'axios';
const BASE_URL = process.env.BASE_URL;

export const cwdFetch = axios.create({
	baseURL: BASE_URL,
});
