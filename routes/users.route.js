const bcrypt = require("bcrypt");
const Multipassify = require('multipassify')
const config = require("config");
const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const { 
  User, 
  validate, 
  findByCredentials 
} = require("../models/user.model");

multipassUrl = (user) => {
    // Construct the Multipassify encoder
    // local
    // var multipassify = new Multipassify(config.get("multipasskey"));
    // production
    var multipassify = new Multipassify(process.env.MULTIPASS_KEY);

    // Construct a customer object for Multipass
    customerData = {
      email: user.email,
      return_to: user.return_to,
      created_at: user.created_at
    }
  
    // Generate a Shopify multipass URL to your shop
    return multipassify.generateUrl(customerData, "multipass-demo.myshopify.com");
}

router.get("/current", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  const url = multipassUrl(user)
  res.send({
    _id: user.id,
    name: user.name,
    email: user.email,
    url
  });
});

router.post("/", async (req, res) => {
  // validate the request body first
  console.log(req.body)
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //find an existing user
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  });
  user.password = await bcrypt.hash(user.password, 10);
  await user.save();
  
  const token = user.generateAuthToken();

  // generate multipass url
  const url = multipassUrl(user)

  res.send({
    _id: user._id,
    name: user.name,
    email: user.email,
    token,
    url
  });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await findByCredentials(email, password)
    if (!user) {
      return res.status(401).send({error: 'Login failed! Incorrect password.'})
    }
    const token = await user.generateAuthToken();
    
    // generate multipass url
    const url = multipassUrl(user)
    
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
      url
    })
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router;
