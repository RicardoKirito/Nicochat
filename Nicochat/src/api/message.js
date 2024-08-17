import axios from "/src/api/axios.js";


export const chatMessagesRequest =  id => axios.get(`/message/${id}`)
export const getFileRequest = axios.defaults.baseURL+"/uploads/"; 
export const deleteMessageRequest = id => axios.delete(`/message/${id}`)
export const editMessageRequest = (id, data) => axios.put(`/message/${id}`, data)