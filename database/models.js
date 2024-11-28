import { model, Schema, SchemaTypes } from "mongoose";
import mongoose from "mongoose";
const userSchema = new Schema({
  chatId: { type: SchemaTypes.String, required: true },
  name: { type: SchemaTypes.String, required: true },
  email: { type: SchemaTypes.String, required: true },
  phone_number: { type: SchemaTypes.String, required: true },
  state: { type: SchemaTypes.String, required: true, default: "name" },
});
export const user = mongoose.models.user || model("user", userSchema);
