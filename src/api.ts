import axios from "axios";

const api = axios.create({
  baseURL: "https://69ce23b933a09f831b7cf51f.mockapi.io",
});

export const getIncidents = () => api.get("/incidents");
export const getIncidentById = (id: string) => api.get(`/incidents/${id}`);
export const createIncident = (data: any) => api.post("/incidents", data);


export const updateIncident = (id: string, data: any) => api.put(`/incidents/${id}`, data);
export const deleteIncident = (id: string) => api.delete(`/incidents/${id}`);

export default api;