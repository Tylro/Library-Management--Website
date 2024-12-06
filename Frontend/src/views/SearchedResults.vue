<template>
  <v-container class="fill-height justify-center" fluid>
    <v-card class="transparent" width="90%" elevation="0">
      <v-card-subtitle class="primary--text pl-0">
        {{ books.length }} sách được tìm thấy
        <v-chip style="min-width: 2rem" class="text-center ml-3 mr-3" dense light>
          {{ $route.query.search }} </v-chip
        ></v-card-subtitle
      >

      <bookCards :books="books"></bookCards>
    </v-card>
  </v-container>
</template>

<script>
import bookCards from "../components/bookCards";

export default {
  name: "searchedResults",
  data: () => {
    return {
      searchedTerm: "",
    };
  },

  components: {
    bookCards,
  },
  beforeCreate() {
    const searchedTerm = this.$route.query.search;
    this.$store.dispatch("getSearchedBooks", searchedTerm);
  },

  computed: {
    books() {
      return this.$store.state.books.searchedBooks;
    },
  },
};
</script>

<style>
@media only screen and (max-width: 480px) {
  .search-box {
    width: 100%;
  }
}
</style>
