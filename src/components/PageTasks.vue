<script setup>
import { ref } from "vue";
import { Tasks, TaskPattern } from "../configs/tasks";
import Utils from "../utils";
var HardMode = ref(false);
</script>

<template lang="pug">
.ui.segment
  h3.ui.header
    | 任务&nbsp;&nbsp;
    .ui.slider.checkbox
      input(type="checkbox" name="hard" v-model="HardMode")
      label Normal / Hard 切换
  .ui.two.column.very.relaxed.divided.grid#tasks_grid
    .column
      template(v-for="x in Math.floor(Tasks / 2)")
        h4.ui.header {{ "第 {0} 章".format(x.toString()) }}
        template(v-for="p in TaskPattern[Number(HardMode)]")
          button.ui.tiny.button(:class="{ primary : HardMode }" @click="Utils.GetImageFromArona(p.format(x.toString()))")
            | {{ p.format(x.toString()) }}
    .column
      template(v-for="x in Math.ceil(Tasks / 2)")
        //- real x: x + Math.floor(Tasks / 2)
        h4.ui.header {{ "第 {0} 章".format((x + Math.floor(Tasks / 2)).toString()) }}
        template(v-for="p in TaskPattern[Number(HardMode)]")
          button.ui.tiny.button(:class="{ primary : HardMode }" @click="Utils.GetImageFromArona(p.format((x + Math.floor(Tasks / 2)).toString()))")
            | {{ p.format((x + Math.floor(Tasks / 2)).toString()) }}
</template>
