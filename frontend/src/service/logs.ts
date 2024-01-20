import { api } from "./api"

export const getLogs = async () => {
    const res = await api.get(`/call-logs`)
    return res.data;
}