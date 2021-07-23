const http = require("http");
const fs = require("fs");
// const axios = require("axios");

http
  .createServer((req, res) => {
    const getFile = () => {
      const url =
        "http://inventrade.ru/upload/iblock/eb4/eb4fb522967a294ff36f1837bd60fd76.jpg";
      http.get(url, (result) => {
        res.setHeader(
          "content-disposition",
          "attachment; filename=fqqwfqf" + ".jpg"
        );
        result.pipe(res);
      });
    };
    getFile();
  })
  .listen(3000);
