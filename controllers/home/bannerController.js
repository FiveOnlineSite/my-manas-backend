const Banner = require("../../models/home/Banner");

exports.createBanner = async (req, res) => {
  console.log(req.files, req.body, "rifhruhrugh");
  try {
    const files = req.files;
    const desktopImage = files.find(
      (file) => file.fieldname === "desktopImage"
    );
    const mobileImage = files.find((file) => file.fieldname === "mobileImage");

    const banner = new Banner({
      title: req.body.title,
      description: req.body.description,
      buttonText: req.body.buttonText,
      buttonLink: req.body.buttonLink,
      images: {
        desktop: {
          url: desktopImage?.path,
          altText: req.body.desktopAlt || "",
        },
        mobile: {
          url: mobileImage?.path,
          altText: req.body.mobileAlt || "",
        },
      },
    });

    console.log(banner, "bannerbanner");
    await banner.save();
    res.status(201).json(banner);
    console.log(banner, "bannerbanner1");
  } catch (err) {
    console.log("error111", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json(banners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    const files = req.files || [];
    const {
      title,
      description,
      buttonText,
      buttonLink,
      desktopAlt,
      mobileAlt,
    } = req.body;

    const desktopImage = files.find(
      (file) => file.fieldname === "desktopImage"
    );
    const mobileImage = files.find((file) => file.fieldname === "mobileImage");

    const updateData = {
      title,
      description,
      buttonText,
      buttonLink,
    };

    if (desktopImage) {
      updateData["images.desktop"] = {
        url: desktopImage.path,
        altText: desktopAlt || desktopImage.originalname || "",
      };
    }

    if (mobileImage) {
      updateData["images.mobile"] = {
        url: mobileImage.path,
        altText: mobileAlt || mobileImage.originalname || "",
      };
    }

    const updatedBanner = await Banner.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    res.status(200).json(updatedBanner);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Banner deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
