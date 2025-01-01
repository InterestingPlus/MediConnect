function apiPath() {
  let isProduction = false;

  if (isProduction) {
    return "https://hms-backend-production-7d9d.up.railway.app";
    // return "https://hms-backend-tr2u.onrender.com";
  } else {
    return "http://localhost:4444";
    // return "http://192.168.129.169:4444";
  }
}

export default apiPath;
