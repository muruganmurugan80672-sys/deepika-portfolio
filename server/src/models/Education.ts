import { Schema, model, Document } from 'mongoose';

export interface IEducation extends Document {
  degree: string;
  institution: string;
  department: string;
  startYear: string;
  endYear: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const educationSchema = new Schema<IEducation>(
  {
    degree: { type: String, required: true, trim: true },
    institution: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    startYear: { type: String, required: true, trim: true },
    endYear: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

export const Education = model<IEducation>('Education', educationSchema);
