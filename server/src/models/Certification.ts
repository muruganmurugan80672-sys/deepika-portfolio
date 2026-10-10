import { Schema, model, Document } from 'mongoose';

export interface ICertification extends Document {
  title: string;
  issuer: string;
  completionDate: string;
  credentialUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const certificationSchema = new Schema<ICertification>(
  {
    title: { type: String, required: true, trim: true },
    issuer: { type: String, required: true, trim: true },
    completionDate: { type: String, required: true, trim: true },
    credentialUrl: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

export const Certification = model<ICertification>('Certification', certificationSchema);
