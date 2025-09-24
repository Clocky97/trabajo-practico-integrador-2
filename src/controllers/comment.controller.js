import { CommentModel } from "../models/comment.model.js";

//Obtener todos los comentarios

export const getAllComments = async (req, res) => {
    try {
        const comments = await CommentModel.find().populate('author', 'username email').populate('article', 'title');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: "Error al traer los comentarios", error});
    }
};

//Obtener comentario por ID

export const getCommentById = async (req, res) => {
    const {id} = req.params;
    try {
        const comment = await CommentModel.findById(id).populate('author', 'username email').populate('article', 'tags title');
    } catch (error) {
        res.status(500).json({ message: "Error al traer el comentario", error});
    }
};

//Crear comentario

export const createComment = async (req, res) => {
    const { content, author, article } = req.body;
    try {
        const newComment = new CommentModel({ content, author, article});
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el comentario", error});
    }
}

//Actualizar comentario

export const updateComment = async (req, res) => {
    const {id} = req.params;
    const { content, author, article } = req.body;
    try {
        const updateComment = await CommentModel.findByIdAndUpdate(id, { content, author, article }, { new: true });
        res.status(200).json(updateComment);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el comentario", error});
    }
}

//Eliminar comentario

export const deleteComment = async (req, res) => {
    const {id} = req.params;
    try {
        await CommentModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Comentario eliminado correctamente"});
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el comentario", error});
    }
}