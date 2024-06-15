const paginateResults = (data, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const paginatedData = data.slice(offset, offset + limit);
  return paginatedData;
};

const calculateTotalPages = (totalCount, limit = 10) => {
  return Math.ceil(totalCount / limit);
};

export { paginateResults, calculateTotalPages };
