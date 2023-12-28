import { Schema, model, models } from 'mongoose';

// Create a schema for the whitelist
const WhitelistSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  collection: 'whitelist' 
});

// Create a model from the schema
const Whitelist = models.Whitelist || model("Whitelist", WhitelistSchema);

export default Whitelist;
