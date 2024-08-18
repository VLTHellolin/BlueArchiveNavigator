<script setup lang="ts">
import { ref } from 'vue';
import {
  Button,
  Checkbox,
  Header,
  Label,
  Popup,
  Segment,
  useToast,
} from 'vue-fomantic-ui';
import { db } from '@/lib';
import { useI18n } from 'vue-i18n';

const isInDev = AppInfo.AppEnv === 'env';
const trigger = ref<any>(null);
const { toast } = useToast();
const { t } = useI18n();
const clearCache = async function () {
  await db.deleteAll();
  toast({
    message: t('settings.cache.clear.ok'),
  });
};
</script>

<template lang="pug">
Segment
  Header(as='h3') {{ $t('settings.cache') }}

  Checkbox(:disabled='isInDev', :label='$t("settings.cache.disable")' slider)
  Label.attention(size='small' v-if='isInDev') {{ $t('env.unavaliable') }}

  Button(@click='clearCache()' negative ref='trigger') {{ $t('settings.cache.clear.title') }}
  Popup(:trigger='trigger')
    p {{ $t('settings.cache.clear.warning') }}
</template>
