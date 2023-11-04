<script setup>
import Utils from "../utils";
const ShowFinished = function () {
  $.toast({ class: "success", message: "清理完成！" });
};
</script>

<template lang="pug">
.ui.segment
  h3.ui.header 缓存
  h4.ui.header
    | 禁用本地缓存
    .ui.small.attention.label(v-if="!Utils.IsInDevelopment()") 在当前部署环境中不可用
  .ui.slider.checkbox
    input(type="checkbox" :disabled="!Utils.IsInDevelopment()")
    label 禁用本地缓存
  h4.ui.header 清理本地缓存
  p 清理缓存后，所有图片数据都会被清空，下次请求数据时会重新从服务器上拉取。
  p 若非必要，不建议清理缓存，因为这会加重 CDN 服务器的负担。你确定要清理吗？
  button.ui.negative.button(@click="Utils.SetItemToDB('image', {}); ShowFinished();") 开始清理
</template>
