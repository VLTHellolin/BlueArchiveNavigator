<script setup lang="ts">
import { getImageFromArona } from '@/lib';
import { ref, reactive, watch } from 'vue';
import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalHeader,
} from 'vue-fomantic-ui';

const isDialogShow = ref(false);
let options = reactive(['']);
export async function showOptionsDialog(opt: string[]) {
  options = opt;
  isDialogShow.value = true;
  return new Promise<void>((resolve) => {
    watch(isDialogShow, () => {
      resolve();
    });
  });
}
</script>

<template lang="pug">
Modal(dimmer='blurring' v-model='isDialogShow')
  ModalHeader {{ $t('dialog.options.title') }}
  ModalContent {{ $t('dialog.options.content') }}
  ModalActions
    template(v-for='option in options')
      Button(@click='isDialogShow = false; getImageFromArona(option)' primary) {{ option }}
</template>
