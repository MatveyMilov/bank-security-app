import axios, { type AxiosResponse } from "axios";
import type { Incident } from "./types";

const api = axios.create({
  baseURL: "https://69ce23b933a09f831b7cf51f.mockapi.io",
});

// Получить все инциденты
export const getIncidents = (): Promise<AxiosResponse<Incident[]>> =>
  api.get<Incident[]>("/incidents");

// Получить один инцидент
export const getIncidentById = (id: string): Promise<AxiosResponse<Incident>> =>
  api.get<Incident>(`/incidents/${id}`);

// Создать инцидент
export const createIncident = (data: Omit<Incident, 'id'>) => 
  api.post<Incident>("/incidents", data);

// Обновить инцидент 
export const updateIncident = (
  id: string,
  updatedData: Partial<Incident>,
): Promise<AxiosResponse<Incident>> =>
  api.patch<Incident>(`/incidents/${id}`, updatedData);

// Удалить инцидент
export const deleteIncident = (id: string): Promise<AxiosResponse<void>> =>
  api.delete(`/incidents/${id}`);

export default api;
