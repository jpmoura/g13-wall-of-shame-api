import * as mongoose from 'mongoose';
import Shame from './shame.entity';

export type ShameDocument = Shame & mongoose.Document<Shame>;

export const ShameSchema = new mongoose.Schema<Shame>(
  {
    event: String,
    reason: String,
    date: Date,
  },
  {
    autoCreate: true,
    id: true,
    timestamps: true,
  },
);
