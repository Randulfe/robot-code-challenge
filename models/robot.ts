import mongoose, {Schema, Document} from 'mongoose';
import {Planet} from './planet';

export interface Robot extends Document{
  x: number,
  y: number,
  o: string,
  lost: string,
  planet: Planet['_id']
}

const robotSchema: Schema = new Schema({
  x: {type: Number, required: true},
  y: {type: Number, required: true},
  o: {type: String, required: true},
  lost: {type: String, required: false},
  planet: {type: Schema.Types.ObjectId, required: true},
});

export const RobotModel = mongoose.model<Robot>('robots', robotSchema);
