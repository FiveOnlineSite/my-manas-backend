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
    const { id } = req.params;
    const { page: newPage, ...rest } = req.body;

    // Find the current document by ID
    const currentDoc = await MasterQuote.findById(id);
    if (!currentDoc) {
      return res.status(404).json({ error: "Quote not found" });
    }

    // Check if page has changed
    if (newPage && newPage !== currentDoc.page) {
      // Find the document with the new page value
      const targetDoc = await MasterQuote.findOne({ page: newPage });

      if (targetDoc) {
        // Swap the page values
        await MasterQuote.findByIdAndUpdate(targetDoc._id, { page: currentDoc.page });
      }

      // Update current document with new page
      currentDoc.page = newPage;
    }

    // Update other fields
    Object.assign(currentDoc, rest);
    const updated = await currentDoc.save();

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update error:", err);
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
