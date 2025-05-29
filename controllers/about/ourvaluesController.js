const OurValues = require("../../models/about/OurValues");

exports.createValues = async (req, res) => {
  try {
    const files = req.files; // Array of icons
    const parsedValues = JSON.parse(req.body.values); // [{ title, description }]

    // Match each file to each value
    const valuesWithIcons = parsedValues.map((val, index) => {
      const iconFile = files[index]; // Assume icons are in order
      return {
        ...val,
        icon: iconFile
          ? {
              url: iconFile.path,
              altText: val.iconAltText || "",
            }
          : null,
      };
    });

    const values = new OurValues({
      title: req.body.title,
      description: req.body.description,
      values: valuesWithIcons,
    });

    await values.save();
    res.status(201).json(values);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getValues = async (req, res) => {
  try {
    const data = await OurValues.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateValues = async (req, res) => {
  try {
    const files = req.files || [];
    const parsedValues = JSON.parse(req.body.values || "[]");

    // Fetch existing data to retain existing icons if no new ones are uploaded
    const existingDoc = await OurValues.findById(req.params.id);
    if (!existingDoc) {
      return res.status(404).json({ error: "Document not found" });
    }

    const updatedValues = parsedValues.map((val, index) => {
      const file = files[index];

      // If new icon is provided, use it. Otherwise, fallback to existing icon.
      const existingIcon = existingDoc.values[index]?.icon || {};

      return {
        ...val,
        icon: file
          ? {
              url: file.path,
              altText: val.iconAltText || file.originalname || "Icon",
            }
          : existingIcon,
      };
    });

    const updatePayload = {
      title: req.body.title,
      description: req.body.description,
      values: updatedValues,
    };

    const updated = await OurValues.findByIdAndUpdate(
      req.params.id,
      updatePayload,
      {
        new: true,
      }
    );

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.deleteValues = async (req, res) => {
  try {
    await OurValues.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Our Values deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
