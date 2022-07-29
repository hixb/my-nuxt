布局目录
link: go to documentation

Nuxt 提供了一个可定制的布局框架，您可以在整个应用程序中使用，非常适合将常见的 UI 或代码模式提取到可重用的布局组件中。

布局放置在 layouts/ 目录中，使用时将通过异步导入自动加载。layout 通过将属性设置为页面元数据的一部分（如果您正在使用 ~/pages 集成） 或使用 <NuxtLayout> 组件来使用布局。（注意：布局名称标准化为 kebab-case，因此someLayout变为some-layout。）
