import axios from "/src/api/axios.js"

export const registerRequest = async user => axios.post(`/register`,  user);
export const logInRequest = async user => axios.post(`/login`,  user);
export const logoutRequest = async user => axios.post(`/logout`,  user);
export const verifyToken = async user => axios.post(`/verify`,  user);
export const ChangePasswordRequest = async change => axios.post(`/chagePassword`,  change);

