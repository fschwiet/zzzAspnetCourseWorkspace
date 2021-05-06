import { makeAutoObservable, runInAction } from "mobx";
import Agent from "../app/api/agent";
import { Activity } from "../app/models/activity";
import {v4 as uuid} from 'uuid'

export default class ActivityStore {

  activityRegistry = new Map<string, Activity>()
  selectedActivity: Activity | undefined = undefined
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

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a,b) => Date.parse(b.date) - Date.parse(a.date));
  }

  loadActivities = async () => {
    this.loadingInitial = true;

    try
    {
      var activities = await Agent.Activities.list();

      runInAction(() => {
        activities.forEach(a => this.activityRegistry.set(a.id, a));
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
    this.selectedActivity = this.activityRegistry.get(id);
  }

  clearSelectedActivity = () => { 
    this.editMode = false;
    this.selectedActivity = undefined 
  }

  setEditSelected = () => {
    this.editMode = true
  }
  
  setEditNew = () => {
    this.selectedActivity = undefined;
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
          this.activityRegistry.set(activity.id, activity);
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
          this.activityRegistry.set(activity.id, activity);
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
        this.activityRegistry.delete(id)

        if (this.selectedActivity?.id === id) 
          this.selectedActivity = undefined;

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