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

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
    this._userAvatar.src = data.avatar;
  };
};