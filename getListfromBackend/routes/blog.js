const express = require("express");

const router = express.Router();

const blogList = [
  {
    id: "page-1",
    content: "Статья 1",
  },
  {
    id: "page-2",
    content: "Статья 2",
  },
  {
    id: "page-3",
    content: "Статья 3",
  },
];

router.get("/list", (req, res) => {
  const globalList = blogList.map((val) => {
    return { id: val.id, content: val.content };
  });
  setTimeout(() => {
    res.json({
      status: "ok",
      result: { globalList },
    });
  }, 3000);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const findBlogList = blogList.find((val) => val.id === id);

  if (!findBlogList) {
    res.json({
      status: "not found",
    });
    return;
  } else {
    res.json({
      status: "ok",
      result: { findList: findBlogList },
    });
  }
});

module.exports = router;
