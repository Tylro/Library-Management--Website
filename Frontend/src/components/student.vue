<template>
  <span class="d-flex align-center" style="flex-direction:column">
    <v-toolbar flat>
      <v-toolbar-title>Welcome {{ userInfo.name }} !</v-toolbar-title>
    </v-toolbar>
    <v-tabs light slider-color="primary lighten-5" slider-size="4" :style="isMobile() ? '' : 'width:60rem'">
      <v-tab> Đang mượn </v-tab>
      <v-tab> Đã mượn </v-tab>

      <v-tab-item class="pa-3 ">
        <v-card light elevation="5">
          <v-toolbar>
            <v-toolbar-title>
              Sách
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-text-field dense hide-details v-model="searchedBook" background-color="primaryLight" solo outlined placeholder="Tìm tên sách">
              <template v-slot:append>
                <v-btn icon class="mr-2"><v-icon>mdi-magnify</v-icon></v-btn>
              </template>
            </v-text-field>
          </v-toolbar>
          <v-card-subtitle>Sách đang mượn.</v-card-subtitle>
          <v-data-table :headers="headers.currentlyIssued" :items="currentlyIssuedBooks" :search="searchedBook" :items-per-page="5" hide-default-footer>
            <template v-slot:top="{ pagination, options, updateOptions }">
              <v-data-footer :pagination="pagination" :options="options" @update:options="updateOptions" items-per-page-text="" :items-per-page-options="[3]" />
            </template>
            <template v-slot:item.name="{ item }">
              <v-list-item class="text-truncate" style="max-width:50%">
                <v-list-item-content>
                  <v-list-item-title> {{ item.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item.author }} • {{ item.genere }} </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template v-slot:item.issuedOn="{ item }">
              {{ getStringDate(item.issuedOn) }}
            </template>
            <template v-slot:item.dueDate="{ item }">
              {{ getStringDate(item.dueDate) }}
            </template>
            <template v-slot:item.overDueDays="{ item }">
              {{ item.dueDays || 0 }}
            </template>
            <template v-slot:item.penalityAmount="{ item }">
              {{ item.penaltyAmount || 0 }}
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn outlined small color="info " @click="reissue(item.t_id)">
                Mượn lại
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card light elevation="5">
          <v-toolbar light flat>
            <v-toolbar-title>
              Sách
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-text-field dense hide-details v-model="searchedBook" background-color="primaryLight" solo outlined placeholder="Tìm sách">
              <template v-slot:append>
                <v-btn icon class="mr-2"><v-icon>mdi-magnify</v-icon></v-btn>
              </template>
            </v-text-field>
          </v-toolbar>
          <v-card-subtitle>Sách đã mượn.</v-card-subtitle>

          <v-data-table :headers="headers.previouslyIssued" :items="previouslyIssuedBooks" :search="searchedBook" :items-per-page="5" hide-default-footer>
            <template v-slot:top="{ pagination, options, updateOptions }">
              <v-data-footer :pagination="pagination" :options="options" @update:options="updateOptions" items-per-page-text="" :items-per-page-options="[5]" />
            </template>
            <template v-slot:item.name="{ item }">
              <v-list-item class="text-truncate" style="max-width:50%">
                <v-list-item-content>
                  <v-list-item-title> {{ item.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item.author }} • {{ item.genere }} </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template v-slot:item.issuedOn="{ item }">
              {{ getStringDate(item.issuedOn) }}
            </template>
            <template v-slot:item.returnedOn="{ item }">
              {{ getStringDate(item.returnedOn) }}
            </template>

            <template v-slot:item.penalityAmount="{ item }">
              {{ item.penalityAmount || 0 }}
            </template>

            <template v-slot:item.paidStatus>
              <v-chip class="ma-2" color="success" outlined small label>
                Đã trả phí
              </v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </span>
</template>

<script>
export default {
  name: "student",
  data: () => {
    return {
      bookDetails: {},
      searchedBook: "",
      headers: {
        currentlyIssued: [
          { text: "Tên", value: "name", sortable: false, align: "start" },
          { text: "Mượn ngày", value: "issuedOn", sortable: false, align: "center" },
          { text: "Tới hạn", value: "dueDate", sortable: false, align: "center" },
          { text: "Quá hạn", value: "overDueDays", sortable: false, align: "center" },
          { text: "Phí", value: "penalityAmount", sortable: false, align: "center" },
          { text: "", value: "actions", sortable: false, align: "center" },
        ],
        previouslyIssued: [
          { text: "Tên", value: "name", sortable: false, align: "start" },
          { text: "Mượn ngày", value: "issuedOn", sortable: false, align: "center" },
          { text: "Đã trả", value: "returnedOn", sortable: false, align: "center" },
          { text: "Phí", value: "penalityAmount", sortable: false, align: "center" },
          { text: "Trạng thái", value: "paidStatus", sortable: false, align: "center" },
        ],
      },
    };
  },
  methods: {
    getBookDetails(b_id) {
      this.$store
        .dispatch("getSearchedBooks", b_id)
        .then((books) => {
          this.bookDetails = books[0];
        })
        .catch((err) => {
          this.$store.commit("setStatus", err);
        });
    },
    reissue(t_id) {
      console.log(t_id);
      this.$store.dispatch("reissueBook", t_id);
    },
    getStringDate(date) {
      date = new Date(date);
      return date.getDate() + " - " + date.getMonth() + " - " + date.getFullYear();
    },
  },
  created() {
    this.$store.dispatch("getIssuedBooks");
  },

  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    issuedBooks() {
      return this.$store.state.books.issuedBooks;
    },
    currentlyIssuedBooks() {
      return this.issuedBooks.filter((book) => typeof book.returnedOn === "undefined");
    },
    previouslyIssuedBooks() {
      return this.issuedBooks.filter((book) => typeof book.returnedOn !== "undefined");
    },
  },
};
</script>

<style></style>
