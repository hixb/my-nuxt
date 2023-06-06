<script lang="ts" setup>
const items = [
  {
    id: 1,
    imageUrl: "https://respic.3d66.com/coverimg/cache/e6e4/d0c4c5fc63b2c92a4bb00e26f5ab1ac0.jpg!list-w-auto-p?v=2286729",
    flexGrow: 1
  },
  {
    id: 2,
    imageUrl: "https://respic.3d66.com/coverimg/cache/0caf/bd062e8c244bc1fd6eb6cffc601b9b61.jpg!list-w-auto-p?v=9302193",
    flexGrow: 1
  },
  {
    id: 3,
    imageUrl: "https://respic.3d66.com/coverimg/cache/9d1f/9127baab1366d15f392c6bc2c66d1a07.jpg!list-w-auto-p?v=8730176",
    flexGrow: 1
  },
  {
    id: 4,
    imageUrl: "https://respic.3d66.com/coverimg/cache/efea/5dd1048af10a6ead0516913429d8028b.jpg!list-w-auto-p?v=2140193",
    flexGrow: 1
  },
  {
    id: 5,
    imageUrl: "https://respic.3d66.com/coverimg/cache/efea/5dd1048af10a6ead0516913429d8028b.jpg!list-w-auto-p?v=2140193",
    flexGrow: 1
  },
  {
    id: 6,
    imageUrl: "https://respic.3d66.com/coverimg/cache/9e12/2e0b2f019f57e8d3249118439ed19786.jpg!list-h-fill-p?v=9768465",
    flexGrow: 1
  },
  {
    id: 7,
    imageUrl: "https://respic.3d66.com/coverimg/cache/c560/9d8684508726306b214126dff3c2c0f8.jpg!list-w-auto-p?v=1942292",
    flexGrow: 1
  },
  {
    id: 8,
    imageUrl: "https://respic.3d66.com/coverimg/cache/f33e/04db62a9a2991760ad2225652f0402d7.jpg!list-w-auto-p?v=8336524",
    flexGrow: 1
  },
  {
    id: 9,
    imageUrl: "https://respic.3d66.com/coverimg/cache/9fde/82c014280dbc0758f15fcc51af7abde8.jpg!list-w-auto-p?v=9527309",
    flexGrow: 1
  },
  {
    id: 10,
    imageUrl: "https://respic.3d66.com/coverimg/cache/12af/98890c396cd61054b63183533e7f86b8.jpg!list-w-auto-p?v=6456750",
    flexGrow: 1
  },
  {
    id: 11,
    imageUrl: "https://respic.3d66.com/coverimg/cache/65c2/f0ab0fdff1756c7a8012f0385a08af4b.jpg!list-w-auto-p?v=9838527",
    flexGrow: 1
  },
  {
    id: 12,
    imageUrl: "https://respic.3d66.com/coverimg/cache/9947/3fb96605d679984043bfbd2cdc1200b8.jpg!list-w-auto-p?v=10310707",
    flexGrow: 1
  },
  {
    id: 10,
    imageUrl: "https://respic.3d66.com/coverimg/cache/12af/98890c396cd61054b63183533e7f86b8.jpg!list-w-auto-p?v=6456750",
    flexGrow: 1
  },
  {
    id: 11,
    imageUrl: "https://respic.3d66.com/coverimg/cache/65c2/f0ab0fdff1756c7a8012f0385a08af4b.jpg!list-w-auto-p?v=9838527",
    flexGrow: 1
  },
  {
    id: 12,
    imageUrl: "https://respic.3d66.com/coverimg/cache/9947/3fb96605d679984043bfbd2cdc1200b8.jpg!list-w-auto-p?v=10310707",
    flexGrow: 1
  },
  {
    id: 1,
    imageUrl: "https://respic.3d66.com/coverimg/cache/e6e4/d0c4c5fc63b2c92a4bb00e26f5ab1ac0.jpg!list-w-auto-p?v=2286729",
    flexGrow: 1
  },
  {
    id: 2,
    imageUrl: "https://respic.3d66.com/coverimg/cache/0caf/bd062e8c244bc1fd6eb6cffc601b9b61.jpg!list-w-auto-p?v=9302193",
    flexGrow: 1
  },
  {
    id: 3,
    imageUrl: "https://respic.3d66.com/coverimg/cache/9d1f/9127baab1366d15f392c6bc2c66d1a07.jpg!list-w-auto-p?v=8730176",
    flexGrow: 1
  },
  {
    id: 4,
    imageUrl: "https://respic.3d66.com/coverimg/cache/efea/5dd1048af10a6ead0516913429d8028b.jpg!list-w-auto-p?v=2140193",
    flexGrow: 1
  },
  {
    id: 5,
    imageUrl: "https://respic.3d66.com/coverimg/cache/efea/5dd1048af10a6ead0516913429d8028b.jpg!list-w-auto-p?v=2140193",
    flexGrow: 1
  },
  {
    id: 6,
    imageUrl: "https://respic.3d66.com/coverimg/cache/9e12/2e0b2f019f57e8d3249118439ed19786.jpg!list-h-fill-p?v=9768465",
    flexGrow: 1
  },
  {
    id: 7,
    imageUrl: "https://respic.3d66.com/coverimg/cache/c560/9d8684508726306b214126dff3c2c0f8.jpg!list-w-auto-p?v=1942292",
    flexGrow: 1
  },
  {
    id: 8,
    imageUrl: "https://respic.3d66.com/coverimg/cache/f33e/04db62a9a2991760ad2225652f0402d7.jpg!list-w-auto-p?v=8336524",
    flexGrow: 1
  },
  {
    id: 9,
    imageUrl: "https://respic.3d66.com/coverimg/cache/9fde/82c014280dbc0758f15fcc51af7abde8.jpg!list-w-auto-p?v=9527309",
    flexGrow: 1
  },
  {
    id: 10,
    imageUrl: "https://respic.3d66.com/coverimg/cache/12af/98890c396cd61054b63183533e7f86b8.jpg!list-w-auto-p?v=6456750",
    flexGrow: 1
  },
  {
    id: 11,
    imageUrl: "https://respic.3d66.com/coverimg/cache/65c2/f0ab0fdff1756c7a8012f0385a08af4b.jpg!list-w-auto-p?v=9838527",
    flexGrow: 1
  },
  {
    id: 12,
    imageUrl: "https://respic.3d66.com/coverimg/cache/9947/3fb96605d679984043bfbd2cdc1200b8.jpg!list-w-auto-p?v=10310707",
    flexGrow: 1
  },
  {
    id: 10,
    imageUrl: "https://respic.3d66.com/coverimg/cache/12af/98890c396cd61054b63183533e7f86b8.jpg!list-w-auto-p?v=6456750",
    flexGrow: 1
  },
  {
    id: 11,
    imageUrl: "https://respic.3d66.com/coverimg/cache/65c2/f0ab0fdff1756c7a8012f0385a08af4b.jpg!list-w-auto-p?v=9838527",
    flexGrow: 1
  },
  {
    id: 12,
    imageUrl: "https://respic.3d66.com/coverimg/cache/9947/3fb96605d679984043bfbd2cdc1200b8.jpg!list-w-auto-p?v=10310707",
    flexGrow: 1
  },
];

const parentElement = ref<HTMLElement | null>(null);
const maxItemsPerRow = 5;
let currentRowWidth = 0;
let currentRowItems = 0;

onMounted(() => {
  adjustLayout();
});

watch(parentElement, () => {
  adjustLayout();
});

function adjustLayout() {
  if (!parentElement.value) return;

  const parentWidth = parentElement.value.clientWidth;
  const targetItemWidth = parentWidth / maxItemsPerRow;

  for (const item of items) {
    const img = new Image();
    img.src = item.imageUrl;

    img.onload = () => {
      const imgWidth = img.width;
      const imgHeight = img.height;

      const itemWidth = Math.min(targetItemWidth, imgWidth);
      const itemHeight = (itemWidth * imgHeight) / imgWidth;

      item.flexGrow = itemWidth / targetItemWidth;

      currentRowWidth += itemWidth;
      currentRowItems++;

      if (currentRowItems === maxItemsPerRow || currentRowWidth >= parentWidth) {
        currentRowWidth = 0;
        currentRowItems = 0;
      }
    };
  }
}
</script>

<template>
  <div ref="parentElement" class="parent">
    <div v-for="item in items" :key="item.id" :style="`flex-grow: ${item.flexGrow}`" class="child">
      <img :src="item.imageUrl" alt="item" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.parent {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  &:after {
    content: '';
    flex-grow: 999999999 !important;
  }
}

.child {
  margin: 5px;
  height: 250px;
  overflow: hidden;
}

img {
  max-width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
