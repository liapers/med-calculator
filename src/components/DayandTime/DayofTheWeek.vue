<template>
  <div class="week">
    <h2 class="title-countPeople">День и время приема</h2>
    <ul id="listWeek" class="listWeek flex">
      <DateTime v-for="day in Day" :key="day.id" :day="day"/>
    </ul>
  </div>
</template>

<script>
import DateTime from "./ChoiceDayandTime.vue";

export default {
  name: "DayList",
  data() {
    return {
        Day: [
          {
            name:"Пн",
            time: ["11:30", "13:00", "16:00"]
          },         
          {
            name:"Вт",
            time:["11:30", "16:00"]
          },
          {
            name:"Ср",
            time:["12:00", "13:00"]
          },
          {
            name:"Чт",
            time:["17:30"]
          },
          {
            name:"Пт",
            time:["10:10", "14:00", "16:00"]
          },
          {
            name:"Сб",
            time:["11:00"]
          }
        ],
    };
  },
  components: {
    DateTime,
  },
};
</script>

<style>
.week {
  align-self: center;
  margin-bottom: 30px;
}


</style>