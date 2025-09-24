import { ArticleModel } from "../models/article.model.js";

//Obtener todos los artículos

export const getAllArticles = async (req, res) => {
    try {
        const articles = await ArticleModel.find().populate('author', 'username email')
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: "Error al traer los artículos", error});
    }
};

//Obtener artículo por ID

export const getArticleById = async (req, res) => {
    const { id } = req.params;
    try {
        const article = await ArticleModel.findById(id).populate('author', 'username email');
        if (!article) {
            return res.status(404).json({ message: "Artículo no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al traer el artículo", error});
    }
};

//Crear artículo

export const createArticle = async (req, res) => {
    const { title, content, excerpt, status, author, tags } = req.body;
    try {
        const newArticle = new ArticleModel({ title, content, excerpt, status, author, tags })
    } catch (error) {
        res.status(500).json({ message: "Error al crear el artículo", error})
    }
};

//Actualizar artículo

export const updateArticle = async (req, res) => {
    const {id} = req.params;
    const { title, content, excerpt, status, author, tags } = req.body;
    try {
        const updateArticle = await ArticleModel.findByIdAndUpdate(id, { title, content, excerpt, status, author, tags}, { new: true });
        res.status(200).json(updateArticle);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el artículo", error});
    }
}

//Eliminar artículo

export const deleteArticle = async (req, res) => {
    const { id } = req.params;
    try {
        await ArticleModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Artículo eliminado correctamente"})
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el artículo", error});
    }
}