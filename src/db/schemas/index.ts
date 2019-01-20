import { Model } from '../connect';
import { UserSchema } from './user';

export const UserModel = Model('User', UserSchema);
