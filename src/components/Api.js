export default class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  };

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
    .then(this._checkResponse);
  };

  setUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._checkResponse);
  };

  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
    .then(this._checkResponse);
  };

  newCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST', 
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._checkResponse);
  };

  getQuantityLikes() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
    .then(this._checkResponse);
  };

  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(this._checkResponse);
  };

  getLike(id) {
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this.headers
    })
    .then(this._checkResponse);
  };

  deleteLike(id) {
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(this._checkResponse);
  };

  newAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: data
      })
    })
    .then(this._checkResponse);
  };

  _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  };
};