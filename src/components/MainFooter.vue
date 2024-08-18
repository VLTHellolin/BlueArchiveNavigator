<script setup lang="ts">
import { Container } from 'vue-fomantic-ui';
const AppVersion = `Version ${AppInfo.AppVersion} | ${AppInfo.AppGitShortVersion}`;
const AppEnv = `Env ${AppInfo.AppEnv}`;
</script>

<template lang="pug">
Container#footer_container(textAlign='center')
  //- Copyright message
  div
    | Made with 💖 by
    |
    a(href='https://hellolin.top' target='_blank') hellolin
    | .
  div
    code#footer_version {{ AppVersion }}
    br
    code#footer_env {{ AppEnv }}
</template>
