<template>
  <div class="countPeople flex">
    <h2 class="title-countPeople">Количество сотрудников, идущих на прием</h2>
    <div class="range-people">
      <input
        type="range"
        @input="PostValue"
        v-model="value"
        min="1"
        max="300"
        class="slider"
        name="people"
        id="range"
      />
    </div>
    <div class="blok-countPeople">
      <p class="countPeople"><span class="count">{{ value }}</span> человек</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "numberPeople",
  data() {
    return { value: 150 };
  },
  methods: {
    PostValue() {
      this.$emit("count-people", { countPeople: this.value });
    },
  },
};
</script>

<style>

.countPeople {
  margin: 0;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 30px;
}

.title-countPeople{
  margin: 0;
  margin-bottom: 30px;
  color: #004961;
}

.range-people {
  width: 60%;
}
.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;
  background: white;
  outline: none;
  margin-bottom: 30px;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #004961;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #004961;
  cursor: pointer;
}

.blok-countPeople {
  width: 10%;
}


.count{
  color: #004961;
  font-weight: bold;
}
</style>