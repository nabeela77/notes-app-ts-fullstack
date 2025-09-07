import { Schema, model, InferSchemaType } from "mongoose";

const noteSchema = new Schema(
  {
    content: { type: String, required: true, minLength: 1, trim: true },
    date: { type: Date, default: Date.now },
    important: { type: Boolean, default: false },
  },
  { timestamps: true }
);

noteSchema.set("toJSON", {
  transform: (_doc, ret: any) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export type Note = InferSchemaType<typeof noteSchema>;
export const NoteModel = model<Note>("Note", noteSchema);
