const Model = require("../../models/vidhyavanam/LeadershipTeam");

exports.create = async (req, res) => {
  try {
    const files = req.files || [];
    const members = JSON.parse(req.body.members || "[]");

    const formattedMembers = members.map((member, index) => {
      const imageFile = files[index];
      return {
        name: member.name,
        description: member.description,
        image: imageFile
          ? {
              url: imageFile.path,
              altText: member.altText || imageFile.originalname || "Image",
            }
          : {
              url: "",
              altText: member.altText || "",
            },
      };
    });

    const doc = new Model({ members: formattedMembers });
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const data = await Model.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const files = req.files || [];
    const members = JSON.parse(req.body.members || "[]");

    let fileIndex = 0;

    const formattedMembers = members.map((member) => {
      const imageFile = member.hasNewImage ? files[fileIndex++] : null;

      return {
        name: member.name,
        description: member.description,
        image: imageFile
          ? {
              url: imageFile.path,
              altText: member.altText || imageFile.originalname || "Image",
            }
          : member.image || {
              url: "",
              altText: member.altText || "",
            },
      };
    });

    const updated = await Model.findByIdAndUpdate(
      req.params.id,
      { members: formattedMembers },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.remove = async (req, res) => {
  try {
    await Model.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "LeadershipTeam deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
