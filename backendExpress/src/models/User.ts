import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,

  // store only the hashed password
  passwordHash: { type: String },

  role: { type: String, enum: ["user", "admin"], default: "user" },

  shippingAddress: {
    country: String,
    city: String,
    streetAddress: String,
    apartment: String,
    zip: String,
  },

  additionalInformation: {
    company: String,
    notes: String,
  },

  communicationPrefrences: {
    email: Boolean,
    sms: Boolean,
  },

  cart: {
    type: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        quantity: { type: Number, required: true },
      },
    ],
    default: [],
  },
  purchased: {
    type: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        quantity: { type: Number, required: true },
        status: String,
        date: { type: Date, default: new Date() },
      },
    ],
    default: [],
  },
  wishingList: {
    type: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      },
    ],
    default: [],
  },
});

/////

// UserSchema.statics.findByCredentials = async function (email, password) {
//   const user = await User.findOne({ email });

//   if (!user) {
//     throw new Error("Invalid email or password");
//   }
//   const isPasswordMatch = await bcrypt.compare(password, user.password);

//   if (!isPasswordMatch) {
//     throw new Error("Invalid email or password");
//   }
//   return user;
// };

// UserSchema.methods.generateToken = function () {
//   return jwt.sign({ id: this._id.toString() }, "this is my secret key");
// };

// UserSchema.methods.toJSON = function () {
//   const userObject = this.toObject();
//   delete userObject.password;
//   return userObject;
// };

////

const User = mongoose.model("users", UserSchema);
export default User;
