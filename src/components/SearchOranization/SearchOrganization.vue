 <template>
  <div class="searchFirms">
    <input
      v-model="search"
      @input="GetSearch"
      list="organization-flavors"
      id="organization"
      name="organization"
      class="inputForm"
      placeholder="Введите название вашей организации"
    />
    <datalist id="organization-flavors">
      <DataListOrganization
        v-for="nameOrg in orgNameArr"
        :key="nameOrg.id"
        :name="nameOrg.data.name.full_with_opf"
      />
    </datalist>
  </div>
</template>

<script >
import DataListOrganization from "./DataListOragization.vue";
export default {
  name: "searchOrg",
  data() {
    return { search: "" };
  },
  props: {
    orgNameArr: { type: Array },
  },
  components: {
    DataListOrganization,
  },
  methods: {
    GetSearch() {
      this.$emit("search-org", { searchOrg: this.search });
    },
  },
};
</script>


<style>
.searchFirms{
  margin-bottom: 30px;
}
#organization {
  margin-bottom: 0;
  background-color: white;
}
</style>