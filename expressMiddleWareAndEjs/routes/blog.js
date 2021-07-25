const express = require("express");

const router = express.Router();

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const blogContent = [
    {
      id: "first",
      title: "firstTitle",
      content: "firstContent",
    },
    {
      id: "second",
      title: "secondTitle",
      content: "secondContent",
    },
  ];

  const findBlogContent = blogContent.find((val) => val.id === id);

  //   console.log(title);
  const { title } = findBlogContent;
  const { content } = findBlogContent;
  res.render("index", { title, content });
});

module.exports = router;
