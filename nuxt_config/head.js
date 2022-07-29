const links = [
  {
    rel: "icon",
    type: "image/x-icon",
    href: "/favicon.ico"
  }
];

// ie进入页面，弹出更新浏览器提示
const scripts = [];

module.exports = {
  head: {
    htmlAttrs: {
      lang: "zh-CN"
    },
    meta: [
      {
        charset: "utf-8"
      },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=device-width/1200,maximum-scale=1.0,user-scalable=0"
      },
      {
        name: "Copyright",
        content: "HELLOZXB"
      }
    ],
    link: links,
    script: scripts
  }
};
