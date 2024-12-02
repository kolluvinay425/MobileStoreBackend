import Mobile from "../models/mobile.js";

// Advanced filtering route
const filterMobiles = async (req, res) => {
  const {
    brand,
    model,
    minPrice,
    maxPrice,
    color,
    ram,
    storage,
    battery,
    screenSize,
    operatingSystem,
    releaseDate,
    specs,
  } = req.query;

  let filter = {};

  if (brand) filter.brand = brand;
  if (model) filter.model = model;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
  }
  if (color) filter.color = color;
  if (ram) filter.ram = { $in: ram.split(",") };
  if (storage) filter.storage = { $in: storage.split(",") };
  if (battery) filter.battery = { $in: battery.split(",") };
  if (screenSize) filter.screenSize = { $in: screenSize.split(",") };
  if (operatingSystem)
    filter.operatingSystem = { $in: operatingSystem.split(",") };
  if (releaseDate) filter.releaseDate = { $in: releaseDate.split(",") };
  if (specs) {
    const specsArray = specs.split(",");
    specsArray.forEach((spec) => {
      const [key, value] = spec.split(":");
      if (!filter.specs) filter.specs = {};
      filter.specs[key] = value;
    });
  }
  console.log("filter---->", filter);
  try {
    const mobiles = await Mobile.find(filter);
    res.json(mobiles);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
};

export { filterMobiles };
