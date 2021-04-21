import axios, { AxiosResponse } from 'axios'
import { Activity } from '../models/activity';

axios.defaults.baseURL = "https://localhost:5001/api";

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T> (url: string) => axios.get<T>(url).then(responseBody),
  post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
  list: () => requests.get<Activity[]>("/Activities").then(activities => activities.map(function (activity) {
    return {...activity, date: activity.date.split("T")[0]};
  }))
}

const Agent = {
  Activities: Activities
};

export default Agent;