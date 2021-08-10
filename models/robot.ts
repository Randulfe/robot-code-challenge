import mongoose, {Schema, Document} from 'mongoose';
import {Planet} from './planet';

export interface Robot extends Document{
  x: Number,
  y: Number,
  o: String,
  planet: Planet['_id']
}

const robotSchema: Schema = new Schema({
  x: {type: Number, required: true, unique: true},
  y: {type: Number, required: true, unique: true},
  o: {type: String, required: true, unique: true},
  planet: {type: Schema.Types.ObjectId, required: false, unique: true},
});

export const RobotModel = mongoose.model<Robot>('robots', robotSchema);
