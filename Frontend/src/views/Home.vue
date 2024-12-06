<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="flex-center">
        <h1 class="black--text text-center mb-2">
          Các tựa sách mới.
        </h1>
        <p class="black--text text-center font-italic">
          Hãy tìm cho mình 1 quyển sách.
        </p>
      </v-col>
      <v-col v-if="newBooks.length !== 0" cols="12" class="pa-0">
        <bookCards :books="newBooks" />
      </v-col>
      <v-col v-else class="text-center">
        Không có sách.
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import bookCards from "../components/bookCards";

export default {
  name: "Home",

  created() {
    this.$store.dispatch("getNewBooks");
  },
  computed: {
    newBooks() {
      return this.$store.state.books.newBooks;
    },
  },
  components: {
    bookCards,
  },
};
</script>
<style scoped>
.search-form {
  display: flex;
  width: 30%;
}
.searchBook-container {
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: baseline;
}

.book-icon {
  font-size: 2.5rem;
}
.search-input-box {
  opacity: 0.5;
  border: 2px solid #e0e1dd;
  color: white;
  border-radius: 5px;
  margin-right: 10px;
  padding: 10px;
}
@media screen and (max-width: 480px) {
  .search-form {
    width: 100%;
  }
}
</style>
