import { ref } from "vue";
export var hitokotoContent = ref(""),
  hitokotoFrom = ref("");
export const ReloadHitokoto = () => {
  $.ajax({
    type: "GET",
    url: "https://v1.hitokoto.cn/",
    success: (data) => {
      hitokotoContent.value = data.hitokoto;
      hitokotoFrom.value = data.from;
    }
  });
};
ReloadHitokoto();
