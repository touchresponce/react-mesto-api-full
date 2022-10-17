class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _getHeaders() {
    const jwt = localStorage.getItem('jwt');
    return {
      'Authorization': `Bearer ${jwt}`,
      ...this._headers,
    };
  }

  // возвращающий юзера из апи
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      // headers: this._headers,
      headers: this._getHeaders()
    }).then(this._getResponce);
  }

  // изменение юзера
  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._getResponce);
  }

  // получение карточки
  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._getResponce);
  }

  // отправка карточки
  setCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._getResponce);
  }

  // удаление карточки
  deleteCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._getResponce);
  }

  // добавить лайк
  like(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._getResponce);
  }

  // удалить лайк
  dislike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._getResponce);
  }

  // изменение аватарки
  setAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(link),
    }).then(this._getResponce);
  }

  // проверка ответа
  _getResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.touchresponce.nomoredomains.icu',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
