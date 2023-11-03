import { ref } from "vue";
export var ImgSource = ref("");
export var ImgInfo = ref("");
export var ImgAskInfo = ref([]);
export const ShowImgDialog = (img, info) => {
  if (img !== undefined) ImgSource.value = img;
  if (info !== undefined) ImgInfo.value = info;
  $("#image_dialog").modal("show");
};
export const ShowAskImgDialog = (info) => {
  if (info !== undefined) ImgAskInfo.value = info;
  $("#image_ask_dialog").modal("show");
};
