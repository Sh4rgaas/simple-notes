import { Document } from "mongoose";

export interface INote extends Document {
  name: string
  description: string
  status: boolean
}