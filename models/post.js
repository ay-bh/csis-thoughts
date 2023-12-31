import { Schema, model, models } from 'mongoose';

const PostSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required:[true]
  },
  post: {
    type: String,
    required: [true, 'Post is required.'],
  },
  createdAt: {
    type: Date,
  },
  likes: {
    type: Number,
    default: 0, 
  },
  anon:{
    type:Boolean,
    default:false
  }
});

const Post = models.Post || model('Post', PostSchema);

export default Post;