<script setup lang="ts">
const path = "https://respic.3d66.com/coverimg/cache/";
const suffix = ".jpg!list-w-auto-p?v=2140193";

const images = [
  { src: `${path}e6e4/d0c4c5fc63b2c92a4bb00e26f5ab1ac0${suffix}`, width: 0, marginRight: 0 },
  { src: `${path}0caf/bd062e8c244bc1fd6eb6cffc601b9b61${suffix}`, width: 0, marginRight: 0 },
  { src: `${path}9d1f/9127baab1366d15f392c6bc2c66d1a07${suffix}`, width: 0, marginRight: 0 },
  { src: `${path}efea/5dd1048af10a6ead0516913429d8028b${suffix}`, width: 0, marginRight: 0 },
  { src: `${path}efea/5dd1048af10a6ead0516913429d8028b${suffix}`, width: 0, marginRight: 0 },
  { src: `${path}9e12/2e0b2f019f57e8d3249118439ed19786${suffix}`, width: 0, marginRight: 0 },
  { src: `${path}c560/9d8684508726306b214126dff3c2c0f8${suffix}`, width: 0, marginRight: 0 },
  { src: `${path}f33e/04db62a9a2991760ad2225652f0402d7${suffix}`, width: 0, marginRight: 0 },
  { src: `${path}9fde/82c014280dbc0758f15fcc51af7abde8${suffix}`, width: 0, marginRight: 0 },
  { src: `${path}12af/98890c396cd61054b63183533e7f86b8${suffix}`, width: 0, marginRight: 0 },
  { src: `${path}65c2/f0ab0fdff1756c7a8012f0385a08af4b${suffix}`, width: 0, marginRight: 0 },
  { src: `${path}9947/3fb96605d679984043bfbd2cdc1200b8${suffix}`, width: 0, marginRight: 0 },
  { src: `${path}12af/98890c396cd61054b63183533e7f86b8${suffix}`, width: 0, marginRight: 0 },
  { src: `${path}65c2/f0ab0fdff1756c7a8012f0385a08af4b${suffix}`, width: 0, marginRight: 0 },
  { src: `${path}9947/3fb96605d679984043bfbd2cdc1200b8${suffix}`, width: 0, marginRight: 0 }
];

const containerWidth = 800; // 主容器的宽度
const rowHeight = 200; // 基准行高
const margin = 10; // 图片横向之间的间距

onMounted(() => {
  const container = document.querySelector(".container");
  if (!container) return;

  let currentRowWidth = 0;
  let currentRowImages = [];

  for (let i = 0; i < images.length; i++) {
    const item = images[i];
    const img = new Image();
    img.src = item.src;

    img.onload = () => {
      const imgWidth = img.width;
      const imgHeight = img.height;
      const imgAspectRatio = imgWidth / imgHeight;

      const targetWidth = rowHeight * imgAspectRatio;
      const targetMarginRight = margin;

      if (currentRowWidth + targetWidth + targetMarginRight > containerWidth) {
        adjustRowImagesWidth(currentRowImages, containerWidth, currentRowWidth, margin);
        currentRowImages = [];
        currentRowWidth = 0;
      }

      item.width = targetWidth;
      item.marginRight = targetMarginRight;
      currentRowImages.push(item);
      currentRowWidth += targetWidth + targetMarginRight;

      if (i === images.length - 1) {
        adjustRowImagesWidth(currentRowImages, containerWidth, currentRowWidth, margin);
      }
    };
  }
});

function adjustRowImagesWidth(images, containerWidth, rowWidth, margin) {
  const totalMargin = (images.length - 1) * margin;
  const widthRatio = (containerWidth - totalMargin) / rowWidth;

  let accumulatedWidth = 0;

  for (let i = 0; i < images.length; i++) {
    const image = images[i];

    image.width = Math.floor(image.width * widthRatio);

    if (i < images.length - 1) {
      accumulatedWidth += image.width;
    }
  }

  const lastImage = images[images.length - 1];
  lastImage.width = containerWidth - accumulatedWidth;
}
</script>

<template>
  <ul class="container">
    <li v-for="(item, index) in images" :key="index" :style="{ height: rowHeight + 'px', width: item.width + 'px', marginRight: item.marginRight + 'px' }">
      <img :src="item.src" alt="">
    </li>
  </ul>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  list-style: none;
  padding: 0;
  margin: 0 auto;
}

.container li {
  margin-bottom: 10px;
}

.container li img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>
