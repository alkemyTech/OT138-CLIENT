(() => {
  if (typeof process.env.REACT_APP_LS_ACCESS_TOKEN === "undefined") {
    console.warn(
      "Variable REACT_APP_LS_ACCESS_TOKEN not defined in environment file"
    );
  }
  if (typeof process.env.REACT_APP_LS_REFRESH_TOKEN === "undefined") {
    console.warn(
      "Variable REACT_APP_LS_REFRESH_TOKEN not defined in environment file"
    );
  }
})();

const ACCESS_TOKEN = process.env.REACT_APP_LS_ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REACT_APP_LS_REFRESH_TOKEN;

function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN);
}

function setAccessToken(token) {
  localStorage.setItem(ACCESS_TOKEN, token);
}

function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN);
}

function setRefreshToken(token) {
  localStorage.setItem(REFRESH_TOKEN, token);
}

/* Remove Access Token from Local Storage */
function removeAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN);
}
/* Remove Refesh Access Token from Local Storage */
function removeRefreshToken() {
  localStorage.removeItem(REFRESH_TOKEN);
}

export default {
  getAccessToken,
  setAccessToken,
  getRefreshToken,
  setRefreshToken,
  removeAccessToken,
  removeRefreshToken,
};
