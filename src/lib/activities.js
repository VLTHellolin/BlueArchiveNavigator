import { ref, nextTick, watch } from "vue";
import Utils from "../utils";

export var Activities = [],
  FilteredActivities = [],
  ActivitiesShow = ref(false),
  ActivityFilter = ref(0);
Utils.TryGetItemFromDB("server", 0).then((e) => {
  ActivityFilter.value = e;
});
export const ReloadActivitiesEl = () => {
  ActivitiesShow.value = false;
  nextTick(() => {
    ActivitiesShow.value = true;
  });
};
export const ReloadActivities = () => {
  Utils.GetActivities().then((e) => {
    Activities = e;
    FilteredActivities = Activities.filter((e) => {
      if (ActivityFilter.value === 3) return true;
      return e.server === ActivityFilter.value || e.server === 3;
    });
    ReloadActivitiesEl();
  });
};

ReloadActivities();

watch(ActivityFilter, async (fil) => {
  Utils.SetItemToDB("server", fil);
  FilteredActivities = Activities.filter((e) => {
    if (fil === 3) return true;
    return e.server === fil || e.server === 3;
  });
  ReloadActivitiesEl();
});
