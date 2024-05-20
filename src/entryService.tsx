import axios, { AxiosError } from 'axios';
import { Entry, NewEntry } from "./types";

const baseUrl = 'http://localhost:3000/api'

export const getAllEntries = async () => {
    try {
      const response = await axios.get<Entry[]>('http://localhost:3000/api/allentries');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response?.data || 'An unknown Axios error occurred';
      } else {
        return 'An unknown error occurred';
      }
    }
  };

export const postEntry = async (object: NewEntry) => {
    try {
        console.log(object)
        const response = await axios.post(baseUrl, object)
        console.log(response.data)
        return response
    } catch (error) {
        if (axios.isAxiosError(error)) {
          return error.response?.data
        } else {
            return 'An unknown error occurred';
        }
      }
}