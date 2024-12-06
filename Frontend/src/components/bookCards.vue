<template>
  <span>
    <v-dialog v-model="isBookDetailsOpen" width="31rem">
      <v-card light>
        <div class="d-flex flex-no-wrap justify-space-between">
          <v-img style="width:40%" :src="selectedBook.coverPage"> </v-img>
          <span style="width:60%">
            <v-card-title>{{ selectedBook.name }}</v-card-title>
            <v-card-subtitle>{{ selectedBook.author }} • {{ selectedBook.genere }}</v-card-subtitle>
            <v-list light dense>
              <v-list-item-group>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>ID</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-subtitle> {{ selectedBook.b_id }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content class="d-flex">
                    <v-list-item-title>Vị trí</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-subtitle> {{ selectedBook.location }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Đã mượn</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-subtitle>
                      {{ selectedBook.issuedQuantity }} trong số {{ selectedBook.totalQuantity }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <v-card-actions class="d-flex justify-end ">
              <v-btn color="red" outlined @click="isBookDetailsOpen = false">Đóng</v-btn>
            </v-card-actions>
          </span>
        </div>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col
        lg="3"
        xs="12"
        sm="12"
        md="3"
        cols="12"
        v-for="book in books"
        :key="book.id"
        class="d-flex justify-center"
      >
        <v-card class="book-card elevation-1" @click="showBookDetails(book.b_id)" outlined light>
          <v-img :src="book.coverPage" height="70%"> </v-img>
          <v-card-title style="max-width:90%" class="d-inline-block text-truncate"
            ><v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on"> {{ book.name }}</span>
              </template>
              <span>
                {{ book.name }}
              </span>
            </v-tooltip></v-card-title
          >
          <v-card-subtitle class="d-inline-block text-truncate " style="max-width:90%"
            ><v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on"> {{ book.author }} • {{ book.genere }}</span>
              </template>
              <span>{{ book.author }} • {{ book.genere }} </span>
            </v-tooltip>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </span>
</template>

<script>
export default {
  name: "booksContainer",
  props: {
    books: Array,
  },
  data: () => {
    return {
      isBookDetailsOpen: false,
      selectedBook: {},
    };
  },
  methods: {
    showBookDetails(b_id) {
      this.isBookDetailsOpen = true;
      this.selectedBook = this.books.filter((book) => {
        return book.b_id.match(b_id);
      })[0];
    },
  },
};
</script>

<style>
.new-book-row {
  width: 100%;
  place-content: center;
}

.newBooks-container {
  background-color: transparent;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.book-card {
  width: 13rem;
  height: 20rem;
}
</style>
