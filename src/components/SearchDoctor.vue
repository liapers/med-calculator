<template>
  <div class="search-menu">
    <input
      v-model="search"
      @input="ShowFilm"
      type="text"
      id="search"
      class="search-input"
      placeholder="Введите имя или специальность врача"
    />
  </div>
</template>

<script>
export default {
  name: "SearchDoctors",
  data() {
    return {
      search: "",
    };
  },

  methods: {
    ShowFilm() {
      this.$emit("search-doctor", { search: this.search });
    },
  },
};
</script>

<style>
.search-menu {
  width: 50%;
  align-self: flex-start;
  margin-right: auto;
}
.search-input {
  padding: 0;
  padding-left: 40px;
  width: 100%;
  height: 35px;
  border-color: #a0dbe8;
  margin-right: 0;
  background-image: url("../img/search-icon.png");
  background-position: center left 5px;
  background-size: 30px;
  background-repeat: no-repeat;
}

.search-input:active,
.search-input:focus {
  outline: 0;
  outline-offset: 0;
  border-color: #004961;
}

.icon-search {
  cursor: pointer;
  padding: 2px;
  margin: 0;
  background-color: #a0dbe8;
  fill: aliceblue;
  height: 35px;
  width: 50px;
}
</style>