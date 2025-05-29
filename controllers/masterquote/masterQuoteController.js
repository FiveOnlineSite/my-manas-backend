const MasterQuote = require("../../models/masterquote/MasterQuote");

exports.create = async (req, res) => {
  try {
    const quote = new MasterQuote(req.body);
    await quote.save();
    res.status(201).json(quote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const quotes = await MasterQuote.find();
    res.status(200).json(quotes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByPage = async (req, res) => {
  try {
    const page = req.params.page;
    const quotes = await MasterQuote.find({ page });
    res.status(200).json(quotes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await MasterQuote.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await MasterQuote.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Quote deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
