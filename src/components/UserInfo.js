export default class UserInfo {
  constructor({ userInfoName, userInfoAbout, userAvatar }) {
    this._name = userInfoName;
    this._about = userInfoAbout;
    this._userAvatar = userAvatar;
  };

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._userAvatar.src
    };
  };

  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._userAvatar.src = avatar;
  }
};