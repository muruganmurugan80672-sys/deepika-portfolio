import { Schema, model, Document } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  category: string;
  icon?: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const skillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    icon: { type: String, default: 'Code' },
    sortOrder: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Skill = model<ISkill>('Skill', skillSchema);
