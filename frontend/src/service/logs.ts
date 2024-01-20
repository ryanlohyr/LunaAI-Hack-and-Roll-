import { api } from "./api"

export const getLogs = async () => {
    const res = await api.get(`/chat-summary`)
    return res.data;
}