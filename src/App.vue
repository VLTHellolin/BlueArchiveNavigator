<script setup>
import AppMenu from "./components/AppMenu.vue";
import AppContainer from "./components/AppContainer.vue";
import AppFooter from "./components/AppFooter.vue";
import ImageDialog from "./components/ImageDialog.vue";
import ImageAskDialog from "./components/ImageAskDialog.vue";
import NoIndexedDB from "./components/errors/NoIndexedDB.vue";
var noIndexedDB = !globalThis || !globalThis.indexedDB;
</script>

<template lang="pug">
NoIndexedDB(v-if="noIndexedDB")
template(v-else)
  ImageDialog
  ImageAskDialog
  AppMenu
  AppContainer
    router-view
  AppFooter
</template>
