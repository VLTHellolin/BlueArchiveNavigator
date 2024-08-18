<script setup lang="ts">
import { isDialogShow, imageSource } from './showImageDialog';
import {
  Button,
  Icon,
  Image,
  Modal,
  ModalActions,
  ModalContent,
  ModalHeader,
} from 'vue-fomantic-ui';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
Fancybox.bind('[data-fancybox]', {
  contentClick: 'iterateZoom',
  Images: {
    Panzoom: {
      maxScale: 2,
    },
  },
});
</script>

<template lang="pug">
Modal(dimmer='blurring' v-model='isDialogShow')
  ModalHeader {{ $t('dialog.image.title') }}
  ModalContent(scrolling)
    p {{ $t('dialog.image.zoom') }}
    a(:href='imageSource' data-fancybox)
      Image(:src='imageSource' fluid)
  ModalActions
    Button(@click='isDialogShow = false' primary)
      | {{ $t('dialog.ok') }}
      Icon(name='right chevron')
</template>
