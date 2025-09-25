import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { UserModel } from "../models/user.model.js";
import { generateToken } from "../helpers/jwt.helper.js";

// Registro de usuario

export const register = async (req, res) => {
    const { username, email, password, role, profile } = req.body;
    try {
        const hashedPwd = await hashPassword(password);
        const newUser = new UserModel({ username, email, password: hashedPwd, role, profile });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Error al registrar el usuario", error});
    }
};

// Login de usuario

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }
        const token = generateToken({ id: user._id, role: user.role });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión", error});
    }
};

//logout

export const logout = (req, res) => {
    res.clearCookie("token");
    return res.json({ message: "Logout exitoso" });
};