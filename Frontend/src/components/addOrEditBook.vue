<template>
  <v-card light>
    <v-card-title v-text="isAddingBook ? 'Thêm sách' : 'Sửa sách'"></v-card-title>
    <v-container>
      <v-row>
        <v-col sm="12" lg="12" cols="12" v-if="!isAddingBook">
          <v-text-field hide-details outlined label="Book ID" v-model="newBook.b_id" disabled></v-text-field>
        </v-col>
        <v-col sm="12" lg="12" cols="12">
          <v-text-field hide-details outlined label="Tên" placeholder="Tên" v-model="newBook.name"></v-text-field>
        </v-col>
        <v-col sm="12" lg="6" cols="12">
          <v-text-field hide-details outlined label="Tác giả" placeholder="Tác giả" v-model="newBook.author"></v-text-field>
        </v-col>
        <v-col sm="12" lg="6" cols="12">
          <v-text-field hide-details outlined label="Thể loại" placeholder="Thể loại" v-model="newBook.genere"></v-text-field>
        </v-col>
        <v-col sm="12" lg="6" cols="12"> <v-text-field hide-details outlined label="Số lượng" placeholder="Số lượng" v-model="newBook.totalQuantity"></v-text-field></v-col>
        <v-col sm="12" lg="6" cols="12">
          <v-text-field hide-details outlined label="Vị trí" placeholder="Vị trí" v-model="newBook.location"></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-card-actions class="pa-3">
      <v-spacer></v-spacer>
      <v-btn @click="close()" text>
        <span>Hủy</span>
      </v-btn>
      <v-btn color="danger" v-if="!isAddingBook" @click="deleteBook(newBook.b_id)">
        Xóa
      </v-btn>
      <v-btn class="accent" @click="JSON.stringify(selectedBook) !== JSON.stringify(newBook) ? (isAddingBook ? addBook() : editBook()) : $store.commit('setStatus', 'Không có thay đổi.')">Lưu</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "addOrEditBook",
  props: {
    selectedBook: Object,
  },
  data: () => {
    return {
      newBook: {},
      isAddingBook: true,
    };
  },
  created() {
    this.isAddingBook = Object.keys(this.selectedBook).length === 0;
    this.newBook = JSON.parse(JSON.stringify(this.selectedBook));
  },
  watch: {
    selectedBook() {
      this.isAddingBook = Object.keys(this.selectedBook).length === 0;
      this.newBook = JSON.parse(JSON.stringify(this.selectedBook));
    },
  },
  methods: {
    addBook() {
      this.$store.dispatch("addBook", this.newBook);
      this.$emit("isAddOrEditBookOpen", false);
    },
    editBook() {
      this.$store.dispatch("editBook", this.newBook);
      this.$emit("isAddOrEditBookOpen", false);
    },
    deleteBook(b_id) {
      this.$store.dispatch("deleteBook", b_id);
      this.$emit("isAddOrEditBookOpen", false);
    },
    close() {
      this.$emit("isAddOrEditBookOpen", false);
    },
  },
};
</script>

<style></style>
