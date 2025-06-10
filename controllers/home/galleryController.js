const Gallery = require("../../models/home/Gallery");

exports.createGalleryItem = async (req, res) => {
  try {
    const files = req.files;
    console.log(files, req.body, "rifhruhrugh");

    console.log(req.body, "consolreeee");
    const gallery = new Gallery({
      // type: req.body.type,

      url: files[0]?.path,
      url2: files[1]?.path,
      altText: req.body.altText || "",
    });
    await gallery.save();
    res.status(201).json(gallery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllGalleryItems = async (req, res) => {
  try {
    const items = await Gallery.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateGalleryItem = async (req, res) => {
  try {
    const files = req.files;
    const file = files && files.length > 0 ? files[0] : null;
    const { altText } = req.body;
  let file1 = null;
    let file2 = null;

      for (const f of files) {
      if (f.fieldname === "file") {
        file1 = f;
      } else if (f.fieldname === "file2") {
        file2 = f;
      }
    }

    const updateData = {};

    if (file1) {
      updateData.url = file1.path;
    }

    if (file2) {
      updateData.url2 = file2.path;
    }

    if (altText !== undefined) {
      updateData.altText = altText;
    }

    const updated = await Gallery.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteGalleryItem = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Gallery item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
