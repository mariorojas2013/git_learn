import { config } from "./env";
import { select_env } from "./select_env";

const apiCtx = process.env.REACT_APP_API_URL.replace("__dominio__", config[select_env]);
const apiUrl = process.env.REACT_APP_API_URL.replace("__dominio__", config[select_env]);
const ENCRYPTED_VALUE = "**********";

const dateDiffInMinutes = (d1, d2) => {
  const diffInMillis = d1 - d2;
  return Math.round(diffInMillis / 1000 / 60);
};

const getCurrentUser = () => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      return JSON.parse(token);
    } catch (e) {
      return null;
    }
  } else {
    return null;
  }
};

const getToken = () => {
  const currentUser = getCurrentUser();
  return currentUser ? currentUser.token : null;
};

const getId_User = () => {
  const currentUser = getCurrentUser();
  return currentUser ? currentUser.id_User : null;
};

const hasValidSession = async (userId) => {
  const request = new Request(
    `${apiCtx}/organization/members/${userId}?token=${getToken()}`,
    {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json" }),
    }
  );

  return fetch(request)
    .then((response) => {
      if (response.status === 401) {
        return Promise.reject(401);
      } else {
        return response.json();
      }
    })
    .catch((e) => {
      return e === 401 ? Promise.reject(401) : Promise.resolve();
    });
};

const restClient = async (
  request,
  errorMsg,
  verifySuccessfulResponse,
  afterSuccessCallback
) => {
  return fetch(request)
    .then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error(errorMsg);
      }
      return response.json();
    })
    .then((jsonData) => {
      if (!verifySuccessfulResponse(jsonData)) {
        jsonData.success = false;
        return Promise.resolve(jsonData);
      } else {
        if (afterSuccessCallback) {
          afterSuccessCallback();
        }
        return Promise.resolve(jsonData);
      }
    });
};

const handleLogin = (loginResponse) => {
  localStorage.setItem(
    "token",
    JSON.stringify({
      loggedIn: new Date(),
      verifiedAt: new Date(),
      ...loginResponse,
    })
  );
};

const handleLogout = () => {
  localStorage.clear();
};

const tokenValidationRequired = () => {
  const validationRequired =
    (getCurrentUser() &&
      dateDiffInMinutes(new Date(), new Date(getCurrentUser().verifiedAt)) >=
        10) ||
    !getCurrentUser();
  if (validationRequired) {
    const user = getCurrentUser();
    user.verifiedAt = new Date();
    localStorage.setItem("token", JSON.stringify(user));
  }
  return validationRequired;
};

export {
  apiCtx,
  apiUrl,
  restClient,
  getToken,
  getId_User,
  getCurrentUser,
  hasValidSession,
  dateDiffInMinutes,
  handleLogin,
  handleLogout,
  tokenValidationRequired,
  ENCRYPTED_VALUE,
};
