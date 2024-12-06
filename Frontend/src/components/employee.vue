<template>
  <span class="d-flex align-center white" style="flex-direction:column">
    <v-dialog v-model="isDeleteDialogOpen" persistent max-width="30rem">
      <v-card light>
        <v-card-title class="mb-1">Xóa quyển sách này?</v-card-title>
        <v-card-subtitle class="font-weight-bold">{{ selectedBook.name }}</v-card-subtitle>
        <v-card-subtitle>Sách này không có trong hệ thống.</v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="darken-1" text @click="isDeleteDialogOpen = false">Hủy</v-btn>
          <v-btn color="error darken-1" outlined @click="deleteBook(selectedBook.b_id)">Xóa</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isFineDialogOpen" width="30rem">
      <v-card light>
        <v-card-title>Người dùng đã phạt</v-card-title>
        <v-card-text
          >Tới hạn : {{ penaltyInfo.dueDays }}
          <br />
          Số lượng : {{ penaltyInfo.penalty }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="primary"
            @click="
              penalityPaidStatus = true;
              returnBook();
            "
            >Trả tiền</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isAddOrEditBookOpen" width="30rem" persistent>
      <addOrEditBook
        :selectedBook="selectedBook"
        @isAddOrEditBookOpen="
          isAddOrEditBookOpen = $event;
          selectedBook = {};
        "
      />
    </v-dialog>
    <v-toolbar light flat>
      <v-toolbar-title>Welcome {{ userInfo.name }} !</v-toolbar-title>
    </v-toolbar>
    <v-tabs light slider-color="primary lighten-5" slider-size="4" :style="isMobile() ? '' : 'width:60rem'">
      <v-tab> Sách </v-tab>
      <v-tab> Cho mượn và Hoàn trả </v-tab>
      <v-tab-item light>
        <v-card class="pa-1 elevation-1" light>
          <v-toolbar light>
            <v-toolbar-title>
              Sách
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-text-field light outlined dense hide-details v-model="searchedBook" placeholder="Tìm sách" style="max-width:14rem" prepend-inner-icon="mdi-magnify"></v-text-field>

            <v-btn class="ml-4" v-if="!isMobile()" color="accent" @click="isAddOrEditBookOpen = true"> <v-icon>mdi-plus</v-icon> Thêm sách </v-btn>
          </v-toolbar>
          <v-list light style="overflow-y:scroll; height:400px" class="elevation-1">
            <v-list-item v-if="filteredBooks.length === 0">
              Không tìm được sách.
            </v-list-item>
            <v-list-item v-for="book in filteredBooks" :key="book.id">
              <v-list-item-content class="text-left ">
                <v-list-item-title slot="activator" class="text-truncate" style="max-width:50%">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on"> {{ book.name }}</span>
                    </template>
                    <span> {{ book.name }}</span>
                  </v-tooltip>
                </v-list-item-title>
                <v-list-item-subtitle class="text-truncate">{{ book.author }} • {{ book.genere }} </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" class="text-end">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list light dense>
                    <v-list-item-group>
                      <v-list-item
                        @click.stop="
                          setSelectedBook(book.b_id);
                          openEditBook();
                        "
                      >
                        <v-list-item-icon>
                          <v-icon>mdi-pencil</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>Sửa</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item
                        @click="
                          setSelectedBook(book.b_id);
                          openDeleteDialog();
                        "
                      >
                        <v-list-item-icon>
                          <v-icon>mdi-delete</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>Xóa</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-menu>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-fab-transition>
            <v-btn v-show="isMobile()" @click="isAddOrEditBookOpen = true" color="accent" dark fab style="position:absolute; bottom:10px;right:10px">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-card>
      </v-tab-item>
      <v-tab-item class="pa-3 white">
        <v-card class="pa-1 elevation-1" light
          ><v-card-title class="primary--text">Cho mượn hoặc trả sách.</v-card-title>
          <v-form class="pa-5">
            <v-row>
              <v-col cols="6"> <v-text-field hide-details v-model="s_id" solo light label="Student ID" placeholder="Student ID"></v-text-field></v-col>
              <v-col cols="6">
                <v-text-field hide-details light v-model="b_id" solo label="Book ID" placeholder="Book ID"></v-text-field>
              </v-col>
              <v-col cols="12" class="d-flex justify-end align-content-end">
                <v-btn class="accent mr-5" large @click="returnBook()">
                  Trả sách
                </v-btn>
                <v-btn class="accent" large @click="issueBook()">
                  Mượn sách
                </v-btn>
              </v-col>
            </v-row>
          </v-form></v-card
        >
      </v-tab-item>
    </v-tabs>
  </span>
</template>

<script>
import addOrEditBook from "./addOrEditBook";
export default {
  name: "employee",
  components: {
    addOrEditBook,
  },
  data: () => {
    return {
      isDeleteDialogOpen: false,
      isSearchLayoutExpanded: false,
      isFineDialogOpen: false,
      isAddOrEditBookOpen: false,
      penalityPaidStatus: false,
      selectedBook: {}, //Book details to pass onto AddEdit Component.
      penaltyInfo: {}, //Will be sent from backend.
      searchedBook: "", //search string
      b_id: "", //for deleting book, issuing and returning purpose
      s_id: "", //issuing and returning purpose
      fab: false, //Floating buttuon
    };
  },
  methods: {
   
    issueBook() {
      const issueInfo = {
        b_id: this.b_id,
        s_id: this.s_id,
        e_id: this.userInfo.u_id,
      };
      this.$store.dispatch("issueBook", issueInfo);
      this.issueInfo = {};
    },
    returnBook() {
      const returnInfo = {
        b_id: this.b_id,
        s_id: this.s_id,
        e_id: this.userInfo.u_id,
        penalityPaidStatus: this.penalityPaidStatus,
      };
      this.isFineDialogOpen = false;
      this.$store
        .dispatch("returnBook", returnInfo)
        .then((penaltyInfo) => {
          if (penaltyInfo) {
            this.isFineDialogOpen = true;
            this.penaltyInfo = penaltyInfo;
          }
        })
        .catch((err) => {
          this.$store.commit("setStatus", err);
        });
      this.issueInfo = {};
    },
    deleteBook(b_id) {
      this.$store.dispatch("deleteBook", b_id);
      this.openDeleteDialog();
    },
    openEditBook() {
      this.isAddOrEditBookOpen = !this.isAddOrEditBookOpen;
    },
    openDeleteDialog() {
      this.isDeleteDialogOpen = !this.isDeleteDialogOpen;
    },
    setSelectedBook(b_id) {
      for (const book of this.books) {
        if (book.b_id === b_id) {
          this.selectedBook = book;
          break;
        }
      }
    },
  },
  created() {
    this.$store.dispatch("getAllBooks");
  },
  computed: {
    computedHeaders() {
      return this.isMobile() ? this.headers.filter((header) => header.text !== "Location" && header.text !== "Quantity") : this.headers;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },

    filteredBooks() {
      return this.books.filter((book) => {
        return book.name.toLowerCase().match(this.searchedBook.toLowerCase());
      });
    },
    books() {
      return this.$store.state.books.all;
    },
  },
};
</script>

<style scoped>
.add-books {
  height: 10rem;
  width: 10rem;
  display: flex;
  flex-direction: column;
}
</style>
