import mongoose, {Schema, Document} from 'mongoose';

export interface Planet extends Document{
  x: number,
  y: number
}

const planetSchema: Schema = new Schema({
  x: {type: Number},
  y: {type: Number},
});

export const PlanetModel = mongoose.model<Planet>('planets', planetSchema);
