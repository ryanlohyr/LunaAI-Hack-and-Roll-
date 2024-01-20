import { Vector } from "@/features/tuning/types/tuning.type";
import { api } from "./api"

export const getImptInfo = async () => {
    const res = await api.get("/index/important-info")
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

export const postPresetPrompt = async (prompt: string) => {
    const res = await api.post("/preset", {prompt: prompt})
    return res.data
}

export const postImptInfo = async (data: Vector[]) => {
    const res = await api.post("/impt-info", {data: data})
    return res.data
}

