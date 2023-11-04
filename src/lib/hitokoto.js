import { ref } from "vue";
export var HitokotoContent = ref(""),
  HitokotoFrom = ref("");
export const ReloadHitokoto = () => {
  $.ajax({
    type: "GET",
    url: "https://v1.hitokoto.cn/",
    success: (data) => {
      HitokotoContent.value = data.hitokoto;
      HitokotoFrom.value = data.from;
    }
  });
};
ReloadHitokoto();
