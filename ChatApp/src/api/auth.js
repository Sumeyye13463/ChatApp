// ...existing code...
const VITE_APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL;
import axios from 'axios';

// {changed code}
async function login(username, password) {
    return axios.post(`${VITE_APP_BASE_URL}/users/login`, { username, password });
}

async function createUser (username, email, password) {
    return axios.post(`${VITE_APP_BASE_URL}/users`, { username, email, password });
}
// ...existing code...
export const  authApi = { login, createUser };