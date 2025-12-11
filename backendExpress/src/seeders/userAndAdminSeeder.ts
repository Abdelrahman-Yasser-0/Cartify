import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.ts";
import { userValidation } from "../validation/userValidation.ts";

// Default users
const defaultUsers = [
  {
    name: "John Doe",
    email: "user@example.com",
    phone: "1234567890",
    password: "userpassword", // plain password, will be hashed
    role: "user",
    shippingAddress: {
      country: "USA",
      city: "New York",
      streetAddress: "123 Main St",
      apartment: "1A",
      zip: "10001",
    },
    additionalInformation: {
      company: "",
      notes: "",
    },
    communicationPrefrences: {
      email: true,
      sms: false,
    },
  },
  {
    name: "Admin User",
    email: "admin@example.com",
    phone: "0987654321",
    password: "adminpassword", // plain password, will be hashed
    role: "admin",
    shippingAddress: {
      country: "USA",
      city: "Los Angeles",
      streetAddress: "456 Admin Blvd",
      apartment: "2B",
      zip: "90001",
    },
    additionalInformation: {
      company: "MyCompany",
      notes: "Admin account",
    },
    communicationPrefrences: {
      email: true,
      sms: true,
    },
  },
];

async function seedUsers() {
  try {
    console.log("MongoDB connected for user seeding");

    // Clear existing users
    // await User.deleteMany({});

    for (const userData of defaultUsers) {
      // Check if user exists (like in register endpoint)
      //
      const { name, email, password } = userData;

      // Check existing user
      const exists = await User.findOne({ email });

      if (exists) {
        console.log(`${userData} already exists`);
        continue;
      }

      const passwordHash = await bcrypt.hash(password, 10);

      //
      const user = await User.create({
        ...userData,
        passwordHash: passwordHash,
      });
      //
      const userObject =
        user instanceof Object ? JSON.parse(JSON.stringify(user)) : user;
      delete userObject.passwordHash;

      ///

      console.log(
        `Created user: ${userObject.email} with role ${userObject.role}`
      );
    }

    console.log("User seeding completed.");
    // Do NOT disconnect if server is running
    // await mongoose.disconnect();
  } catch (err) {
    console.error("Error seeding users:", err);
  }
}

export default seedUsers;
