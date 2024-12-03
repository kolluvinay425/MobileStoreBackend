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
    page = 1, // Default page number is 1
    limit = 10, // Default limit is 10 items per page
  } = req.query;

  let filter = {};

  if (brand) filter.brand = { $regex: brand, $options: "i" }; // Use regex for case-insensitive search
  if (model) {
    const cleanedModel = model.replace(/-/g, " "); // Remove hyphens from the input
    filter.model = { $regex: cleanedModel, $options: "i" }; // Use regex for case-insensitive search
  }

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

  const pageNumber = parseInt(page, 10);
  const pageSize = parseInt(limit, 10);
  const skip = (pageNumber - 1) * pageSize;

  try {
    const mobiles = await Mobile.find(filter).skip(skip).limit(pageSize);
    const totalDocuments = await Mobile.countDocuments(filter);

    const response = {
      products: {
        currentPage: pageNumber,
        pageSize,
        totalPages: Math.ceil(totalDocuments / pageSize),
        totalDocuments,
        data: mobiles,
      },
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
};

export { filterMobiles };
