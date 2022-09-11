import baseApi from "../BaseApi";

export default class OrderModel {
  constructor(args) {
    this._id = args.id;
    this._userid = args.userId;
    this._bookid = args.bookId;
    this._addressid = args.addressId;
    this._ordernumber = args.orderNumber;
    this._purchaseDate = args.purchaseDate;
    this._noofcopies = args.noOfCopies;
  }

  static confirmOrder = async (bookid, addressid, selectedPaymentOption, creditCardDetails) => {
    const email = JSON.parse(localStorage.getItem("login")).email;
    const response = await baseApi.post("/order", {
      email: email,
      bookId: bookid,
      addressId: addressid,
      paymentOption: selectedPaymentOption === "cashOnDelivery" ? 0 : 1,
      creditCardDetails,
      noOfCopies: 1,
    });
    return response;
  };

  get id() {
    return this._id;
  }

  get userid() {
    return this._userid;
  }

  get bookid() {
    return this._bookid;
  }

  get addressid() {
    return this._addressid;
  }

  get ordernumber() {
    return this._ordernumber;
  }

  get purchaseDate() {
    return this._purchaseDate;
  }

  get noofcopies() {
    return this._noofcopies;
  }
}
