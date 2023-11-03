<script setup>
import { ref } from "vue";
import PageHomeCard from "./PageHomeCard.vue";
import Utils from "../utils";
import { Buttons } from "../configs/buttons";
import { Links } from "../configs/links";
import {
  filteredActivities,
  activitiesShow,
  activityFilter,
  ReloadActivities
} from "../helpers/home";
import { hitokotoContent, hitokotoFrom, ReloadHitokoto } from "../helpers/hitokoto";
import { watch } from "vue";
var InputQuery = ref("");
</script>
<template lang="pug">
.ui.stackable.relaxed.grid
  .ten.wide.column
    .ui.info.message
      .header 重要
      p 有些请求你发送之后，页面看起来没反应（其实有上面的进度条），此时不要重复发送请求。
    PageHomeCard
      template(#header)
        i.icon.layer.group
        | 快捷方式
      template(v-for="li in Buttons")
        template(v-for="it in li")
          .ui.button.small.home_buttons(@click="Utils.GetImageFromArona(it.name)" :class="{ primary: it.important }")
            | {{ it.name }}
        template(v-if="li != Buttons.at(-1)")
          .ui.divider
    PageHomeCard
      template(#header)
        i.icon.search
        | 查询
      .ui.fluid.action.input
        input(type="text" placeholder="输入你想查找的关键词..." v-model="InputQuery" @keyup.enter="Utils.GetImageFromArona(InputQuery)")
        button.ui.button(@click="Utils.GetImageFromArona(InputQuery)") 搜索
    PageHomeCard
      template(#header)
        i.icon.linkify
        | 常用链接
      .ui.connected.feed
        template(v-for="it in Links")
          .event
            .label
              img(:src="it.image")
            .content
              .summary
                a(:href="it.link" target="_blank") {{ it.name }}
              .extra.text {{ it.description }}
    PageHomeCard
      template(#header)
        i.icon.info
        | 关于
      | Blue Archive Navigator 是一个全新的碧蓝档案工具前端壳子。
      br
      | 图片和其他资源来自
      | 
      a(href="https://arona.diyigemt.com" target="_blank") arona
      | 、
      a(href="https://schale.gg" target="_blank") Schale DB
      | 
      | 以及
      | 
      a(href="https://ba.gamekee.com" target="_blank") GameKee
      | 。在此提出感谢。
      br
      | Blue Archive Navigator 是一个开源项目。你可以在
      |
      a(href="https://github.com/hellolin-oi/BlueArchiveNavigator" target="_blank") 这里
      |
      | 查看源代码、提出 issue 和 pull request 等。本项目以
      |
      a(href="https://github.com/hellolin-oi/BlueArchiveNavigator/LICENSE" target="_blank") MPLv2
      |
      | 作为许可证。
  .six.wide.column
    PageHomeCard
      template(#header)
        i.icon.comment.alternate
        | ヒトコト
      #hitokoto_container {{ hitokotoContent }}
      #hitokoto_from
        span.ui.small.grey.text —— {{ hitokotoFrom }}
        | 
        button.mini.ui.tertiary.button(@click="ReloadHitokoto()")
          i.icon.redo
          | 重新加载
    PageHomeCard
      template(#header)
        i.icon.calendar.alternate
        | 活动
      select.ui.fluid.selection.dropdown(v-model="activityFilter")
        template(v-for="(it, num) in Utils.ServerID")
          option(:value="num") {{ it }}
      br
      p
        | 所有时间已经转换为本地时区。
        button.mini.ui.tertiary.button(@click="ReloadActivities()")
          i.icon.redo
          | 重新加载
      .ui.connected.small.feed
        template(v-if="activitiesShow")
          template(v-for="it in filteredActivities")
            .event
              .label
                i(v-if="it.current").large.middle.aligned.icon.green.angle.double.right
                i(v-else).large.middle.aligned.icon.orange.angle.right
              .content
                .summary
                  | {{ it.name }}
                .meta
                  | {{ Utils.ServerID[it.server] }}
                  | 
                  | {{ Utils.GetTimeRangeString(it.start, it.end) }}
        template(v-else)
          .ui.loading.segment
</template>
