  require('dotenv').config();
  module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({"src/styles.css": "styles.css"});
  eleventyConfig.addPassthroughCopy({"src/scripts.js": "scripts.js"});
  eleventyConfig.addPassthroughCopy({"src/favicon.svg": "favicon.svg"});
  eleventyConfig.addPassthroughCopy({"src/1000059709.png": "1000059709.png"});  
  eleventyConfig.addPassthroughCopy({"src/images": "images"});
  eleventyConfig.addPassthroughCopy({"src/robots.txt": "robots.txt"});
  eleventyConfig.addPassthroughCopy("admin");
  
  eleventyConfig.addFilter("dutchDate", (dateObj) => {
    const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 
                    'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
    const d = new Date(dateObj);
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  });

  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return new Date(dateObj).toISOString().split('T')[0];
  });

  eleventyConfig.addCollection("artikelen", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/artikelen/*.md").sort((a, b) => {
      return new Date(b.data.datum) - new Date(a.data.datum);
    });
  });

  eleventyConfig.addCollection("opinie", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/artikelen/*.md")
      .filter(item => item.data.categorie === "opinie")
      .sort((a, b) => new Date(b.data.datum) - new Date(a.data.datum));
  });

  eleventyConfig.addCollection("essays", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/artikelen/*.md")
      .filter(item => item.data.categorie === "essay")
      .sort((a, b) => new Date(b.data.datum) - new Date(a.data.datum));
  });

  eleventyConfig.addCollection("columns", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/artikelen/*.md")
      .filter(item => item.data.categorie === "column")
      .sort((a, b) => new Date(b.data.datum) - new Date(a.data.datum));
  });
  
eleventyConfig.addCollection("boeken", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/boeken/*.md");
  
  });  

  eleventyConfig.addCollection("kunst", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/kunst/*.md");
    
  });  
  
  eleventyConfig.addCollection("uitgelicht", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/artikelen/*.md")
      .filter(item => item.data.uitgelicht === true)
      .sort((a, b) => new Date(b.data.datum) - new Date(a.data.datum));
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
