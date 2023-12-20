import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
    match: [/^f20(1[0-9]|20)[0-9]{4}@goa\.bits-pilani\.ac\.in$/, 'Please fill a valid BITS email address (Only graduating batch allowed)'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
  },
  image: {
    type: String,
  }
});

const User = models.User || model("User", UserSchema);

export default User;