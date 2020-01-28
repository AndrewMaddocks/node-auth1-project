const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("./users-model.js");

router.get("/", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});
//middleware
function restricted(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "You shall not pass!!" });
  }
}
// function restricted(req, res, next) {
//   // we'll read the username and password from headers
//   // the client is responsible for setting those headers
//   const { username, password } = req.headers;

//   // no point on querying the database if the headers are not present
//   if (username && password) {
//     Users.findBy({ username })
//       .first()
//       .then(user => {
//         if (user && bcrypt.compareSync(password, user.password)) {
//           next();
//         } else {
//           res.status(401).json({ message: "Invalid Credentials" });
//         }
//       })
//       .catch(error => {
//         res.status(500).json({ message: "Unexpected error" });
//       });
//   } else {
//     res.status(400).json({ message: "No credentials provided" });
//   }
// }

module.exports = router;
