const express = require("express");
const router = express.Router();
const multer = require("multer");
const cheerio = require("cheerio");
const Axios = require("axios");

//=================================
//             Ingredient
//=================================

router.post("/ingredients", (req, res) => {
  console.log(req.body);
  const urlInfo = [
    {
      url: "https://www.10000recipe.com/recipe/6884636",
    },
    {
      url: "https://www.10000recipe.com/recipe/6873683",
    },
    {
      url: "https://www.10000recipe.com/recipe/6876357",
    },
    {
      url: "https://www.10000recipe.com/recipe/6859194",
    },
    {
      url: "https://www.10000recipe.com/recipe/6903507",
    },
    {
      url: "https://www.10000recipe.com/recipe/6906655",
    },
    {
      url: "https://www.10000recipe.com/recipe/6912220",
    },
    {
      url: "https://www.10000recipe.com/recipe/6905196",
    },
  ];
  res.status(200).json({ success: true, urlInfo });
});

router.post("/ingredients/url", (req, res) => {
  const getHtml = async (url) => {
    try {
      return await Axios.get(url);
    } catch (error) {
      console.error(error);
    }
  };
  
  let urlList = [];
  urlList = req.body;

 const getInfo = (html, URL) => {
  const newData = {
    url: null,
    title: null,
    images: null,
  };
  newData.url = URL;
  const $ = cheerio.load(html.data);
  const $metaList = $("meta");
  for (let index = 0; index < $metaList.length; index += 1) {
    const element = cheerio($metaList[index]);

    // meta 태그의 content 속성 값 추출
    let content = element.attr("content");

    if (!content || !content.trim()) {
      continue;
    }
    content = content.trim();

    // meta 태그의  property 속성 값 추출
    let propertyAttr = element.attr("property");
    if (propertyAttr) {
      propertyAttr = propertyAttr.toLocaleLowerCase();
    }

    // 추출할 property 에 따라 newsData에 할당
    switch (propertyAttr) {
      case "og:title":
        newData.title = content;
        break;
      case "og:image":
        newData.images = content;
        break;
      default:
        break;
    }
  }
  return newData
 }

  const preInfo = Promise.all(
    urlList.map((idx => {
      var tmpInfo = getHtml(idx).then((html) => {
        var titleAndImage = getInfo(html, idx)
        return titleAndImage
      })
      return tmpInfo
    })
  ))
  
  preInfo.then((value) => {
    return res.status(200).json({ success: true, value });
  })

});

module.exports = router;
