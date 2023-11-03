<script setup>
import { reactive, computed } from "vue";
const LeftMenu = reactive([
  { name: "主页", icon: "home", href: "/" },
  { name: "任务", icon: "gamepad", href: "/tasks" },
  { name: "学生", icon: "user", href: "/students" }
]);
const RightMenu = reactive([{ name: "设置", icon: "cog", href: "/settings" }]);
</script>

<template lang="pug">
.ui.borderless.top.fixed.menu
  .ui.container
    router-link.item(to="/")
      #sitename
        span.ui.blue.text BA
        span.ui.text Nav
    template(v-for="it in LeftMenu")
      router-link.item(:to="it.href" :class="{ active: it.href === $route.path }")
        i.icon(:class="it.icon")
        | {{ it.name }}
    .right.menu
      template(v-for="it in RightMenu")
        router-link.item(:to="it.href" :class="{ active: it.href === $route.path }")
          i.icon(:class="it.icon")
          | {{ it.name }}
</template>
