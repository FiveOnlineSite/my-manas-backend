const Banner = require("../../models/home/Banner");

exports.createBanner = async (req, res) => {
  try {
    const files = req.files;

    const desktopImage = files.find(file => file.fieldname === "desktop");
    const mobileImage = files.find(file => file.fieldname === "mobile");

    const banner = new Banner({
      title: req.body.title,
      description: req.body.description,
      buttonText: req.body.buttonText,
      buttonLink: req.body.buttonLink,
      images: {
        desktop: {
          url: desktopImage?.path,
          altText: req.body.desktopAlt || ""
        },
        mobile: {
          url: mobileImage?.path,
          altText: req.body.mobileAlt || ""
        }
      }
    });

    await banner.save();
    res.status(201).json(banner);
  } catch (err) {
    console.log("error111",err)
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
    const updated = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
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
