import baseApi from "../../BaseApi";

export default class AddressModel {
  constructor(args) {
    this._id = args.id;
    this._lineone = args.lineNoOne;
    this._linetwo = args.lineNoTwo;
    this._city = args.city;
    this._state = args.state;
    this._pincode = args.pinCode;
    this._country = args.country;
    this._isdefault = args.default;
    this._user = args.user;
  }

  static fetchByUserId = async () => {
    const emailId = JSON.parse(localStorage.getItem("login")).email;
    const response = await baseApi.get("/addresses/user/" + emailId);
    return response.data.map((address) => new AddressModel(address));
  };

  get id() {
    return this._id;
  }

  get lineone() {
    return this._lineone;
  }

  get linetwo() {
    return this._linetwo;
  }

  get city() {
    return this._city;
  }

  get state() {
    return this._state;
  }

  get pincode() {
    return this._pincode;
  }

  get country() {
    return this._country;
  }

  get isdefault() {
    return this._isdefault;
  }

  get user() {
    return this._user;
  }
  get address() {
    return (
      this._lineone +
      ", " +
      this._linetwo +
      ", " +
      this._city +
      ", " +
      this._state +
      ", " +
      this._country +
      ", " +
      this._pincode
    );
  }
}
