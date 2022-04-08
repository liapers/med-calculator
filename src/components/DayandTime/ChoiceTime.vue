<template>
  <button
    @click="saveDayandTime"
    :id="`${day}_${times}`"
    class="time"
    name="time"
  >
    {{ times }}
  </button>
</template>

<script>
export default {
  name: "ChoiceTime",
  data() {
    return {
      isActive: true,
    };
  },
  props: {
    times: { type: String },
    day: { type: String },
  },
  methods: {
    saveDayandTime() {
      this.isActive = !this.isActive;
      let inputDay = document.querySelector("#selectedDay");
      let inputTime = document.querySelector("#selectedTime");
      inputTime.value = this.times;
      inputDay.value = this.day;
      this.$emit("hidden-time");
    },
  },
};
</script>

<style>
.time {
  cursor: pointer;
  color: white;
  text-align: center;
  background-color: #004961;
  margin-right: 20px;
  font-weight: bold;
  width: 60px;
  height: 40px;
  border-radius: 10px;
}

.time:last-child {
  margin-right: 0;
}

.timeActive {
  background-color: #a0dbe8;
  color: #004961;
}
</style>

