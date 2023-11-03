<script setup>
import { ImgSource, ImgInfo } from "../helpers/image";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
Fancybox.bind("[data-fancybox]", {
  contentClick: "iterateZoom",
  Images: {
    Panzoom: {
      maxScale: 2
    }
  }
});
</script>

<template lang="pug">
.ui.modal#image_dialog
  .header 图片查看
  .scrolling.content
    p {{ ImgInfo }}
    p 点击这个图片可以使用 fancybox 放大。
    a(:href="ImgSource" data-fancybox)
      img.ui.fluid.image(:src="ImgSource")
  .actions
    button.ui.primary.approve.button
      | 看完了
      i.icon.right.chevron
</template>
