const Model = require("../../models/donate/Achievements");

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
        url: files[index]?.path || "", // Or .location, depending on your upload strategy
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
    const { title, items } = req.body;
    const parsedItems = JSON.parse(items);
    const files = req.files || [];

    let fileIndex = 0;

    const updatedItems = parsedItems.map((item) => {
      let image = item.image || {};

      if (item.hasNewImage === "true" || item.hasNewImage === true) {
        const file = files[fileIndex];
        if (file) {
          image = {
            url: file.path,
            altText: item.image?.altText || file?.originalname || "",
          };
          fileIndex++;
        }
      }

      return {
        title: item.title,
        description: item.description,
        image,
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


exports.remove = async (req, res) => {
  try {
    await Model.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Achievements deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
