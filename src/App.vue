<script setup lang="ts">
import MainMenu from './components/MainMenu.vue';
import MainContainer from './components/MainContainer.vue';
import MainFooter from './components/MainFooter.vue';
import ImageDialog from './components/ImageDialog.vue';
</script>

<template lang="pug">
//- Dialogs
ImageDialog
//- Main page
MainMenu
MainContainer
  router-view
MainFooter
</template>
