// const mongoose = import
//   Schema = mongoose.Schema;

import { Schema } from '../connect';

const userSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  name: { type: String }, //姓名
  pwd: { type: String }, //密码
  age: { type: Number }, //年龄
});

userSchema.method('transform', function() {
  var obj = this.toObject();
  //Rename fields
  obj.id = obj._id;
  delete obj._id;
  return obj;
});

export const UserSchema = userSchema;
