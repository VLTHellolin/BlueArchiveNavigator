<script setup lang="ts">
import { isDialogShow, options } from './showOptionsDialog';
import { getImageFromArona } from '@/lib';
import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalHeader,
} from 'vue-fomantic-ui';
</script>

<template lang="pug">
Modal(dimmer='blurring' v-model='isDialogShow')
  ModalHeader {{ $t('dialog.options.title') }}
  ModalContent {{ $t('dialog.options.content') }}
  ModalActions
    template(v-for='option in options')
      Button(@click='isDialogShow = false; getImageFromArona(option)' primary) {{ option }}
</template>
