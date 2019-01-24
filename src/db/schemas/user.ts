//  用户模型
import { Schema } from '../connect';
import { Model } from '../connect';

const UserSchema = new Schema({
  name: { type: String }, //姓名
  pwd: { type: String }, //密码
  age: { type: Number }, //年龄
});

let UserModel = Model('User', UserSchema);

export { UserModel };
