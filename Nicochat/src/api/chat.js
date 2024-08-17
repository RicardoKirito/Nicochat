import axios from "/src/api/axios.js";

export const getChatRequest = ()=> axios.get("/chat");
export const addChatRequest = info => axios.post("/chat", info);
export const searchByUsername = username => axios.post(`/chat/search/${username}`)
export const updateChatRequest = info => axios.put(`/chat/${info.id}`, info)
export const deleteChatRequest = id => axios.delete(`/chat/${id}`)
export const getAllChatFilesRequest = id => axios.get(`/chat/files-${id}`)
