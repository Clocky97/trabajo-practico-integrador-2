import { UserModel } from "../models/user.model.js";

//Obtener todos los usuarios

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error al traer los usuarios", error});
    }
};

//Obtener usuario por ID

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error al traer el usuario", error});
    }
};

//Crear usuario

export const createUser = async (req, res) => {
    const { username, email, password, role, profile } = req.body;
    try {
        const newUser = new UserModel({ username, email, password, role, profile });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el usuario", error});
    }
};

//Actualizar usuario

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password, role, profile } = req.body;
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(id, { username, email, password, role, profile }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el usuario", error});
    }
}

//Eliminar usuario (soft delete)

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await UserModel.findByIdAndUpdate(id, { deleted: true });
        res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el usuario", error});
    }
};

