export default class UserInfo {
  constructor({ userInfoName, userInfoFamous }) {
    this._name = userInfoName;
    this._famous = userInfoFamous;
  };

  getUserInfo() {
    return {
      name: this._name.textContent,
      famous: this._famous.textContent
    };
  };

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._famous.textContent = data.famous;
  };
};