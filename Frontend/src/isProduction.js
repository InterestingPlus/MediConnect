function apiPath() {
  let isProduction = false;

  if (isProduction) {
    console.log("From Cloud");
    return "https://hms-backend-production-7d9d.up.railway.app";
    // return "https://hms-backend-tr2u.onrender.com";
  } else {
    console.log("From LocalHost");
    return "http://localhost:4444";
    // return "http://192.168.129.169:4444";
  }
}

export default apiPath;
