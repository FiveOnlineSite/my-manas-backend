const MasterContact = require("../../models/mastercontact/MasterContact");

exports.create = async (req, res) => {
  try {
    const files = req.files;

    // const { subtitle, title, submitButtonText, imageUrl, altText } = req.body;

    const entry = new MasterContact({
      subtitle: req.body.subtitle,
      title: req.body.title,
      buttonText: req.body.buttonText,
      fullName: req.body.fullName,
      number: req.body.number,
      email: req.body.email,
      inquiryType: req.body.inquiryType,
      message: req.body.message,
      originPage: req.body.originPage,
      image: {
        url: files[0]?.path,
        altText: req.body.imageAltText || "",
      },
    });

    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const entries = await MasterContact.find();
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const {
      subtitle,
      title,
      buttonText,
      fullName,
      number,
      email,
      inquiryType,
      message,
      originPage,
      altText,
    } = req.body;
    const files = req.files;
    const file = files && files.length > 0 ? files[0] : null;

    const updateData = {
      subtitle,
      title,
      buttonText,
      fullName,
      number,
      email,
      inquiryType,
      message,
      originPage,
      altText,
    };

    if (file) {
      updateData.image = {
        url: file.path,
        altText: imageAltText || file.originalname || "",
      };
    }

    const updated = await MasterContact.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await MasterContact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Entry deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
