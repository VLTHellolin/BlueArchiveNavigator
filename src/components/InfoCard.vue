<script setup lang="ts">
import { Segment, Header } from 'vue-fomantic-ui';
</script>

<template lang="pug">
.info_card
  Segment.info_card_header(attached='top')
    Header(as='h3' block)
      slot(name='header')
  Segment.info_card_content(attached='bottom')
    slot
</template>
