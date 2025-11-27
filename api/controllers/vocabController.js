const mongoose = require('mongoose');
const Vocab = mongoose.model('Vocab');

// GET all words
exports.list_all_words = async (req, res) => {
  try {
    const words = await Vocab.find({});
    res.json(words);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create a word
exports.create_a_word = async (req, res) => {
  try {
    const newWord = new Vocab(req.body);
    const savedWord = await newWord.save();
    res.status(201).json(savedWord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET a single word
exports.read_a_word = async (req, res) => {
  try {
    const word = await Vocab.findById(req.params.wordId);
    if (!word) {
      return res.status(404).json({ message: "Word not found" });
    }
    res.json(word);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT update a word
exports.update_a_word = async (req, res) => {
  try {
    const updatedWord = await Vocab.findOneAndUpdate(
      { _id: req.params.wordId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedWord) {
      return res.status(404).json({ message: "Word not found" });
    }

    res.json(updatedWord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE a word
exports.delete_a_word = async (req, res) => {
  try {
    const deleted = await Vocab.deleteOne({ _id: req.params.wordId });

    if (deleted.deletedCount === 0) {
      return res.status(404).json({ message: "Word not found" });
    }

    res.json({
      message: "Word successfully deleted",
      _id: req.params.wordId
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
