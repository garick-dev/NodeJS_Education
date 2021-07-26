const express = require("express");

const router = express.Router();

router.get("/:phoneNameReq", (req, res) => {
  const { phoneNameReq } = req.params;

  const phoneList = [
    {
      phoneName: "xiaomi-9a",
      title: "Xiaomi Redmi 9A 2/32GB, зеленый",
      path: "./img/xiaomi-redmi-9a.webp",
      content:
        "Смартфон с большим безрамочным экраном. 6,53-дюймовый дисплей, разрешение которого составляет 2340х1080 пикселей. Основная камера состоит из четырёх модулей. Главный модуль на 13 Мп.",
    },
    {
      phoneName: "iPhone-12",
      title: "iPhone-12 128GB, зеленый",
      path: "./img/iphone-12.webp",
      content:
        "При восстановлении своих продуктов компания Apple производит заводскую проверку устройств, что позволяет точно устранить все возможные неисправности. Также производится замена корпуса и дисплея аппарата, тем самым возвращая ему презентабельный внешний вид. Затем устройству присваивают новый серийный номер, таким образом, избавляя его от какой-либо связи с предыдущими владельцами. Еще одна приятная опция - обновление операционной системы до последней версии на текущий момент. А с учетом того, что восстановленный смартфон упаковывают в новую коробку с новыми наушниками и зарядным устройством, вы получаете все тот же стильный и функционирующий iPhone с полноценной гарантией 1 год.",
    },
  ];

  const findPhone = phoneList.find((val) => val.phoneName === phoneNameReq);

  res.render("index", {
    title: findPhone.title,
    path: findPhone.path,
    content: findPhone.content,
  });
});

module.exports = router;
