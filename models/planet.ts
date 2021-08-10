import mongoose, {Schema, Document} from 'mongoose';

export interface Planet extends Document{
  x: Number,
  y: Number
}

const planetSchema: Schema = new Schema({
  x: {type: Number, required: true, unique: true},
  y: {type: Number, required: true, unique: true},
});

export const PlanetModel = mongoose.model<Planet>('planets', planetSchema);
