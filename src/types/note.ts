import { Document } from "mongoose";

export interface Note extends Document {
  name: string
  description: string
  status: boolean
}