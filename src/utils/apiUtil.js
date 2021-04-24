const apiBaseUrl = "/api"; // for production environment

async function uniFetch(url, options) {
  options = options || {};
  const method = options.method || 'GET';
  const body = JSON.stringify(options.body) || undefined;
  // let it throw network (and CORS etc.) errors
  const response = await fetch(apiBaseUrl + url, {
    method,
    body,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  // request completed but response code not 200
  if (!response.ok) {
    // unauthorized, jump to login page
    if (response.status === 401) {
      window.location.href = `https://passport.zjuqsc.com/login?redirect=${encodeURIComponent(window.location.href)}`;
    }
    let errMsg = null;
    if (response.status >= 400 && response.status < 500) {
      // if starting with 4, try to parse error message
      try {
        // try to get error data
        const { data } = await response.json();
        errMsg = { errMsg: data };
      } catch (e) {
        // on error, do thing and fallback to normal route
      }
    }
    if (errMsg) throw errMsg;
  }
  const json = await response.json();
  return json["data"];
}

export { apiBaseUrl, uniFetch };
