const Model = require("../../models/academy/Achievements");

// CREATE Achievements (multiple items)
exports.create = async (req, res) => {
  try {
    const { title } = req.body;
    const parsedItems = JSON.parse(req.body.items);
    const files = req.files;
    console.log(parsedItems, files, "console4343434");
    const updatedItems = parsedItems.map((item, index) => ({
      title: item.title,
      description: item.description,
      image: {
        url: files[index]?.path || "",
        altText: item.image.altText || "",
      },
    }));

    const doc = new Model({ title, items: updatedItems });
    await doc.save();
    res.status(201).json({ success: true, data: doc });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET all Achievements
exports.getAll = async (req, res) => {
  try {
    const data = await Model.find();
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// UPDATE Achievements document (and all items)
exports.update = async (req, res) => {
  try {
    const { title, items } = req.body;
    const parsedItems = JSON.parse(items);
    const files = req.files || [];
        let fileIndex = 0;


    const updatedItems = parsedItems.map((item, index) => {
       let imageUrl = item.image?.url || "";
         if (item.hasNewImage && files[fileIndex]) {
        imageUrl = files[fileIndex].path;
        fileIndex++;
      }
      // const file = files[index];
      return {
        title: item.title,
        description: item.description,
        image: {
           url: imageUrl,
          altText: item.altText || "",
        },
      };
    });

    const updatedDoc = await Model.findByIdAndUpdate(
      req.params.id,
      { title, items: updatedItems },
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedDoc });
  } catch (err) {
    console.error("UPDATE ERROR:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE Achievement
exports.remove = async (req, res) => {
  try {
    await Model.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Achievement deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
