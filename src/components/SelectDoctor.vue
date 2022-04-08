<template>
  <div class="sortBlockSelect flex">
    <div class="select-p">Сортировать по:</div>
    <div class="selectDoctor">
      <p
        class="title-selectDoctor"
        @click="arrOptionsVisible = !arrOptionsVisible"
      >
        {{ selected }}
      </p>
      <div class="optionsDoctor" v-if="arrOptionsVisible">
        <p
          class="optionsDoctor-name"
          v-for="option in options"
          :key="option.id"
          @click="selectOption(option)"
        >
          {{ option.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "selectDoctor",
  data() {
    return {
      arrOptionsVisible: false,
    };
  },
  props: {
    options: { type: Array },
    selected: {
      type: String,
      default: "Цене",
    },
  },
  methods: {
    selectOption(data) {
      this.$emit("select-change", data);
      this.arrOptionsVisible = false;
    },
    hideSelect() {
      this.arrOptionsVisible = false;
    },
  },
  mounted() {
    document.addEventListener("click", this.hideSelect, true);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.hideSelect, true);
  },
};
</script>

<style>
.sortBlockSelect {
    align-self: flex-end;
  width: 30%;
}

.select-p{
margin-right: 10px;
}
.selectDoctor {
  position: relative;
  cursor: pointer;
}

.title-selectDoctor {
  margin: 0;
  font-weight: bold;
  border-bottom: 2px dotted #a0dbe8;
  height: 20px;
  width: 100px;
  text-align: center;
}
.optionsDoctor-name {
  margin: 0;
  padding: 5px;
  background: white;
}

.optionsDoctor-name:hover {
  background: #a0dbe8;
}

.optionsDoctor {
  border: 2px solid #a0dbe8;
  position: absolute;
  width: 100%;
  top: 30px;
  right: 0;
  left:2px
}
</style>