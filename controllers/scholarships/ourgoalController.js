const Model = require("../../models/scholarships/OurGoal");


exports.create = async (req, res) => {
  try {
    const { title, description } = req.body;
    const parsedGoals = JSON.parse(req.body.goals || "[]");
    const files = req.files;

    // Get the main image
    const mainImageFile = files.find((file) => file.fieldname === "image");

    // Get goal images (all others not 'image')
    const goalImageFiles = files.filter(
      (file) => file.fieldname === "goalImages"
    );

    // Distribute images evenly among goals (assumes equal order)
    const goalsWithImages = parsedGoals.map((goal, index) => {
      const images = goalImageFiles
        .filter((file, i) => {
          // Assign images based on your preferred logic
          // Here: assume each goal gets one image, sequentially
          return index === i;
        })
        .map((file) => ({
          url: file.path,
          altText: goal.title || file.originalname,
        }));

      return {
        ...goal,
        images, // Attach the mapped image(s)
      };
    });

    const newEntry = new Model({
      title,
      description,
      image: mainImageFile
        ? {
            url: mainImageFile.path,
            altText: mainImageFile.originalname || "",
          }
        : null,
      goals: goalsWithImages,
    });

    await newEntry.save();
    res.status(201).json(newEntry);
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
    const { title, description } = req.body;
    const parsedGoals = JSON.parse(req.body.goals || "[]");
    const files = req.files;

    const existingDoc = await Model.findById(req.params.id);
    if (!existingDoc) {
      return res.status(404).json({ error: "Entry not found" });
    }

    // Identify main image and goal images
    const mainImageFile = files.find((file) => file.fieldname === "image");
    const goalImageFiles = files.filter(
      (file) => file.fieldname === "goalImages"
    );

    // Map goal images to parsed goals
   let fileIndex = 0;

const updatedGoals = parsedGoals.map((goal, index) => {
  const isNewImage = goal.images?.some((img) => img.isNew);

  let updatedImages = [];

  if (isNewImage) {
    const newImageFile = goalImageFiles[fileIndex];
    fileIndex++;

    if (newImageFile) {
      updatedImages.push({
        url: newImageFile.path,
        altText: goal.images?.[0]?.altText || newImageFile.originalname || "",
      });
    }
  } else {
    // Preserve existing images (passed from frontend)
    updatedImages = goal.images || [];
  }

  return {
    title: goal.title,
    description: goal.description,
    images: updatedImages,
  };
});


    const updateData = {
      title,
      description,
      goals: updatedGoals,
      ...(mainImageFile && {
        image: {
          url: mainImageFile.path,
          altText: mainImageFile.originalname || "",
        },
      }),
    };

    const updated = await Model.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.remove = async (req, res) => {
  try {
    await Model.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "OurGoal deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
