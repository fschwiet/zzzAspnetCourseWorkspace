import axios, { AxiosResponse } from 'axios'
import { Activity } from '../models/activity';

axios.defaults.baseURL = "https://localhost:5001/api";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

axios.interceptors.response.use(async response => {
  try {
    await sleep(2000);
    return response;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
});

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T> (url: string) => axios.get<T>(url).then(responseBody),
  post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
  list: () => requests.get<Activity[]>("/activities").then(activities => activities.map(function (activity) {
    return {...activity, date: activity.date.split("T")[0]};
  })),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => requests.post("/activities", activity),
  update: (activity: Activity) => requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.delete(`/activities/${id}`)
}

const Agent = {
  Activities: Activities
};

export default Agent;