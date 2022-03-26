<template>
  <input
    class="inputForm"
    :type="inputType"
    :placeholder="PostData"
    :name="NameBase"
    required
  />
</template>

<script>
export default {
  name: "InputForm",
  props: {
    inputType: { type: String },
  },
  computed: {
    PostData() {
      if (this.inputType === "text") return "Введите ваши ФИО";
      else if (this.inputType === "tel") return "Введите ваш номер телефона";
      else return "Введите ваш email";
    },
    NameBase() {
      if (this.inputType === "text") return "name";
      else if (this.inputType === "tel") return "number";
      else return "email";
    },
  },
};
</script>

<style>

.inputForm {
  align-self: center;
  height: 30px;
  width: 100%;
  max-width: 70%;
  border: 2px solid #a0dbe8;
  margin-bottom: 10px;
}


.inputForm:focus, .inputForm:active {
   outline: 0;
  outline-offset: 0;
  border-color: #004961;
}
</style>