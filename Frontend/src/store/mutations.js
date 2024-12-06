export default {
  setStatus(state, status) {
    state.status = { value: status, show: true };
    console.log(state.status);
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
  setSearchedBooks(state, books) {
    state.books.searchedBooks = books;
  },
  setAllBooks(state, books) {
    state.books.all = books;
  },
  setNewBook(state, books) {
    state.books.newBooks = books;
  },
  // setIssuedBooks(state, books) {
  //   if (books.length > 0) {
  //     state.books.issuedBooks = books;
  //   } else {
  //     state.books.issuedBooks.push(books);
  //   }
  // },
  // editIssuedBooks(state, data) {
  //   for (let i = 0; i < state.books.issuedBooks.length; i++) {
  //     if (state.books.issuedBooks[i].t_id === data.t_id) {
  //       let bookInfo = state.books.issuedBooks[i];
  //       bookInfo.dueDate = data.dueDate;
  //       state.books.issuedBooks.splice(i, 1, bookInfo);
  //     }
  //   }
  // },
  deleteBook(state, b_id) {
    for (let i = 0; i < state.books.all.length; i++) {
      if (state.books.all[i].b_id === b_id) {
        state.books.all.splice(i, 1);
        break;
      }
    }
  },
  addBook(state, book) {
    state.books.all.push(book);
  },
  editBook(state, book) {
    for (let i = 0; i < state.books.all.length; i++) {
      if (state.books.all[i]["b_id"] === book["b_id"]) {
        state.books.all.splice(i, 1, book);
        break;
      }
    }
  },
};
