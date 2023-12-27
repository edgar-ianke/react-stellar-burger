import { TIngredient } from "../services/types";

const url = "https://norma.nomoreparties.space/api";

interface IOptions {
  method: string;
  headers: Record<string, string>;
  body?: string;
}
interface IGetData {
  success: boolean;
  data: TIngredient[];
}
interface IGetToken {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}
interface IUser {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
}
interface IOrder {
  success: boolean;
  name: string;
  order: {
    ingredients: TIngredient[];
    _id: string;
    owner: {
      name: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
    price: number;
  };
}
interface IPost {
  success: boolean;
  data: string;
}

class Api {
  readonly url: string;
  constructor(url: string) {
    this.url = url;
  }

  _checkResponse<T>(res: Response): Promise<T> {
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
    }).then(this._checkResponse<IGetToken>);
  };

  _fetchWithRefresh = async (url: string, options: IOptions) => {
    try {
      const res = await fetch(url, options);
      return await this._checkResponse<IUser>(res);
    } catch (err: any) {
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
        return await this._checkResponse<IUser>(res);
      } else {
        return Promise.reject(err);
      }
    }
  };

  getData() {
    return fetch(`${this.url}/ingredients`).then(this._checkResponse<IGetData>);
  }
  postOrder(order: Array<TIngredient>) {
    return fetch(`${this.url}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("accessToken") || "",
      },
      body: JSON.stringify({
        ingredients: order,
      }),
    }).then(this._checkResponse<IOrder>);
  }
  resetPW(value: string) {
    return fetch(`${this.url}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: value,
      }),
    }).then(this._checkResponse<IPost>);
  }
  changePW(newPassword: string, code: string) {
    return fetch(`${this.url}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: newPassword,
        token: code,
      }),
    }).then(this._checkResponse<IPost>);
  }
  registration(input: { name: string; email: string; password: string }) {
    return fetch(`${this.url}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    }).then(this._checkResponse<IPost>);
  }
  login(email: string, password: string) {
    return fetch(`${this.url}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then(this._checkResponse<IPost & IGetToken>);
  }
  userGetData() {
    return this._fetchWithRefresh(`${this.url}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("accessToken") || "",
      },
    });
  }
  editProfile(form: { name?: string; email?: string; password?: string }) {
    return this._fetchWithRefresh(`${this.url}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("accessToken") || "",
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
