const Model = require("../../models/academy/Facilities");

// CREATE
// exports.create = async (req, res) => {
//   try {
//     const files = req.files || [];

//     const imageFile = files.find((f) => f.fieldname === "image");
//     const videoFile = files.find((f) => f.fieldname === "video");
//     const featuredImageFile = files.find((f) => f.fieldname === "featuredImage");

//     const moreFeaturedImages = files
//       .filter((f) => f.fieldname.startsWith("moreFeaturedImages["))
//       .map((f) => ({
//         url: f.path,
//         altText: f.originalname || "Additional Image",
//       }));

//     const moreFeaturedVideos = files
//       .filter((f) => f.fieldname.startsWith("moreFeaturedVideos["))
//       .map((f) => ({
//         url: f.path,
//         altText: f.originalname || "Additional Video",
//       }));

//     const doc = new Model({
//       // title: req.body.title,
//        sliderText: req.body.sliderText || "",
//       isFeatured: req.body.isFeatured === "true" || req.body.isFeatured === true,
//       resources: {
//         image: imageFile && {
//           url: imageFile.path,
//           altText: req.body.imageAltText || imageFile.originalname,
//         },
//         video: videoFile && {
//           url: videoFile.path,
//           altText: req.body.videoAltText || videoFile.originalname,
//         },
//         featuredImage: featuredImageFile && {
//           url: featuredImageFile.path,
//           altText: featuredImageFile.originalname || "Featured",
//         },
//         moreFeaturedImages,
//         moreFeaturedVideos,
//       },
//     });

//     await doc.save();
//     res.status(201).json(doc);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

exports.create = async (req, res) => {
  try {
    const files = req.files || [];

    const imageFile = files.find(f => f.fieldname === "image");
    const videoFile = files.find(f => f.fieldname === "video");
    const featuredImageFile = files.find(f => f.fieldname === "featuredImage");
    const featuredVideoThumbnailFile = files.find(f => f.fieldname === "featuredVideoThumbnail");

    // Validation: if video uploaded, featuredVideoThumbnail must be present
    if (videoFile && !featuredVideoThumbnailFile) {
      return res.status(400).json({ error: "Featured video thumbnail is required when video is uploaded." });
    }

    const moreFeaturedImages = files
      .filter(f => f.fieldname.startsWith("moreFeaturedImages["))
      .map(f => ({
        url: f.path,
        altText: f.originalname || "Additional Image",
      }));

    // Handle moreFeaturedVideos (video + thumbnail pair)
    const moreFeaturedVideos = [];
    let i = 0;
    while (true) {
      const videoFile = files.find(f => f.fieldname === `moreFeaturedVideos[${i}][video]`);
      const thumbnailFile = files.find(f => f.fieldname === `moreFeaturedVideos[${i}][thumbnail]`);
      if (!videoFile && !thumbnailFile) break;

      if (videoFile && !thumbnailFile) {
        return res.status(400).json({ error: `Thumbnail missing for More Featured Video ${i + 1}` });
      }

      moreFeaturedVideos.push({
        video: {
          url: videoFile?.path || "",
          altText: videoFile?.originalname || "",
        },
        thumbnail: {
          url: thumbnailFile?.path || "",
          altText: thumbnailFile?.originalname || "",
        }
      });
      i++;
    }

    const doc = new Model({
      sliderText: req.body.sliderText || "",
      isFeatured: req.body.isFeatured === "true" || req.body.isFeatured === true,
      resources: {
        image: imageFile && {
          url: imageFile.path,
          altText: req.body.imageAltText || imageFile.originalname,
        },
        video: videoFile && {
          url: videoFile.path,
          altText: req.body.videoAltText || videoFile.originalname,
        },
        featuredImage: featuredImageFile && {
          url: featuredImageFile.path,
          altText: featuredImageFile.originalname || "Featured",
        },
        featuredVideoThumbnail: featuredVideoThumbnailFile && {
          url: featuredVideoThumbnailFile.path,
          altText: featuredVideoThumbnailFile.originalname || "Featured Video Thumbnail",
        },
        moreFeaturedImages,
        moreFeaturedVideos,
      },
    });

    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// READ ALL
exports.getAll = async (req, res) => {
  try {
    const data = await Model.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
// exports.update = async (req, res) => {
//   try {
//     const files = req.files || [];
//     const existingDoc = await Model.findById(req.params.id);
//     if (!existingDoc) return res.status(404).json({ message: "Facility not found" });

//     // ✅ Parse uploaded files
//     const imageFile = files.find((f) => f.fieldname === "image");
//     const videoFile = files.find((f) => f.fieldname === "video");
//     const featuredImageFile = files.find((f) => f.fieldname === "featuredImage");

//     const moreFeaturedImages = files
//       .filter((f) => f.fieldname.startsWith("moreFeaturedImages["))
//       .map((f) => ({
//         url: f.path,
//         altText: f.originalname || "Additional Image",
//       }));

//     const moreFeaturedVideos = files
//       .filter((f) => f.fieldname.startsWith("moreFeaturedVideos["))
//       .map((f) => ({
//         url: f.path,
//         altText: f.originalname || "Additional Video",
//       }));

//     // ✅ Step 1: Extract removed image/video URLs from body
//     const removedImageUrls = Array.isArray(req.body.removedImages)
//       ? req.body.removedImages
//       : req.body.removedImages
//       ? [req.body.removedImages]
//       : [];

//     const removedVideoUrls = Array.isArray(req.body.removedVideos)
//       ? req.body.removedVideos
//       : req.body.removedVideos
//       ? [req.body.removedVideos]
//       : [];

//     // Optional: normalize URLs to avoid mismatch due to encoding or whitespace
//     const normalizeUrl = (url) => decodeURIComponent(url.trim());

//     // ✅ Step 2: Filter out removed images/videos
//     const existingImages = existingDoc.resources?.moreFeaturedImages || [];
//     const existingVideos = existingDoc.resources?.moreFeaturedVideos || [];

//     const filteredImages = existingImages.filter(
//       (img) => !removedImageUrls.map(normalizeUrl).includes(normalizeUrl(img.url))
//     );

//     const filteredVideos = existingVideos.filter(
//       (vid) => !removedVideoUrls.map(normalizeUrl).includes(normalizeUrl(vid.url))
//     );

//     // ✅ Step 3: Build updated resources
//     const updatedResources = {
//       image: imageFile
//         ? {
//             url: imageFile.path,
//             altText: req.body.imageAltText || imageFile.originalname,
//           }
//         : existingDoc.resources?.image,

//       video: videoFile
//         ? {
//             url: videoFile.path,
//             altText: req.body.videoAltText || videoFile.originalname,
//           }
//         : existingDoc.resources?.video,

//       featuredImage: featuredImageFile
//         ? {
//             url: featuredImageFile.path,
//             altText: featuredImageFile.originalname || "Featured",
//           }
//         : existingDoc.resources?.featuredImage,

//       moreFeaturedImages: [...filteredImages, ...moreFeaturedImages],
//       moreFeaturedVideos: [...filteredVideos, ...moreFeaturedVideos],
//     };

//     // ✅ Step 4: Save updated document
//     const updated = await Model.findByIdAndUpdate(
//       req.params.id,
//       {
//          sliderText: req.body.sliderText || "",
//         // title: req.body.title,
//         isFeatured: req.body.isFeatured === "true" || req.body.isFeatured === true,
//         resources: updatedResources,
//       },
//       { new: true }
//     );

//     res.status(200).json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


exports.update = async (req, res) => {
  try {
    const files = req.files || [];
    const existingDoc = await Model.findById(req.params.id);
    if (!existingDoc) return res.status(404).json({ message: "Facility not found" });

    const imageFile = files.find(f => f.fieldname === "image");
    const videoFile = files.find(f => f.fieldname === "video");
    const featuredImageFile = files.find(f => f.fieldname === "featuredImage");
    const featuredVideoThumbnailFile = files.find(f => f.fieldname === "featuredVideoThumbnail");

    const moreFeaturedImages = files
      .filter(f => f.fieldname.startsWith("moreFeaturedImages["))
      .map(f => ({
        url: f.path,
        altText: f.originalname || "Additional Image",
      }));

    // Handle removed images/videos
    const removedImageUrls = Array.isArray(req.body.removedImages)
      ? req.body.removedImages
      : req.body.removedImages ? [req.body.removedImages] : [];

    const removedVideoUrls = Array.isArray(req.body.removedVideos)
      ? req.body.removedVideos
      : req.body.removedVideos ? [req.body.removedVideos] : [];

    const normalizeUrl = url => decodeURIComponent(url.trim());
    const existingImages = existingDoc.resources?.moreFeaturedImages || [];
    const filteredImages = existingImages.filter(
      img => !removedImageUrls.map(normalizeUrl).includes(normalizeUrl(img.url))
    );

    // Handle moreFeaturedVideos update (append new ones)
    const newMoreFeaturedVideos = [];
    let i = 0;
    while (true) {
      const videoFile = files.find(f => f.fieldname === `moreFeaturedVideos[${i}][video]`);
      const thumbnailFile = files.find(f => f.fieldname === `moreFeaturedVideos[${i}][thumbnail]`);
      if (!videoFile && !thumbnailFile) break;

      if (videoFile && !thumbnailFile) {
        return res.status(400).json({ error: `Thumbnail missing for More Featured Video ${i + 1}` });
      }

      newMoreFeaturedVideos.push({
        video: {
          url: videoFile?.path || "",
          altText: videoFile?.originalname || "",
        },
        thumbnail: {
          url: thumbnailFile?.path || "",
          altText: thumbnailFile?.originalname || "",
        }
      });
      i++;
    }

    if (videoFile && !featuredVideoThumbnailFile && !existingDoc.resources?.featuredVideoThumbnail) {
      return res.status(400).json({ error: "Featured video thumbnail is required when video is uploaded." });
    }

    const updatedResources = {
      image: imageFile
        ? { url: imageFile.path, altText: req.body.imageAltText || imageFile.originalname }
        : existingDoc.resources?.image,

      video: videoFile
        ? { url: videoFile.path, altText: req.body.videoAltText || videoFile.originalname }
        : existingDoc.resources?.video,

      featuredImage: featuredImageFile
        ? { url: featuredImageFile.path, altText: featuredImageFile.originalname || "Featured" }
        : existingDoc.resources?.featuredImage,

      featuredVideoThumbnail: featuredVideoThumbnailFile
        ? { url: featuredVideoThumbnailFile.path, altText: featuredVideoThumbnailFile.originalname || "Featured Video Thumbnail" }
        : existingDoc.resources?.featuredVideoThumbnail,

      moreFeaturedImages: [...filteredImages, ...moreFeaturedImages],
      moreFeaturedVideos: [...(existingDoc.resources?.moreFeaturedVideos || []), ...newMoreFeaturedVideos],
    };

    const updated = await Model.findByIdAndUpdate(
      req.params.id,
      {
        sliderText: req.body.sliderText || "",
        isFeatured: req.body.isFeatured === "true" || req.body.isFeatured === true,
        resources: updatedResources,
      },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// DELETE
exports.remove = async (req, res) => {
  try {
    await Model.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Facility deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
