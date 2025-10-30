import notesModel from "../models/notes.model.js";
import { generateTitleAndCategory, summarizeNote } from "../services/ai.service.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await notesModel.find({ user: req.user.id }).select("-__v");
    res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const createNote = async (req, res) => {
  try {
    let { title, description, category } = req.body;

    if ((!title || title === "") && (!category || category === "")) {
      const response = await generateTitleAndCategory({ notes: description });
      title = response.title;
      category = response.category;
    } else {
      if (!title || title === "") {
        const response = await generateTitleAndCategory({ notes: description });
        title = response.title;
      }
      if (!category || category === "") {
        const response = await generateTitleAndCategory({ notes: description });
        category = response.category;
      }
    }

    const newNote = await notesModel.create({
      title,
      description,
      user: req.user.id,
      category,
    });
    newNote.__V = undefined;
    res.status(200).json({
      success: true,
      message: "Note created successfully",
      newNote,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const { id } = req.params;

    const updatedNote = await notesModel.findOneAndUpdate(
      { _id: id, user: req.user.id },
      {
        title,
        description,
        category,
      },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found or unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      updatedNote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    await notesModel.findOneAndDelete({ _id: id, user: req.user.id });
    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await notesModel.distinct("category", { user: req.user.id });
    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


export const summarizeNotes = async (req, res) => {
  try {
    const { notes } = req.body;
    const summary = await summarizeNote({ notes });
    res.status(200).json({
      success: true,
      message: "Note summarized successfully",
      summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};