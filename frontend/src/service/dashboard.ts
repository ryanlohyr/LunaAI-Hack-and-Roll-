import { Metadata } from "@/features/tuning/types/tuning.type";
import { api } from "./api"

export const getImptInfo = async () => {
    const res = await api.get("/")
    return res.data;
}

export const getPresetPrompt = async () => {
    const res = await api.get("/preset")
    return res.data;
}

export const getLogsSummary = async () => {
    const res = await api.get("/preset")
    return res.data;
}

export const getPendingActions = async () => {
    const res = await api.get("/pending-actions")
    return res.data;
}

// TODO: replace with official routes
export const postPresetPrompt = async (prompt: string) => {
    const res = await api.post("/preset")
    return res.data
}

export const postImptInfo = async (data: Metadata[]) => {
    const res = await api.post("/preset")
    return res.data
}

