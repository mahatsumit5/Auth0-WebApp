const express = require("express");
const { auth, requiresAuth } = require("express-openid-connect");
const cors = require("cors");
const port = 8000;
const app = express();
const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: "http://localhost:8000",
  clientID: "mHbNKMa3mF5Kg45YZpEeopCptN990nF7",
  issuerBaseURL: "https://dev-fkp34f1yfajuoqj7.au.auth0.com",
  secret: "VF4TVHdlM2gOkaE-BaGGlHVmw2Abb5RfzzlUVPwX1yuBx0egqt8eR4tKMeTsSbVZ",
};

// The `auth` router attaches /login, /logout
// and /callback routes to the baseURL
app.use(auth(config));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use((err, req, res, next) => {
  return res.status(500).json({
    status: "error",
    message: err.message,
  });
});
app.get("/", (req, res) => {
  // res.send("hello");
  req.oidc.isAuthenticated()
    ? res.json({
        message: "Authorized",
      })
    : res.json({
        status: false,
        message: "You are logged out",
      });
});

// The /profile route will show the user profile as JSON
app.get("/profile", requiresAuth(), (req, res) => {
  res.json({
    user: req.oidc.idTokenClaims,
  });
  res.render();
});
app.listen(port, () => {
  console.log("server is up and running", `http://localhost:${port}`);
});
