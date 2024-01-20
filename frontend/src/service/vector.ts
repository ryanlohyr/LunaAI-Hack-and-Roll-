import { api } from "./api";

export const getAllIndex = async () => {
    const res = await api.get('/index');
    return res.data;
}

export const getIndexVectors = async (indexName: string) => {
    const res = await api.get(`/index/${indexName}`);
    return res.data;
}

export const postVector = async (id: string, data: string, indexName: string) => {
    const res = await api.post(`/index/`, {
        index: indexName,
        id: id,
        data: data
    });
    return res.data;
}
