export default class UserInfo {
  constructor({ userInfoName, userInfoAbout }) {
    this._name = userInfoName;
    this._about = userInfoAbout;
  };

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent
    };
  };

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
  };
};