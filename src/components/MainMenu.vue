<script setup lang="ts">
import { reactive } from 'vue';
import { Menu, Container } from 'vue-fomantic-ui';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const menuLeft = reactive([
  { title: t('menu.home'), icon: 'home', href: '/' },
  { title: t('menu.tasks'), icon: 'gamepad', href: '/tasks' },
  { title: t('menu.students'), icon: 'user', href: '/students' },
]);
const menuRight = reactive([
  { title: t('menu.settings'), icon: 'cog', href: '/settings' },
]);
</script>

<template lang="pug">
Menu(borderless fixed top)
  Container
    //- Main title
    router-link.item(to='/')
      #sitename
        span.blue BA
        span Nav
    //- Left menu
    template(v-for='it in menuLeft')
      router-link.item(
        :class='{ active: $route.path === it.href }',
        :to='it.href')
    //- Right menu
    template(#right)
      template(v-for='it in menuRight')
        router-link.item(
          :class='{ active: $route.path === it.href }',
          :to='it.href')
</template>
