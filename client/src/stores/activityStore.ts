import { makeAutoObservable, runInAction } from "mobx";
import Agent from "../app/api/agent";
import { Activity } from "../app/models/activity";
import { v4 as uuid } from 'uuid'

export default class ActivityStore {

  activityRegistry = new Map<string, Activity>()
  loadedAllActivities = false
  editMode = false;
  loading = false;

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

  private storeActivity = (activity: Activity) => {
    activity.date = activity.date.split("T")[0];
    this.activityRegistry.set(activity.id, activity)
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(b.date) - Date.parse(a.date));
  }

  get activitiesGroupedByDate() {
    return this.activitiesByDate.reduce((acc: Map<string, Activity[]>, activity: Activity) => {
      if (!acc.has(activity.date))
        acc.set(activity.date, []);

      acc.get(activity.date)!.push(activity);

      return acc;
    }, new Map<string, Activity[]>())
  }

  ensureActivitiesLoaded = async () => {
    if (this.loadedAllActivities)
      return;

    await this.loadActivities()
  }

  loadActivities = async () => {
    try {
      var activities = await Agent.Activities.list();

      runInAction(() => {
        activities.forEach(a => this.storeActivity(a));
        this.loadedAllActivities = true
      })
    }
    catch (error) {
      console.log(error);
    }
  }

  loadActivity = async (id: string) => {
    let activity = this.activityRegistry.get(id);

    if (activity) {
    } else {
      try {
        activity = await Agent.Activities.details(id);
        this.storeActivity(activity)
      }
      catch (error) {
        console.log(error);
      }
    }

    return activity;
  }

  createOrEditActivity = async (activity: Activity) => {
    this.loading = true;

    if (activity.id) {
      try {
        await Agent.Activities.update(activity);

        runInAction(() => {
          this.activityRegistry.set(activity.id, activity);
          this.loading = false;
        });
      }
      catch (error) {
        console.log(error);
        runInAction(() => {
          this.loading = false;
        });
      }
    }
    else {
      activity.id = uuid();
      try {
        await Agent.Activities.create(activity);
        runInAction(() => {
          this.activityRegistry.set(activity.id, activity);
          this.loading = false;
        });
      }
      catch (error) {
        console.log(error);
        runInAction(() => {
          this.loading = false;
        });
      }
    }

    return activity.id;
  }

  deleteActivity = async (id: string) => {
    this.loading = true;

    try {
      await Agent.Activities.delete(id);

      runInAction(() => {
        this.activityRegistry.delete(id)

        this.loading = false;
      });
    }
    catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}