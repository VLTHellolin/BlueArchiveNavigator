import { openDB } from "idb";
import dayjs from "dayjs";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { ImgSource, ImgInfo, ImgAskInfo, ShowImgDialog, ShowAskImgDialog } from "../lib/image";

// Constants
const DBName = "BANavDB";
const ServerID = ["日服", "国际服", "国服", "所有区服"]; // JP, Global, CN, All

// Formatting string
String.prototype.format = function () {
  let res = this;
  for (let arg in arguments) {
    res = res.replace("{" + arg + "}", arguments[arg]);
  }
  return res;
};

// Get a student's next birthday
const GetNextBirthday = function (birthday) {
  let curDate = dayjs().hour(0).minute(0).second(0).millisecond(0),
    nxtDate = dayjs().hour(0).minute(0).second(0).millisecond(0);
  nxtDate = nxtDate
    .month(parseInt(birthday.split("/")[0]) - 1)
    .date(parseInt(birthday.split("/")[1]));
  nxtDate = nxtDate.year(curDate.year() + (nxtDate.month() >= curDate.month() ? 0 : 1));
  return nxtDate;
};

// Get a string representing a time range
const GetTimeRangeString = function (st, ed) {
  // milli
  return dayjs(st).format("MM/DD HH:mm") + " ~ " + dayjs(ed).format("MM/DD HH:mm");
};

// IndexedDB
const SetItemToDB = async function (key, data) {
  const db = await openDB(DBName, 2, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("main")) {
        // init
        db.createObjectStore("main");
      }
    }
  });
  const obj = db.transaction("main", "readwrite").objectStore("main");
  await obj.put(data, key);
};
const GetItemFromDB = async function (key) {
  const db = await openDB(DBName);
  if (!db.objectStoreNames.contains("main")) {
    // try to get before init
    return undefined;
  }
  return db.transaction("main", "readonly").objectStore("main").get(key);
};
const TryGetItemFromDB = async function (key, data) {
  let res = await GetItemFromDB(key);
  if (res === undefined) {
    await SetItemToDB(key, data);
    res = data;
  }
  return res;
};

// Get Activities
const GetActivitiesFromGameKee = async function () {
  let req = await $.ajax({
    type: "GET",
    url: `https://ba.gamekee.com/v1/activity/query?active_at=${dayjs().unix()}`,
    headers: {
      "game-alias": "ba"
    }
  });
  return req.data;
};
const GetActivitiesFromSchaleDB = async function () {
  let curDate = dayjs().hour(0).minute(0).second(0).millisecond(0),
    nxtDate = dayjs().hour(0).minute(0).second(0).millisecond(0);
  nxtDate = nxtDate.date(curDate.date() + 7);
  let req = await $.ajax({
    type: "GET",
    url: "https://schale.gg/data/zh/students.min.json"
  });
  let res = [];
  req.forEach((s) => {
    if (s.Name.includes("(") || s.Name.includes("（")) return;
    let nxtBirthday = GetNextBirthday(s.BirthDay).unix();
    if (nxtBirthday < nxtDate.unix() && nxtBirthday >= curDate.unix()) res.push(s);
  });
  return res;
};
const GetActivities = async function () {
  let activity = await GetActivitiesFromGameKee(),
    birthday = await GetActivitiesFromSchaleDB(),
    res = [];
  let curDate = dayjs().valueOf();
  // { name, description, start, end, server, current }
  activity.forEach((e) => {
    let obj = {};
    obj.name = e.title;
    obj.description = e.description;
    obj.start = e.begin_at * 1000;
    obj.end = e.end_at * 1000;
    obj.server = ServerID.findIndex((g) => {
      return g == e.pub_area;
    });
    obj.current = obj.start <= curDate;
    res.push(obj);
  });
  birthday.forEach((e) => {
    let obj = {};
    obj.name = e.Name + " 的生日";
    obj.description = e.FamilyName + " " + e.PersonalName;
    obj.start = GetNextBirthday(e.BirthDay).valueOf();
    obj.end = obj.start + 86399999;
    obj.server = 3;
    obj.current = obj.start <= curDate;
    res.push(obj);
  });
  res.sort((a, b) => {
    return a.start - b.start;
  });
  return res;
};

// Get a image from Arona
const GetImageFromArona = async function (name) {
  NProgress.start();
  $.toast({ message: "获取资源中..." });

  let req = await $.ajax({
    type: "GET",
    // url: `https://arona.diyigemt.com/api/v1/image?name=${name}`
    url: `https://pro.hellolin.cf/https://arona.diyigemt.com/api/v1/image?name=${name}`
  });

  NProgress.set(0.4);

  if (req.status === 200) {
    // ok
    let localData = await TryGetItemFromDB("image", {}),
      msg = "已通过本地缓存加载。";
    let el = req.data[0];

    NProgress.set(0.6);

    if (localData[el.name] === undefined || localData[el.name].hash !== el.hash) {
      msg = "已通过服务器更新。";
      localData[el.name] = { hash: undefined, img: undefined };

      let newImg = new Blob();
      let maxTries = 3;

      while (newImg.size === 0 && maxTries) {
        newImg = await $.ajax({
          type: "GET",
          // url: `https://arona.cdn.diyigemt.com/image${el.path}`,
          url: `https://pro.hellolin.cf/https://arona.cdn.diyigemt.com/image${el.path}`,
          cache: false,
          xhr: () => {
            var xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            return xhr;
          }
        });
        --maxTries;
      }
      if (newImg.size === 0) {
        console.error("API returned unexpected value");
        $.toast({ class: "warning", message: "出现错误。" });
        NProgress.done();
        return;
      }

      NProgress.set(0.8);

      localData[el.name].hash = el.hash;
      localData[el.name].img = newImg;
    }

    window.URL.revokeObjectURL(localData[el.name].img);
    let res = window.URL.createObjectURL(localData[el.name].img);
    await SetItemToDB("image", localData);

    NProgress.done();
    ImgInfo.value = msg;
    ImgSource.value = res;
    $.toast({ class: "success", message: "获取完成。" });
    ShowImgDialog();
  } else if (req.status === 101) {
    // fuzzy
    let res = [];

    req.data.forEach((e) => {
      res.push({ name: e.name, url: undefined });
    });

    NProgress.done();
    ImgAskInfo.value = res;
    $.toast({ class: "success", message: "获取完成。" });
    ShowAskImgDialog();
  } else {
    console.error("API returned unexpected value");
    $.toast({ class: "warning", message: "出现错误。" });
    NProgress.done();
  }
};

// Check if we are in a dev env
const IsInDevelopment = function () {
  return AppInfo.AppEnv === "development";
};

var Utils = {
  ServerID,
  GetTimeRangeString,
  SetItemToDB,
  GetItemFromDB,
  TryGetItemFromDB,
  GetActivities,
  GetImageFromArona,
  IsInDevelopment
};
export default Utils;
