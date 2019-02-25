const isProduction = process.env.NODE_ENV === "production" && true;

module.exports = {
  plugins: isProduction ? [require("autoprefixer"), require("cssnano")] : []
};
