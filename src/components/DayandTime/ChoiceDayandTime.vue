<template>
  <li class="day" :id="`day_${day.name}`" @click="choiseDay">
    {{ day.name }}
    <input id="selectedDay" type="hidden" name="Day" value="" />
    <input id="selectedTime" type="hidden" name="Time" value="" />
    <div
      v-if="arrTimeVisible"
      class="listWeek-time flex"
      :id="`time_${day.name}`"
    >
      <ChoiceTime
        v-for="time in day.time"
        :key="time"
        :times="time"
        :day="day.name"
        @hidden-time="ClickHidden"
      />
    </div>
  </li>
</template>

<script>
import ChoiceTime from "./ChoiceTime.vue";

export default {
  name: "DayandTime",
  data() {
    return {
      arrTimeVisible: false,
      rememberDay: "",
      active: false,
    };
  },
  props: {
    day: { type: Object },
  },
  components: {
    ChoiceTime,
  },
  methods: {
    choiseDay() {
      this.arrTimeVisible = !this.arrTimeVisible;
      let activeDay = document.getElementById(`day_${this.day.name}`);
      this.rememberDay = this.day.name;
      this.removeDay();
      activeDay.classList.add("activeDay");
    },

    removeDay() {
      let removeDay = document.querySelectorAll(".activeDay");
      removeDay.forEach(function (item) {
        item.classList.remove("activeDay");
      });
    },
    ClickHidden(data) {
      this.active = data.isActive;
      this.arrTimeVisible = false;
    },
    hideTime() {
      this.arrTimeVisible = false;
      this.removeDay();
    },
  },
  mounted() {
    document.addEventListener("click", this.hideTime, true);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.hideTime, true);
  },
};
</script>

<style>
.day {
  position: relative;
  text-align: center;
  padding: 10px 0;
  cursor: pointer;
  height: 20px;
  width: 80px;
  margin-right: 20px;
  background-color: white;
  border: 2px solid #a0dbe8;
  border-radius: 5px;
  color: #004961;
  font-weight: bold;
}

.day:last-child {
  margin-right: 0;
}

.listWeek-time {
  z-index: 1;
  align-items: center;
  position: absolute;
  padding: 10px 10px;
  top: 39px;
  left: -2px;
  background-color: white;
  border: 2px solid #004961;
}

.activeDay {
  border: 2px solid #004961;
}

.time:active {
  background-color: #a0dbe8;
}

.opacity {
  opacity: 1;
}
</style>