<template>
  <span>
    <v-dialog v-model="showLogOut" width="30rem">
      <v-card light>
        <v-card-title>Chắc chắn thoát?</v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="darken-1" text @click="showLogOut = false">Hủy</v-btn>
          <v-btn color="red" outlined @click="logout">Đăng xuất</v-btn>
        </v-card-actions>
      </v-card></v-dialog
    >
    <v-dialog v-model="showLogin" width="30rem"><login @showLogin="showLogin = $event"/></v-dialog>

    <v-app-bar light elevation="1" app clipped-left>
      <v-app-bar-nav-icon color="white" to="/">
        <v-icon color="primary">mdi-book-open-variant</v-icon>
      </v-app-bar-nav-icon>
      <span v-if="$store.state.userInfo.type">
        {{ $store.state.userInfo.type.toLowerCase() === "employee" ? "Nhân viên" : "Sinh viên" }}
      </span>
      <v-spacer></v-spacer>
      <v-text-field
        light
        hide-details
        outlined
        dense
        placeholder="Tìm tên sách."
        v-model="searchQuery"
        @keyup.enter="getSearchedBooks"
        @click:append="getSearchedBooks"
        prepend-inner-icon="mdi-magnify"
      >
      </v-text-field>
      <v-spacer></v-spacer>
      <span v-if="isLoggedIn">
        <v-menu offset-y="">
          <template v-slot:activator="{ on }">
            <v-app-bar-nav-icon v-on="on">
              <v-avatar size="32px">
                <v-img :src="selfURL"></v-img>
              </v-avatar>
            </v-app-bar-nav-icon>
          </template>
          <v-card light min-width="250" tile>
            <v-list light>
              <v-list-item>
                <v-list-item-avatar size="100">
                  <v-img :src="selfURL"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="title">{{ $store.state.userInfo.name }} </v-list-item-title>
                  <v-list-item-subtitle>{{ $store.state.userInfo.email }} </v-list-item-subtitle>
                  <v-list-item-subtitle>{{ $store.state.userInfo.type }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item link to="/dashboard">
                <v-list-item-action>
                  <v-icon>mdi-account-circle</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Dashboard</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link @click="showLogOut = true">
                <v-list-item-action>
                  <v-icon>mdi-logout-variant</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Đăng xuất</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </span>
      <span v-else>
        <v-btn class="ml-5" color="blue accent" @click="showLogin = true">
          Đăng nhập
        </v-btn>
      </span>
    </v-app-bar>
  </span>
</template>

<script>
import login from "./login";
export default {
  name: "navbar",
  components: {
    login,
  },
  data: () => ({
    showLogOut: false,
    showLogin: false,
    searchQuery: "",

    selfURL: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?w=740&t=st=1713764759~exp=1713765359~hmac=bc858c65240a69a0afd45a42f3d05fd61da66f572241ba35c55dd8b98dbcbd16",
  }),
  methods: {
    logout() {
      this.showLogOut = false;
      this.showLogin = false;
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    },
    getSearchedBooks() {
      if (this.$route.path !== "/searchedResults") {
        this.$router.push({
          name: `searchedResults`,
          query: { search: this.searchQuery },
        });
      } else {
        if (this.$route.query.search !== this.searchQuery) {
          this.$store.dispatch("getSearchedBooks", this.searchQuery);
          this.$router.replace({ name: "searchedResults", query: { search: this.searchQuery } });
        }
      }
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.userInfo.accessToken || false;
    },
  },
};
</script>

<style></style>
