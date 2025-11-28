import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  permissions: [{ type: String, ref: 'Permission', required: true }], // store keys for speed
  inherits: [{ type: String, ref: 'Role' }] // optional role inheritance
}, { timestamps: true });

const Role = mongoose.models.Role || mongoose.model("Role", roleSchema);
export default Role;
