import axios, { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-toastify';
import { routedHistory } from '../..';
import { store } from '../../stores/store';
import { Activity, ActivityFormFields } from '../models/activity';
import { User, UserFormValues } from '../models/user';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

axios.interceptors.request.use(request => {
  const token = store.commonStore.token;

  request.headers.Authorization = `Bearer ${token}`;
  return request;
});

if (process.env.NODE_ENV === 'development') {
  axios.interceptors.response.use(async response => {
    await sleep(800);

    return response;
  });
}

axios.interceptors.response.use(undefined, (error: AxiosError) => {
  const { data, status, config } = error.response!;

  if (status === 500) {
    store.commonStore.setServerError(data);
    routedHistory.push('server-error');

  } if (status === 404) {
    routedHistory.push('not-found');

  } else if (status === 400) {
    if (config.method === 'get' && data?.errors?.hasOwnProperty('id')) {
      routedHistory.push('not-found');
    }

    if (data && data.errors) {
      var modalStateErrors = [];

      for (const key in data.errors) {
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

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
  list: () => requests.get<Activity[]>("/activities"),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: ActivityFormFields) => requests.post<Activity>("/activities", activity),
  update: (activity: ActivityFormFields) => requests.put<Activity>(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.delete(`/activities/${id}`),
  toggleAttendance: (id: string) => requests.post<Activity>(`/activities/${id}/toggle-attendance`, {}),
}

const Account = {
  current: () => requests.get<User>("/account"),
  login: (user: UserFormValues) => requests.post<User>("/account/login", user),
  register: (user: UserFormValues) => requests.post<User>("/account/register", user),
}

const Agent = {
  Activities: Activities,
  Account: Account
};

export default Agent;

