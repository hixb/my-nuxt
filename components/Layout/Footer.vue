<script lang="ts" setup>

</script>

<template>
  <footer class="mb20px mt40px flex flex-col b-rd-10px p20px">
    <div class="top-info flex">
      <div class="introduce mr15px">
        <p class="with op50">{{ $t("footer.footer-with") }}</p>
        <div class="design my-10px flex">
          <NuxtImg
            class="b-rd-10px"
            format="webp"
            height="70"
            loading="lazy"
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg-MJfJjegO4N7txAwyFBfNJMEUNLV4aaADlXmR8ZdOspFNqbx2UR2GsRW_g4rtdpAf39rvwooMe1n1IHD_7eP32nKqpkq8tnZ_HwWAhuLVfDWQv045PLMCa_-LXccLUkeiG7dPp7YycZ2nQj2uY2QqeQm-QsbARoQfaj_4EkEl3DrEB3Soc0ZPAO1tUQ/s160-rw-e30/fd_logo.webp"
            width="70"
          ></NuxtImg>
          <div class="des flex flex-col">
            <h2 class="mt5px">{{ $t("footer.footer-design-title") }}</h2>
            <p class="mb5px mt10px">{{ $t("footer.footer-design-des") }}</p>
          </div>
        </div>
        <p class="service op80">{{ $t("footer.footer-server") }}</p>
      </div>
      <div class="link-list">
        <GeneralHeadText bold class="title">{{ $t("footer.footer-my") }}</GeneralHeadText>
        <ul>
          <li class="h25px flex items-center before:block before:h1px before:w10px before:content-empty">
            <NuxtLink
              class="ml5px hover:op60"
              rel="noopener noreferrer"
              target="_blank"
              to="https://github.com/hixb"
            >
              {{ $t("footer.footer-about") }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <ul class="links">
      <li>
        <NuxtLink
          class="text-13px op80"
          rel="noopener noreferrer"
          target="_blank"
          to="https://github.com/"
        >
          GitHub
        </NuxtLink>
      </li>
    </ul>
    <div class="copyright">
      @2022-{{ new Date().getFullYear() }} ·
      <NuxtLink class="notes" to="/">{{ $t("footer.footer-notes") }}</NuxtLink>
      ·
      {{ $t("footer.footer-copyright") }}
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@import "@/assets/css/components/common/footer.scss";
</style>
