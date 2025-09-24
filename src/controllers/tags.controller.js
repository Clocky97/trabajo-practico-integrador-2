import { TagModel } from "../models/tags.model.js";

//Obtener todas las etiquetas

export const getAllTags = async (req, res) => {
    try {
        const tags = await TagModel.find();
        res.status(200).json(tags);
    }   catch (error) {
        res.status(500).json({ message: "Error al traer las etiquetas", error});
    }
};

//Obtener etiqueta por ID

export const getTagById = async (req, res) => {
    const { id } = req.params;
    try {
        const tag = await TagModel.findById(id);
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