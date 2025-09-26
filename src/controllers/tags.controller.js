import { TagModel } from "../models/tags.model.js";
import { ArticleModel } from "../models/article.model.js";

//Obtener todas las etiquetas

export const getAllTags = async (req, res) => {
    try {
        const tags = await TagModel.find().populate('tags');
        res.status(200).json(tags);
    }   catch (error) {
        res.status(500).json({ message: "Error al traer las etiquetas", error});
    }
};

//Obtener etiqueta por ID

export const getTagById = async (req, res) => {
    const { id } = req.params;
    try {
        const tag = await TagModel.findById(id).populate('tags');
        if (!tag) {
            return res.status(404).json({ message: "Etiqueta no encontrada" });
        }
        res.status(200).json(tag);
    } catch (error) {
        res.status(500).json({ message: "Error al traer la etiqueta", error});
    }
};

//Crear etiqueta

export const createTag = async (req, res) => {
    const { name, description } = req.body;
    try {
        const newTag = new TagModel({ name, description });
        await newTag.save();
        res.status(201).json(newTag);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la etiqueta", error});
    }
};

//Actualizar etiqueta

export const updateTag = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const updatedTag = await TagModel.findByIdAndUpdate(id, { name, description }, { new: true });
        if (!updatedTag) {
            return res.status(404).json({ message: "Etiqueta no encontrada" });
        }
        res.status(200).json(updatedTag);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la etiqueta", error});
    }
};

//  Eliminar etiqueta

export const deleteTag = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTag = await TagModel.findByIdAndDelete(id);
        if (!deletedTag) {
            return res.status(404).json({ message: "Etiqueta no encontrada" });
        }
        res.status(200).json({ message: "Etiqueta eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la etiqueta", error});
    }
};

//Asignar etiqueta a un articulo


export const assignTagToArticle = async (req, res) => {
  const { tagId, articleId } = req.body;
  try {
    const tag = await TagModel.findById(tagId);
    if (!tag) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }

    const article = await ArticleModel.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    // Evitar duplicados
    if (!article.tags.includes(tagId)) {
      article.tags.push(tagId);
    }

    await article.save();
    await article.populate("tags");

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({
      message: "Error al asignar la etiqueta al artículo",
      error,
    });
  }
};

//quitar un tag

export const unassignTagFromArticle = async (req, res) => {
  const { tagId, articleId } = req.body;
  try {
    //verificar si el tag existe
    const tag = await TagModel.findById(tagId);
    if (!tag) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }

    //verificar articulo si existe
    const article = await ArticleModel.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    // Filtrar tags como array
    article.tags = article.tags.filter(
      (id) => id.toString() !== tagId.toString()
    );

    await article.save();
    await article.populate("tags");

    res.status(200).json({
      message: "Etiqueta removida del artículo correctamente",
      article,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al quitar la etiqueta del artículo",
      error,
    });
  }
};
