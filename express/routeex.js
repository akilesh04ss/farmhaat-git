const express = require("express");
const router = express.Router();
const register = require("./registerschema");
const login = require("./loginschema");
const investor = require("./investorschema");
const feedback = require("./feedbackschema");
const cart = require("./cartschema");
const order = require("./orderschema");
const bcrypt = require("bcrypt");
var nodemailer = require("nodemailer");

router.get("/register", async (req, res) => {
  var registerform = await register.find();
  res.status(200).json(registerform);
});
router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    var email = await register.findOne({ Email: req.body.Email });
    var usr = await register.findOne({ Username: req.body.Username });
    if (usr) {
      return res.status(200).json({ err: "Username already exists" });
    }
    if (email) {
      return res.status(200).json({ err: "Email already exists" });
    }
    const salt = await bcrypt.genSalt();
    const hash1 = await bcrypt.hash(req.body.Password, salt);
    var registerform = await register.create({
      Fname: req.body.Fname,
      Sname: req.body.Sname,
      Email: req.body.Email,
      Phone: req.body.Phone,
      Address: req.body.Address,
      Password: hash1,
      Username: req.body.Username,
      Confirmpass: hash1,
    });
    if (registerform) {
      let testAccount = await nodemailer.createTestAccount();
      var toemail = registerform.Email;
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "akileshs917@gmail.com",
          pass: "Akilesh@$&123",
        },
      });
      let info = await transporter.sendMail({
        from: '"Farmhaat" <akileshs917@gmail.com>',
        to: toemail,
        subject: "FARMHAAT REGISTRATION",
        text: "Thanks for registering with us",
        html: "<b>Thanks for registering with us</b>",
      });

      console.log("Message sent: %s", info.messageId);
    }
  } catch (err) {
    res.status(404).json();
    console.log(err);
  }
  res.status(200).json({ err: null });
  res.status(200).json(registerform);
});
router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    var Userdata = await register.findOne({ Username: req.body.Username });
    if (!Userdata) {
      return res.status(200).json({ err: "Username Not Exists" });
    }
    var validation = await bcrypt.compare(req.body.Password, Userdata.Password);
    if (!validation) {
      return res.status(200).json({ err: "Password Incorrect" });
    }
  } catch (err) {
    res.status(404).json(err);
  }
  res.status(204).json({ err: null });
});

router.get("/investor", async (req, res) => {
  var investorform = await investor.find();
  res.status(200).json(investorform);
});
router.post("/investor", async (req, res) => {
  try {
    var investorform = await investor.create({
      Name: req.body.Name,
      Email: req.body.Email,
      Material: req.body.Material,
      Description: req.body.Description,
      Wgt: req.body.Wgt,
    });
    if (investorform) {
      let testAccount1 = await nodemailer.createTestAccount();
      var toemails = investorform.Email;
      let transporter1 = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "akileshs917@gmail.com",
          pass: "Akilesh@$&123",
        },
      });
      let infos = await transporter1.sendMail({
        from: '"Farmhaat" <akileshs917@gmail.com>',
        to: toemails,
        subject: "FARMHAAT REQUESTING",
        text: "Thanks for requesting",
        html: "<b>Thanks for requesting</b>",
      });

      console.log("Message sent: %s", infos.messageId);
    }
  } catch (err) {
    res.status(404).json(err);
  }
  res.status(200).json(investorform);
  res.status(200).json({ err: null });
});
router.get("/feedback", async (req, res) => {
  var feedbackform = await feedback.find();
  res.status(200).json(feedbackform);
});
router.post("/feedback", async (req, res) => {
  console.log(req.body);
  var feedbackform = await feedback.create({
    Name: req.body.Name,
    Email: req.body.Email,
    Msg: req.body.Msg,
    Contact: req.body.Contact,
  });
  if (feedbackform) {
    let testAcccount = await nodemailer.createTestAccount();
    var toemailc = feedbackform.Email;
    let transporterc = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "akileshs917@gmail.com",
        pass: "Akilesh@$&123",
      },
    });
    let cinfo = await transporterc.sendMail({
      from: '"Farmhaat" <akileshs917@gmail.com>',
      to: toemailc,
      subject: "FARMHAAT FEEDBACK",
      text: "Thanks for giving your Feedback",
      html: "<b>Thanks for giving your Feedback</b>",
    });

    console.log("Message sent: %s", cinfo.messageId);
  }

  res.status(200).json(feedbackform);
});
router.get("/cart", async (req, res) => {
  cartform = await cart.find();
  res.status(200).json(cartform);
});
router.delete("/cart/:id", async (req, res) => {
  try {
    const deletecart = await cart.deleteOne(
      { _id: req.params.id },
      res.redirect("http://localhost:2000/farmhaat/cart")
    );
    res.status(200).json(deletecart);
  } catch (err) {
    res.status(404).json("err:", err);
  }
});
router.post("/cart", async (req, res) => {
  var cartform = await cart.create({
    Name: req.body.Name,
    Price: req.body.Price,
    Quantity: req.body.Quantity,
    Image: req.body.Image,
    des1: req.body.des1,
    des2: req.body.des2,
    des3: req.body.des3,
    des4: req.body.des4,
  });
  res.status(200).json(cartform);
  console.log(req.body);
});
router.get("/order", async (req, res) => {
  var orderform = await order.find();
  res.status(200).json(orderform);
});
router.post("/order", async (req, res) => {
  var orderform = await order.create({
    Name: req.body.Name,
    Price: req.body.Price,
    Quantity: req.body.Quantity,
    Delivery: req.body.Delivery,
    Image: req.body.Image,
    des1: req.body.des1,
    des2: req.body.des2,
    des3: req.body.des3,
    des4: req.body.des4,
  });
  res.status(200).json(orderform);
});
module.exports = router;
