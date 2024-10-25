class ApiFeature {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
    console.log("ApiFeature Initialized", { query, queryStr }); // Log the constructor input
  }

  search() {
    const keyword = this.queryStr && this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i", // Case-insensitive
          },
        }
      : {};

    console.log("Search Keyword:", keyword); // Check if the keyword is constructed properly

    this.query = this.query.find({ ...keyword });
    return this; // Ensure method chaining
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    // Fields to exclude from the filter
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    console.log("Filtered Query:", queryCopy); // Log the filtered query

    // Filter by price, rating, etc.
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this; // Ensure method chaining
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = (currentPage - 1) * resultPerPage;

    this.query = this.query.skip(skip).limit(resultPerPage);
    return this; // Ensure method chaining
  }
}

module.exports = ApiFeature;
