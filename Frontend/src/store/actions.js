import axios from "axios";
axios.defaults.baseURL = "http://localhost:9090";

export default {
  getNewBooks({ commit }) {
    axios
      .get("/books/newBooks")
      .then((books) => {
        if (books) {
          commit("setNewBook", books.data);
        } else {
          commit("setStatus", "Something went wrong.");
        }
      })
      .catch((err) => {
        commit("setStatus", "Opps, something went wrong.\n" + err);
      });
  },
  getAllBooks({ commit }) {
    axios
      .get("/books/searchedBooks", { params: { searchQuery: "" } })
      .then((books) => {
        if (books) {
          commit("setAllBooks", books.data);
        } else {
          commit("setStatus", "Something went wrong.");
        }
      })
      .catch((err) => {
        commit("setStatus", "Opps, something went wrong.\n" + err);
      });
  },
  getSearchedBooks({ commit }, searchQuery) {
    return axios
      .get("/books/searchedBooks", { params: { searchQuery: searchQuery } })
      .then((books) => {
        if (books) {
          commit("setSearchedBooks", books.data);
          return books.data;
        } else {
          commit("setStatus", "Something went wrong.");
        }
      })
      .catch((err) => {
        commit("setStatus", "Opps, something went wrong.\n" + err);
      });
  },
  deleteBook({ commit }, b_id) {
    axios
      .delete("/book", {
        params: { b_id },
      })
      .then((res) => {
        commit("setStatus", res.data.status);
        commit("deleteBook", b_id);
      })
      .catch((err) => {
        commit("setStatus", "Opps, something went wrong.\n" + err);
      });
  },
  addBook({ commit }, book) {
    book.coverPage = "https://salt.tikicdn.com/cache/750x750/ts/product/5e/18/24/2a6154ba08df6ce6161c13f4303fa19e.jpg.webp";
    axios
      .post("/book", book)
      .then((res) => {
        if (res.status === 200) {
          commit("setStatus", res.data.status);
          book.b_id = res.data.b_id;
          commit("addBook", book);
        }
      })
      .catch((e) => {
        commit("setStatus", { value: e.response.data.status });
      });
  },
  editBook({ commit }, book) {
    axios
      .put("/book", book)
      .then(({ data, status }) => {
        if (status === 200) {
          commit("setStatus", data.status);
          commit("editBook", book);
        }
      })
      .catch((e) => {
        commit("setStatus", e.response.data.status);
      });
  },

  login({ commit }, data) {
    return axios
      .post("/login", data)
      .then((response) => {
        if (response.status === 200) {
          commit("setUserInfo", response.data);
          return response.status;
        } else {
          commit("setStatus", response.data);
          return response.status;
        }
      })
      .catch((err) => {
        commit("setStatus", err.response.data.status);
        return err.response.status;
      });
  },
  register({ commit }, userInfo) {
    axios
      .post("/register", userInfo)
      .then((response) => {
        commit("setStatus", response.data.status);
      })
      .catch((err) => {
        commit("setStatus", err);
      });
  },
  logout({ commit, state }) {
    axios
      .post("/logout", state.userInfo)
      .then((response) => {
        commit("setUserInfo", {});
        commit("setStatus", response.data.status);
      })
      .catch((err) => {
        commit("setStatus", err);
      });
  },
};
