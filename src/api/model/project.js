import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: [true, "Project name is required"],
        trim: true,
        minlength: [3, "Project name must be at least 3 characters"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User id is required"],
    },
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
