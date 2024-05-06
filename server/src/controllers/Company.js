import Company from "./../models/Company.js";

export const getCompany = async (req, res) => {
  try {
    const { value } = req.query;
    const page = req.query.page || 1;
    const limit = req.query.limit || 25;

    const options = {
      skip: (page - 1) * limit,
      limit: limit,
    };

    if (limit > 100) {
      throw new Error("Limit must be less than or equal to 100");
    }

    const query = value ? { name: { $regex: value, $options: "i" } } : {};

    const companies = await Company.find(query)
      .skip(options.skip)
      .limit(options.limit);

    const totalDocuments = await Company.countDocuments(query);
    const totalPages = Math.ceil(totalDocuments / limit);
    const currentPage = parseInt(page);
    const size = companies.length;

    res.status(200).json({
      totalDocuments,
      items: companies,
      totalPages,
      currentPage,
      size,
    });
  } catch (error) {
    console.log(error)
    res.status(400).json(error);
  }
};
