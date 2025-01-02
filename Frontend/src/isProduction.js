async function apiPath() {
  let isProduction = false;

  await fetch("/production.json")
    .then((response) => response.json())
    .then((data) => {
      isProduction = data.production;
    })
    .catch((error) => {
      alert("Internet Not Connected!");
    });

  if (isProduction) {
    return "https://hms-backend-production-7d9d.up.railway.app";
    // return "https://hms-backend-tr2u.onrender.com";
  } else {
    return "http://localhost:4444";
    // return "http://192.168.129.169:4444";
  }
}

export default apiPath;
