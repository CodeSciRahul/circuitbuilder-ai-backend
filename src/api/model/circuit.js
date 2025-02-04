import mongoose from "mongoose";

const circuitSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    prompt: {
        type: String,
        required: true
    },
    circuit: {
        type: Object,
        required: true
    }
}, { timestamps: true });

export default mongoose.model("Circuit", circuitSchema);
