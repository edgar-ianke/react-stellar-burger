const url = "https://norma.nomoreparties.space/api/ingredients";

class Api {
  constructor(url) {
    this.url = url;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    if (!res.redirected) {
      alert(`${res.status} Что-то пошло не так :(`);
      return;
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getData() {
    return fetch(this.url).then(this._checkResponse);
  }
}
export const api = new Api(url);