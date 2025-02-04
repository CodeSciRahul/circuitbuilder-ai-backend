import Circuit from "../../model/circuit.js"
import Project from "../../model/project.js"
import {handleError,handleGeminiError} from "../../../util/handleError.js"
import generateCircuit from "../../../util/ai-agent.js"

//  Create a new circuit
export const createCircuit = async (req, res) => {
    try {
        const { projectId, prompt } = req.body;

        const projectExists = await Project.findById(projectId);
        if (!projectExists) return res.status(404).send({message: "Project not found" });

        if(!prompt) return res.status(400).send({message: "Enter prompt"})

        const circuit = await generateCircuit(prompt)

        const newCircuit = new Circuit({ projectId, prompt, circuit });
        await newCircuit.save();

        res.status(201).send({ message: "Circuit created", data: newCircuit });
    } catch (error) {
        handleGeminiError(error, res);
    }
};

//  Get all circuits
export const getAllCircuits = async (req, res) => {
    try {
        const {projectId} = req.params
        const circuits = await Circuit.find({projectId}).populate("projectId", "projectName");
        res.status(200).send({ data: circuits });
    } catch (error) {
        handleError(error, res)
    }
};


// // ✅ Update a circuit
// export const updateCircuit = async (req, res) => {
//     try {
//         const { prompt, circuit } = req.body;
//         const updatedCircuit = await Circuit.findByIdAndUpdate(
//             req.params.id,
//             { prompt, circuit },
//             { new: true }
//         );

//         if (!updatedCircuit) return res.status(404).json({ success: false, message: "Circuit not found" });

//         res.status(200).json({ success: true, message: "Circuit updated", circuit: updatedCircuit });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

