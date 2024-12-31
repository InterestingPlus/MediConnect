async function apiPath() {
  let isProduction = false;

  await fetch("/config.json")
    .then((response) => response.json())
    .then((data) => {
      isProduction = data.useCloudServer;
    })
    .catch((error) => {
      alert("Error loading config:");
      console.log("Error loading config:", error);
    });

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
