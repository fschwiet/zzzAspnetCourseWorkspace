import axios, { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-toastify';
import { routedHistory } from '../..';
import { store } from '../../stores/store';
import { Activity } from '../models/activity';

axios.defaults.baseURL = 'https://localhost:5001/api';

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

axios.interceptors.response.use(async response => {
  await sleep(800);
  return response;
}, (error : AxiosError) => {
  const {data, status, config} = error.response!;

  if (status === 500) {
    store.commonStore.setServerError(data);
    routedHistory.push('server-error');

  } if (status === 404) {
    routedHistory.push('not-found');

  } else if (status === 400) {
    if(config.method ==='get' && data?.errors?.hasOwnProperty('id'))
    {
      routedHistory.push('not-found');
    }

    if (data && data.errors) {
      var modalStateErrors = [];

      for(const key in data.errors) {
        if (data.errors[key]) {
          modalStateErrors.push(data.errors[key]);
        }
      }

      if (modalStateErrors.length > 0) {
        throw modalStateErrors.flat();
      }
    }
  }

  toast.error(`${status} - ${JSON.stringify(data)}`);
  
  return Promise.reject(error);
});

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T> (url: string) => axios.get<T>(url).then(responseBody),
  post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
  list: () => requests.get<Activity[]>("/activities"),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => requests.post("/activities", activity),
  update: (activity: Activity) => requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.delete(`/activities/${id}`)
}

const Agent = {
  Activities: Activities
};

export default Agent;