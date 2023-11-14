const url = "https://norma.nomoreparties.space/api";

class Api {
  constructor(url) {
    this.url = url;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  }

  _refreshToken = () => {
    return fetch(`${this.url}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    }).then(this._checkResponse);
  };

  _fetchWithRefresh = async (url, options) => {
    try {
      const res = await fetch(url, options);
      return await this._checkResponse(res);
    } catch (err) {
      console.log(err);
      if (err.message === "jwt expired") {
        const refreshData = await this._refreshToken();
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        localStorage.setItem("refreshToken", refreshData.refreshToken);
        localStorage.setItem("accessToken", refreshData.accessToken);
        options.headers.authorization = refreshData.accessToken;
        const res = await fetch(url, options);
        return await this._checkResponse(res);
      } else {
        return Promise.reject(err);
      }
    }
  };

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
  resetPW(value) {
    return fetch(`${this.url}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: value,
      }),
    }).then(this._checkResponse);
  }
  changePW(newPassword, code) {
    return fetch(`${this.url}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: newPassword,
        token: code,
      }),
    }).then(this._checkResponse);
  }
  registration(input) {
    return fetch(`${this.url}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    }).then(this._checkResponse);
  }
  login(email, password) {
    return fetch(`${this.url}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then(this._checkResponse);
  }
  userGetData() {
    return this._fetchWithRefresh(`${this.url}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("accessToken"),
      },
    });
  }
  editProfile(form) {
    return this._fetchWithRefresh(`${this.url}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(form),
    });
  }
  logout() {
    return fetch(`${this.url}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
    });
  }
}

export const api = new Api(url);
