import { makeAutoObservable, runInAction } from "mobx";
import Agent from "../app/api/agent";
import { Activity } from "../app/models/activity";
import {v4 as uuid} from 'uuid'

export default class ActivityStore {

  Activities : Activity[] = []
  SelectedActivity: Activity | undefined = undefined
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
    /*
    makeObservable(this, {
      title: observable,
      setTitle: action,
      ...
    });
    */
  }

  loadActivities = async () => {
    this.loadingInitial = true;

    try
    {
      var activities = await Agent.Activities.list();

      runInAction(() => {
        this.Activities = activities;
        this.loadingInitial = false;
      })
    }
    catch(error) {
      console.log(error);

      runInAction(() => {
        this.loadingInitial = false;
      })
    }
  }

  setSelectedActivity = (id: string) => {
    this.editMode = false;
    this.SelectedActivity = this.Activities.find(x => x.id === id);
  }

  clearSelectedActivity = () => { 
    this.editMode = false;
    this.SelectedActivity = undefined 
  }

  setEditSelected = () => {
    this.editMode = true
  }
  
  setEditNew = () => {
    this.SelectedActivity = undefined;
    this.editMode = true
  }
  
  clearEdit = () => {
    this.editMode = false
  }

  createOrEditActivity = async (activity: Activity) => {
    this.loading = true;

    if (activity.id) {

      try
      {
        await Agent.Activities.update(activity);

        runInAction(() => {
          this.Activities = [...this.Activities.filter(x => x.id !== activity.id), activity];
          this.setSelectedActivity(activity.id);
          this.loading = false;
        });
      }
      catch(error)
      {
        console.log(error);
        runInAction(() => {
          this.loading = false;
        });
      }
    } 
    else
    {
      activity.id = uuid();
      try
      {
        await Agent.Activities.create(activity);
        runInAction(() => {
          this.Activities = [...this.Activities, activity];
          this.setSelectedActivity(activity.id)
          this.loading = false;
        });
      }
      catch(error)
      {
        console.log(error);
        runInAction(() => {
          this.loading = false;
        });
      }
    }
  }

  deleteActivity = async (id: string) => {
    this.loading = true;

    try
    {
      await Agent.Activities.delete(id);

      runInAction(() => {
        this.Activities = ([...this.Activities.filter(x => x.id !== id)]);

        if (this.SelectedActivity?.id === id) 
          this.SelectedActivity = undefined;

        this.loading = false;
      });
    }
    catch(error)
    {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}