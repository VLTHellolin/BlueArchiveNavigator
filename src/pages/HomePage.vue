<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import InfoCard from '@/components/InfoCard.vue';
import {
  Button,
  Dropdown,
  Feed,
  FeedEvent,
  Grid,
  GridColumn,
  Icon,
  Input,
  Message,
  Segment,
} from 'vue-fomantic-ui';
import { shortcutsList, getImageFromArona, getEvents, type Event } from '@/lib';
import dayjs from 'dayjs';

const { t } = useI18n();

const searchInputValue = ref('');

const eventsFilter = ref(t('game.s.jp'));
const eventsServerList = reactive([
  t('game.s.jp'),
  t('game.s.gb'),
  t('game.s.cn'),
]);
const eventsReadyToShow = ref(false);
var events = reactive<Event[]>([]);
const reloadEvents = async function () {
  eventsReadyToShow.value = false;
  events = await getEvents();
  events = events.filter(
    (e) => eventsServerList[e.server] === eventsFilter.value
  );
  eventsReadyToShow.value = true;
};

reloadEvents(); // Reload once by default

const getTimeRange = (e: Event) =>
  e.begin.format('MM/DD HH:mm') + ' - ' + e.end.format('MM/DD HH:mm');

// To anyone who is reading this part of code:
// Don't be curious as to why eslint says some of vars are unused, it's a bug made by me.
// It doesn't affect the result of rendering.
// Maybe one day I will update vue-pug-syntax. XD
// -- hellolin, 2024/08/15

// So I decided to abandon vue-pug-syntax for now...
// -- hellolin, 2024/08/17
</script>

<template lang="pug">
Grid(relaxed stackable)
  //- Main layout of the home page
  //- Due to pug issues we have to use v-bind here.
  GridColumn(:width='10')
    Message(
      :content='$t("home.cache.content")',
      :header='$t("home.cache.title")'
      warning)
    //- Shortcuts card
    InfoCard
      template(#header)
        Icon(name='layer group')
        | {{ $t('home.shortcuts.title') }}
      template(v-for='list in shortcutsList')
        template(v-for='item in list')
          Button.home_shortcut(:primary='item.primary' size='small') {{ item.name }}
    //- Search card
    //- Currently only Chinese
    InfoCard
      template(#header)
        Icon(name='search')
        | {{ $t('home.search.title') }}
      Input(
        :placeholder='$t("home.search.placeholder")'
        @keyup.enter='getImageFromArona(searchInputValue)'
        fluid
        v-model:model-value='searchInputValue')
    //- About card
    InfoCard
      template(#header)
        Icon(name='info')
        | {{ $t('home.about.title') }}
      | {{ $t('home.about.content') }}

  //- Same
  GridColumn(:width='6')
    //- Events card
    InfoCard
      template(#header)
        Icon(name='calendar alternate')
        | {{ $t('home.events.title') }}
      Dropdown(
        :options='eventsServerList'
        fluid
        selection
        v-model='eventsFilter')
      //- Time notification
      br
      p
        | {{ $t('home.events.time') }}
        Button(@click='reloadEvents()' size='mini' tertiary)
          Icon(name='redo')
          | {{ $t('home.events.reload') }}
      //- Main events timeline component
      //- Show when data is fetched
      Feed(size='small' v-if='eventsReadyToShow')
        FeedEvent(v-for='item in events')
          template(#summary) {{ item.name }}
          template(#meta) {{ `${item.server} ${getTimeRange(item)}` }}
      Segment(loading v-else)
</template>
