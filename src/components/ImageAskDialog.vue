<script setup>
import { ImgAskInfo } from "../helpers/image.js";
import Utils from "../utils";
</script>

<template lang="pug">
.ui.modal#image_ask_dialog
  .header 请选择
  .content 基于模糊匹配，我们找到了四个与你搜索结果最接近的选项。
  .actions
    template(v-for="it in ImgAskInfo")
      button.ui.primary.approve.button(@click="Utils.GetImageFromArona(it.name)") {{ it.name }}
</template>
