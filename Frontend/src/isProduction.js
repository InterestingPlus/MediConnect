function apiPath() {
  const isProduction = false;

  if (isProduction) {
    return "https://hms-backend-tr2u.onrender.com";
  } else {
    return "http://localhost:4444";
  }
}

export default apiPath;
