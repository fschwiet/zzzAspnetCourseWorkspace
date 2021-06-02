import { makeAutoObservable, runInAction } from "mobx";
import agent from "../app/api/agent";
import { User, UserFormValues } from "../app/models/user";
import { store } from "./store";

export default class UserStore {
  user: User | null = null

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.login(creds)

      runInAction(() => {
        store.commonStore.setToken(user.token);
        this.user = user
      })
    } catch (error) {
      throw error;
    }
  }

  logout = () => {
    store.commonStore.setToken(null);
    this.user = null;
  }

  getUser = async () => {
    try {
      const user = await agent.Account.current();
      console.log(user)

      runInAction(() => this.user = user);
    } catch (err) {
      console.log(err)
    }
  }
}