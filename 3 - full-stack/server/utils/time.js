const formatDate = (isoDateString) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Date(isoDateString).toLocaleDateString(undefined, options);
};

module.exports = { formatDate };
