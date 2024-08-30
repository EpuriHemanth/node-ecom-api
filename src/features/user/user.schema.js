import { Schema } from "mongoose";

export const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
      "Please enter a valid Gmail address."
    ],
  },
  password: {
    type: String,
    validate: {
      validator: function(value) {
        return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
      },
      message: "Password must have at least one uppercase letter, one special character, and one digit between 0-9.",
    },
  },
  type: {
    type: String,
    enum: ['customer', 'seller'],
  }
});
