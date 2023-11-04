<script setup>
import { ref } from "vue";
var AppVersion = ref("Version: " + AppInfo.AppShortVersion);
var BuildInfo = ref("Env: " + AppInfo.AppEnv);
</script>

<template lang="pug">
.ui.center.aligned.container#footer_container
  div
    | Made with 💖 by
    | 
    a(href="https://hellolin.cf" target="_blank") hellolin
    | .
  div
    code#footer_version
      | {{ AppVersion }}
      br
      | {{ BuildInfo }}
</template>
