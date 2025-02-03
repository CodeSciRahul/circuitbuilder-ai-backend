import User from "../../model/user.js"
import { handleError } from "../../../util/handleError.js";
import user from "../../model/user.js";

export const updateProfile = async(req, res) => {
    try {
        const {firstName, lastName, email} = req.body;
        const {id} = req.params

        const user = await User.findById(id);
        if(!user) {
            return res.status(404).send({message: "User not exist"})
        }

        user?.firstName = firstName || user?.firstName;
        user?.lastName = lastName || user?.lastName;
        user?.email = email || user?.email;
    } catch (error) {
        handleError(error, res);
    }
}

export const changePassword = async(req, res) => {
    try {
        const {old_password, new_password} = req.body;
        const {id} = req.params;

        const user = User.findById(id)
        if(!user) return res.status(400).send({message: "User not exist"});

        const isMatch = User?.comparePassword(old_password);
        if(!isMatch) return res.status(400).send({message: "Wrong password"});

        await User.findOneAndUpdate({_id: id}, {password: new_password}, {new: true});
    } catch (error) {
        
    }
}