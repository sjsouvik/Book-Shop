import baseApi from "../BaseApi";

export default class UserModel {
  constructor(args) {
    this._id = args.id;
    this._email = args.email;
    this._role = args.role;
    this._firstname = args.firstName;
    this._lastname = args.lastName;
    this._mobilenumber = args.mobileNumber;
    this._addresses = args.addresses;
  }
  //
  // static fetchByEmail = async () => {
  //   const response = await baseApi.get("/users/foo@test.com");
  //   return new UserModel(response.data);
  // };

  get lastname() {
    return this._lastname;
  }
  get email() {
    return this._email;
  }
  get id() {
    return this._id;
  }
  get role() {
    return this._role;
  }
  get mobilenumber() {
    return this._mobilenumber;
  }
  get firstname() {
    return this._firstname;
  }
  get addresses() {
    return this._addresses;
  }
}
