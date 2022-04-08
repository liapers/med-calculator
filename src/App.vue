<template>
  <div id="app">
    <div class="container">
      <Header />
      <form
      id="mainForm"
        class="mainForm flex"
        action="http://localhost:3000/request"
        method="POST"
      >
        <!-- Основные  формы заполнения данных о пользователе -->
        <InputForm v-for="type in inputArr" :key="type.id" :inputType="type" />
        <SearchOrganization
          @search-org="SaveSearch"
          :orgNameArr="arrOrganization.suggestions"
        />
        <!-- Панель с поиском нужного врача и их сортировкой -->
        <div class="sortBlock flex">
          <SearchDoctor @search-doctor="SaveSearchDoctor" />
          <SelectDoctor
            :options="options"
            :selected="selected"
            @select-change="ChangeSelect"
          />
        </div>
        <!-- Список врачей в поликлинике -->
        <ul class="doctorList flex">
          <ListOfDoctor
            @change-doctor="SaveCheckedDoctor"
            v-for="doctor in SearchDoctor"
            :key="doctor.id"
            :doctor="doctor"
          />
        </ul>
        <!-- Выбор количества сотрудников, идущих на прием -->
        <NumberOfPeople @count-people="SaveCount" />
        <!-- Выбор времени и дня недели -->
        <DayofTheWeek/>
        <!-- Подсчет итоговой суммы приемов врачей -->
        <div class="totalCount">
          Итоговая сумма:<span class="bold-totalPrice"> {{ totalPrice }}</span>
        </div>
        <input id="totalCount" type="hidden" name="totalCount" :value="totalPrice" />
        <button class="btnDone" type="submit">Отправить заявку</button>
      </form>
    </div>
  </div>
</template>

<script>
import Header from "./components/HeaderComponent.vue";
import InputForm from "./components/InputForm.vue";
import ListOfDoctor from "./components/ListOfDoctor.vue";
import dataDoctor from "../static/doctor.json";
import NumberOfPeople from "./components/NumberOfPeople.vue";
import SearchOrganization from "./components/SearchOranization/SearchOrganization.vue";
import SearchDoctor from "./components/SearchDoctor.vue";
import SelectDoctor from "./components/SelectDoctor.vue";
import DayofTheWeek from "./components/DayandTime/DayofTheWeek.vue"

export default {
  data() {
    return {
      inputArr: ["text", "tel", "email"],
      organizationUser: "",
      arrOrganization: [],
      doctors: [],
      countPeople: 150,
      totalPrice: 0,
      checkedDoc: [],
      searchDoctor: "",
      options: [
        { name: "Цене", value: "1" },
        { name: "Рейтингу", value: "2" },
      ],
      selected: "Цене",
    };
  },
  components: {
    Header,
    InputForm,
    ListOfDoctor,
    NumberOfPeople,
    SearchOrganization,
    SearchDoctor,
    SelectDoctor,
    DayofTheWeek
  },
  //получаем докторов
  beforeMount() {
    document.title = "Medicine";
    this.doctors = dataDoctor.doctors;
  },
  computed: {
    SearchDoctor() {
      let obj = this.doctors;
      let newArray = [];
      const search = this.searchDoctor.toLowerCase();
      obj.forEach(function (obj) {
        let el = obj;
        if (el.specialist.toLowerCase().indexOf(search) != -1) {
          newArray.push(el);
        } else if (el.name.toLowerCase().indexOf(search) != -1) {
          {
            newArray.push(el);
          }
        }
      });
      return newArray;
    },
  },
  methods: {
    //Получить организации
    GetFirms(search) {
      let url =
        "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";
      let token = process.env.VUE_APP_TOKEN;
      let query = search;

      let options = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Token " + token,
        },
        body: JSON.stringify({ query: query }),
      };

      fetch(url, options)
        .then((response) => response.text())
        .then((result) => this.SaveFirms(result))
        .catch((error) => console.log("error", error));
    },
    //сортируем докторов
    ChangeSelect(data) {
      this.selected = data.name;
      if (data.value === "1") {
        this.doctors.sort(function (a, b) {
          return a.price - b.price;
        });
      } else {
        this.doctors.sort(function (a, b) {
          return b.rating - a.rating;
        });
      }
    },
    //сохраняем поиск
    SaveSearch(data) {
      this.GetFirms(data.searchOrg);
    },
    //сохраняем поиск доктора
    SaveSearchDoctor(data) {
      this.searchDoctor = data.search;
    },
    //сохраняем фирмы
    SaveFirms(data) {
      this.arrOrganization = JSON.parse(data);
    },
    //сохраняем докторов
    SaveDoctors(data) {
      this.doctors = data.doctors;
    },
    //ищем фирмы по введенным буковкам
    SearchFirms() {
      this.GetFirms();
    },
    SaveCount(data) {
      this.countPeople = data.countPeople;
      this.GetTotalCount();
    },
    SaveCheckedDoctor() {
      this.checkedDoc = document.querySelectorAll(".check-doctor");
      this.GetTotalCount();
    },
    TotalNull() {
      this.totalPrice = 0;
    },
    GetTotalCount() {
      this.TotalNull();
      this.checkedDoc.forEach((doc, index) => {
        doc.checked
          ? (this.totalPrice += this.countPeople * this.doctors[index].price)
          : this.totalPrice;
      });
    },
  },
};
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
}

/*Общие стили */
body {
  font-family: Arial, Verdana, sans-serif;
  background-color: #F1F1F1;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
}

.container {
  margin: 0 auto;
  width: 100%;
  max-width: 1170px;
}

.flex {
  display: flex;
}

.mainForm {
  flex-direction: column;
}

.doctorList {
  margin: 0;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-around;
  margin-bottom: 40px;
}

.totalCount {
  font-size: 24px;
  text-align: right;
  width: 85%;
  margin-bottom: 30px;
}

.bold-totalPrice {
  font-weight: bold;
  color: #004961;
}

.sortBlock {
  align-self: center;
  align-items: center;
  margin-bottom: 30px;
  width: 100%;
  max-width: 820px;
}

.btnDone {
  margin: 0 auto;
  width: 50%;
  height: 35px;
  /* background-color: #004961; */
  border-color: #004961;
  border-radius: 10px;
  background-color: white;
  color: #004961;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 30px;
}

.btnDone:hover {
  background-color: #004961;
  color: white;
}
</style>
