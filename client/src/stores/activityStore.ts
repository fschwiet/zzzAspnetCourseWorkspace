import { makeAutoObservable, runInAction } from "mobx";
import Agent from "../app/api/agent";
import { Activity, ActivityFormFields } from "../app/models/activity";
import { v4 as uuid } from 'uuid'
import { format } from "date-fns";
import { store } from "./store";

export default class ActivityStore {

  activityRegistry = new Map<string, Activity>()
  loadedAllActivities = false
  editMode = false;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  private storeActivity = (activity: Activity) => {
    const user = store.userStore.user;

    if (user) {
      activity.isGoing = activity.attendees!.some(a => a.username === user.username);
      activity.isHost = user.username === activity.hostUsername;
      activity.host = activity.attendees?.find(attendee => attendee.username === activity.hostUsername)!;
    }

    activity.date = new Date(activity.date)
    this.activityRegistry.set(activity.id, activity)
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => b.date.getTime() - a.date.getTime());
  }

  get activitiesGroupedByDate() {
    return this.activitiesByDate.reduce((acc: Map<string, Activity[]>, activity: Activity) => {

      var groupKey = format(activity.date, 'dd MMM yyyy'); 

      if (!acc.has(groupKey))
        acc.set(groupKey, []);

      acc.get(groupKey)!.push(activity);

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

  createOrEditActivity = async (activity: ActivityFormFields) => {
    this.loading = true;

    if (activity.id) {
      try {
        const activityFromServer = await Agent.Activities.update(activity);

        runInAction(() => {
          this.storeActivity(activityFromServer);
        });
      }
      catch (error) {
        console.log(error);
      } finally {
        runInAction(() => {
          this.loading = false;
        });
      }
    }
    else {
      activity.id = uuid();
      try {
        const activityFromServer = await Agent.Activities.create(activity);
        runInAction(() => {
          this.storeActivity(activityFromServer);
        });
      }
      catch (error) {
        console.log(error);
      } finally {
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
      });
    }
    catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  toggleAttendance = async (id: string) => {

    this.loading = true;

    try {
      const modifiedActivity = await Agent.Activities.toggleAttendance(id);

      if (modifiedActivity) {
        this.storeActivity(modifiedActivity);
      }
    } catch(err) {
      console.log(err);
    } finally {
      runInAction(() => this.loading = false)
    }
  }
}