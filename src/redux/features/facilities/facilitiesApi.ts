import axios from 'axios';
import { Facility } from './types';

const API_URL = 'http://localhost:5500/api/facility';

export const facilitiesApi = {
  getAllFacilities: () => axios.get(API_URL),
  getFacilityById: (id: string) => axios.get(`${API_URL}/${id}`),
  createFacility: (data: FormData) => axios.post(API_URL, data),
  updateFacility: (id: string, data: Partial<Facility>) =>
    axios.put(`${API_URL}/${id}`, data),
  deleteFacility: (id: string) => axios.delete(`${API_URL}/${id}`),
};
