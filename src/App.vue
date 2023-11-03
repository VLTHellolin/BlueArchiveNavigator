<script setup>
import AppMenu from "./components/AppMenu.vue";
import AppContainer from "./components/AppContainer.vue";
import AppFooter from "./components/AppFooter.vue";
import ImageDialog from "./components/ImageDialog.vue";
import ImageAskDialog from "./components/ImageAskDialog.vue";
</script>

<template lang="pug">
ImageDialog
ImageAskDialog
AppMenu
AppContainer
  router-view
AppFooter
</template>
