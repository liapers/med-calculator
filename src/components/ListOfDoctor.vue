<template>
  <li class="info-doctor" :id="doctor.id">
    <label class="label-doctor flex">
      <input
        @click="PostChange"
        id="checkDoctor"
        class="check-doctor"
        type="checkbox"
        name="doctor"
        :value="doctor.specialist"
      />
      <div class="photoDoctor-block">
        <img class="photo-doctor" :src="doctor.photo" :alt="doctor.name" />
      </div>
      <div class="infoDoc-block flex">
        <p class="doctor-info doctor-info-name">
          <span class="bold-infoDoc">{{ doctor.name }}</span>
        </p>
        <p class="doctor-info">
          Специальность:<span class="bold-infoDoc">
            {{ doctor.specialist }}</span
          >
        </p>
        <p class="doctor-price">Стоимость услуг: <span class="bold-infoDoc">{{ doctor.price }}</span></p>
        <p class="doctor-rating">Рейтинг:<span class="bold-infoDoc"> {{ doctor.rating }}</span></p>
      </div>
    </label>
  </li>
</template>

<script>
export default {
  name: "InputForm",
  data() {
    return {
      docFlag: false,
    };
  },
  props: {
    doctor: { type: Object },
  },
  methods: {
    PostChange() {
      let activeDoc = document.getElementById(`${this.doctor.id}`);
      this.docFlag ? (this.docFlag = false) : (this.docFlag = true);
      if (this.docFlag) {
        activeDoc.classList.add("active");
      } else {
        activeDoc.classList.remove("active");
      }
      this.$emit("change-doctor");
    },
  },
};
</script>

<style>
li {
  list-style-type: none;
}

ul {
  margin-left: 0; /* Отступ слева в браузере IE и Opera */
  padding-left: 0; /* Отступ слева в браузере Firefox, Safari, Chrome */
  margin-bottom: 0;
}

.info-doctor {
  width: 100%;
  max-width: 70%;
  margin-bottom: 30px;
  overflow: hidden;
  border: 2px solid #a0dbe8;
  border-radius: 5px;
  background-color: white;
}

.info-doctor:last-child {
  margin-bottom: 0;
}

.label-doctor {
  cursor: pointer;
  flex-direction: row;
  align-items: center;
  align-content: center;
}
.check-doctor {
  opacity: 0;
}

.photoDoctor-block {
  margin: 0;
  padding: 0;
}
.photo-doctor {
  padding: 5px 0;
  width: 150px;
  height: 150px;
  object-fit: cover;
}

.infoDoc-block {
  flex-direction: column;
  margin-left: 30px;
  text-align: left;
}

.info-doctor p {
  margin: 0;
  margin-bottom: 10px;
}

.info-doctor p:last-child {
  margin-bottom: 0;
}

.doctor-info-name {
  margin-bottom: 25px !important;
}

.bold-infoDoc {
  font-weight: bold;
  color: #004961
}

.price-rating-block {
  margin: 0;
  flex-direction: row;
  align-content: space-around;
}

.doctor-price .doctor-rating {
  margin-bottom: 0 !important;
}

.active {
  border: 2px solid #004961;
}
</style>
