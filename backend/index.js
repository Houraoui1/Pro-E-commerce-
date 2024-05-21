const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = express();
const Stripe = require("stripe");

app.use(cors());
app.use(
  express.json({
    limit: "10mb",
  })
);

const PORT = process.env.PORT || 8000;
//connect mongo db

//console.log(proces.env.MONGODB_URL);
console.log(process.env.MONGODB_URL);
// mongoose
//   .connect(process.env.MONGODB_URL)
//   .then(() => console.log("connecting to database"))
//   .catch((error) => console.log(error));
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("connecting to database"))
  .catch((error) => console.log(error, "not connecting to database"));

//shema
const usershema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmpassword: String,
  image: String,
});
const mongomodel = mongoose.model("user", usershema);
//api
app.get("/", (req, res) => {
  res.send("server is runing ");
});

// for the signup  check
app.post("/signup", async (req, res) => {
  // console.log(req.body);
  try {
    const { email } = req.body;
    const data = await mongomodel.findOne({ email: email });

    if (data) {
      res.send({ messagefalse: "email is already register", alert: false });
    } else {
      const data = mongomodel(req.body);
      const save = data.save();
      res.send({ messagesucces: "is saved seccessfuly", alert: true });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// for login check
app.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const { email } = req.body;
    const data = await mongomodel.findOne({ email: email });

    if (data) {
      const datasend = {
        _id: data._id,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
        confirmpassword: data.confirmpassword,
        image: data.image,
      };
      console.log(datasend);
      res.send({ messagesucces: "login is valide", data: datasend });
    } else {
      // const data = mongomodel(req.body);
      // const save = data.save();
      res.send({ messagefalse: "invalid login" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// for page product
const productSchema = mongoose.Schema({
  name: String,
  category: String,
  price: String,
  image: String,
  description: String,
});
// envoyer le nom "product" as name of data productSchema
const product = mongoose.model("product", productSchema);
// "/uploadproduct for handle this name in fetch after url of this server"
//  api
app.post("/uploadproduct", async (req, res) => {
  //   try {s
  //     const { image } = req.body;
  //     const datares = await product.findOne({ image: image });
  //     console.log(req.body);
  //     if (datares) {
  //       res.send({ messagefalse: "this data not upload" });
  //     } else {
  //       const dataa = await product(req.body);
  //       const save = await dataa.save();
  //       console.log(save);

  //       res.send({ messagesucces: "upload is seccessfully " });
  //     }
  //   } catch {
  //     res.send({ messagefalse: "error in server" });
  //   }
  // });
  console.log(req.body);
  try {
    const { name } = req.body;
    const datares = await product.findOne({ name: name });

    if (datares) {
      res.send({ message: "this is already in data" });
    } else {
      const data = product(req.body);
      const save = await data.save();
      res.send({ message: "upload is seccessfully " });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//api
app.get("/product", async (req, res) => {
  try {
    const allData = await cd.find({});
    console.log(allData);

    res.send(allData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//***************payment stripe  */

console.log(process.env.STRIPE_SECRET_KEY);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/checkout-payment", async (req, res) => {
  console.log(req.body);
  try {
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_adress_collection: "auto",
      shipping_options: [{ shipping_rate: "shr_1N0qDnSAq8kJSdzMvLVkJdua" }],

      line_items: req.body.map((item) => {
        return {
          price_data: {
            currency: "DH",
            product_data: {
              name: item.name,
              images: [item.image],
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enable: true,
            minimum: 1,
          },
          quantity: item.qty,
        };
      }),

      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    const session = await stripe.checkout.sessions.create(params);
    res.status(200).json(session._id);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message);
  }
});

// server
app.listen(PORT, () => console.log("server runing hello  " + PORT));
