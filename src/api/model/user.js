import mongoose from "mongoose";
import bcrypt from "bcrypt"
import {properties} from "../../config/properties.js"

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required."],
        minlength: [3, "Name must be atleast 3 character"],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "Last name is required."],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter valied email"]
    },
    password: {
        type: String,
        required: true,
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least 8 characters, including at least one lowercase letter, one uppercase letter, one special char and one number'],
      },
})

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, Number(properties?.SALT_ROUND));
    next();
  });
  
  // Hash password before updating
  userSchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate(); //get the update value.
    if (update.password) {
      update.password = await bcrypt.hash(update.password, Number(properties?.SALT_ROUND));
    }
    next();
  });
  
  // Custom method to compare passwords
  userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };
  

export default mongoose.model("User", userSchema)