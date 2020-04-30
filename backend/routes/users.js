const express = require("express");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require('express').Router();
const auth = require("../middleware/auth");
let User = require('../model/user');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newUser = new User({username});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/spesific/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(User => res.json(User))
    .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/update/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(User => {
      User.username = req.body.username;
      User.name = req.body.name;
      User.role = req.body.role;

      User.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post(
  "/register",
  [
    check("name", "Please Enter a Valid Name").not().isEmpty(),
    check("role", "Please Enter a Valid role").not().isEmpty(),
    check("username", "Please Enter a Valid Username")
      .not()
      .isEmpty(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { username, password, name, role } = req.body;
    try {
      let user = await User.findOne({username});
      if (user)  {
        return res.status(400).json({
          msg: "User Already Exists"
        });
      }

      user = new User({
        username,
        password,
        name,
        role 
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      
      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "randomString",
        {
         // expiresIn: 10000000000000000000
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
            user
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);

router.post(
  "/login",
  [
    check("username", "Please enter a valid username").not().isEmpty(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { username, password } = req.body;
    try {
      let user = await User.findOne({
        username
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist"
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !"
        });

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "randomString",
        {
         // expiresIn: 360000000000000000000000000000
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);

/**
 * @method - POST
 * @description - Get LoggedIn User
 * @param - /user/me
 */

router.get("/me", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

module.exports = router;