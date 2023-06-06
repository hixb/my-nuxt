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
  { src: `${path}9947/3fb96605d679984043bfbd2cdc1200b8${suffix}`, width: 0, marginRight: 0 },
];
</script>

<template>
  <ul class="flex flex-wrap overflow-hidden">
    <li v-for="(item, index) in images" :key="index" class="relative m-8px h-250px min-w-150px grow-1 overflow-hidden hover:transition-all-300">
      <a href="">
        <img class="h-250px max-w-100% min-w-100% b-rd-10px object-cover object-top vertical-bottom" :src="item.src" alt="">
      </a>
      <div class="content invisible absolute bottom-0 left-0 h-60px w-100% flex items-center justify-center b-rd-10px bg-hex-0008 text-18px font-bold text-hex-fff op0 transition-all-300">
        哈哈哈哈
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
ul {
  &:after {
    content: "";
    flex-grow: 999999999;
  }

  li:hover .content {
    opacity: 1;
    visibility: visible;
  }
}
</style>