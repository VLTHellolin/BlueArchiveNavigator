import { ref, nextTick, watch } from "vue";
import Utils from "../utils";

export var activities = [],
  filteredActivities = [],
  activitiesShow = ref(false),
  activityFilter = ref(0);
Utils.TryGetItemFromDB("server", 0).then((e) => {
  activityFilter.value = e;
});
export const ReloadActivitiesEl = () => {
  activitiesShow.value = false;
  nextTick(() => {
    activitiesShow.value = true;
  });
};
export const ReloadActivities = () => {
  Utils.GetActivities().then((e) => {
    activities = e;
    filteredActivities = activities.filter((e) => {
      if (activityFilter.value === 3) return true;
      return e.server === activityFilter.value || e.server === 3;
    });
    ReloadActivitiesEl();
  });
};

ReloadActivities();

watch(activityFilter, async (fil) => {
  Utils.SetItemToDB("server", fil);
  filteredActivities = activities.filter((e) => {
    if (fil === 3) return true;
    return e.server === fil || e.server === 3;
  });
  ReloadActivitiesEl();
});
