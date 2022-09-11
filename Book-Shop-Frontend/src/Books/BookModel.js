import baseApi from "../BaseApi";

export default class BookModel {
  constructor(args) {
    this._id = args.id;
    this._title = args.name;
    this._author = { name: args.authorName };
    this._price = args.price;
    this._cover_image = args.coverImage;
    this._stock = args.stock;
  }

  static fetchAll = async (
    bookName = "",
    authorName = "",
    currentPage = 0,
    sortExp = "name,asc"
  ) => {
    const [sortKey, sortOrder] = sortExp.split(",");
    const response = await baseApi.get(
      `/books?title=${bookName}&author=${authorName}&page=${currentPage}&size=${10}&sortKey=${sortKey}&sortOrder=${sortOrder}`
    );
    return response.data;
  };

  static fetchById = async (id) => {
    const response = await baseApi.get(`/books/${id}`);
    return response.data;
  };

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get authorName() {
    return this._author.name;
  }

  get price() {
    return this._price.currency + " " + this._price.amount;
  }

  get coverImage() {
    return this._cover_image;
  }

  get stock() {
    return this._stock;
  }
}
