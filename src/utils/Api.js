const url = "https://norma.nomoreparties.space/api";

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
    return fetch(`${this.url}/ingredients`).then(this._checkResponse);
  }
  postOrder(order) {
    return fetch(`${this.url}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: order,
      }),
    }).then(this._checkResponse);
  }
  resetPW(email) {
    return (fetch(`${this.url}/password-reset`),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    }).then(this._checkResponse);
  }
}

export const api = new Api(url);
