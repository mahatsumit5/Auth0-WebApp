const express = require("express");
const path = require("path");
const { auth, requiresAuth } = require("express-openid-connect");
const cors = require("cors");
const port = 8000;
const app = express();
const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: "http://localhost:8000",
  clientID: "cbWVFEiz6GJygdTdF9Uc96ob5196DfLz",
  issuerBaseURL: "https://dev-fkp34f1yfajuoqj7.au.auth0.com",
  secret: "ebU5Q3uddA1zG6J-aMx0g0qsso5rCjxVHqH6lV_ZxtrEuprTjX2UOahuOqYNZYZb",
};
// const __dirname = path.resolve();
// The `auth` router attaches /login, /logout
// and /callback routes to the baseURL
app.use(auth(config));
app.use(requiresAuth());
app.use(express.json());
app.use(express.static(__dirname + "/dist"));
app.use(cors());
app.use((err, req, res, next) => {
  return res.status(500).json({
    status: "error",
    message: err.message,
  });
});
// app.use("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist"));
// });
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, () => {
  console.log("server is up and running", `http://localhost:${port}`);
});
