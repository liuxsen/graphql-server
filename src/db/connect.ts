import * as mongoose from 'mongoose';
import { DB_URL } from '../config';

/**
 * 连接
 */
mongoose.connect(DB_URL);

/**
 * 连接成功
 */
mongoose.connection.on('connected', function() {
  console.log('Mongoose connection open to ' + DB_URL);
});

/**
 * 连接异常
 */
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose connection disconnected');
});

mongoose.set('debug', true);

export default mongoose;
export const Schema = mongoose.Schema;
export const Model = mongoose.model;
