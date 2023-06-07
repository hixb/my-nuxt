<script setup lang="ts">
declare const gsap: any;

useHead({
  script: [
    {
      src: "https://cdn.jsdelivr.net/npm/gsap@3.12.0/dist/gsap.min.js",
      tagPosition: "head"
    }
  ]
});

const mainBoxes = ref<HTMLElement | null>(null);
const scrollBox = ref<HTMLElement | null>(null);

onMounted(() => {
  let currentImg = undefined,
    currentImgProps = { x: 0, y: 0 },
    isZooming = false,
    column = -1,
    mouse = { x: 0, y: 0 },
    delayedPlay;

  for (let i = 0; i < 12; i++) {
    if (i % 4 == 0) column++;

    const b = document.createElement("div");
    mainBoxes.value?.append(b);

    gsap.set(b, {
      attr: { id: "b" + i, class: "photoBox pb-col" + column },
      backgroundImage: "url(https://assets.codepen.io/721952/" + i + ".jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      overflow: "hidden",
      x: [60, 280, 500][column],
      width: 400,
      height: 640,
      borderRadius: 20,
      scale: 0.5,
      zIndex: 100
    });

    b.tl = gsap.timeline({ paused: true, repeat: -1 })
      .fromTo(b, { y: [-575, 800, 800][column], rotation: -0.05 }, {
        duration: [40, 35, 26][column],
        y: [800, -575, -575][column],
        rotation: 0.05,
        ease: "none"
      })
      .progress(i % 4 / 4);
  }

  const _tl = gsap.timeline({ onStart: playBoxes })
    .set(".scroll-box", { perspective: 800 })
    .set(".photoBox", { opacity: 1, cursor: "pointer" })
    .set(".mainBoxes", { left: "75%", xPercent: -50, width: 1200, rotationX: 14, rotationY: -15, rotationZ: 10 })
    .fromTo(".scroll-box", { autoAlpha: 0 }, { duration: 0.6, ease: "power2.inOut", autoAlpha: 1 }, 0.2);

  const photoBox = document.querySelectorAll(".photoBox");

  photoBox.forEach(item => {
    item.addEventListener("mouseenter", function(e) {
      if (currentImg) return;
      if (delayedPlay) delayedPlay.kill();
      pauseBoxes(e.currentTarget);
      const _t = e.currentTarget;
      gsap.to(".photoBox", {
        duration: 0.2, overwrite: "auto", opacity: function(i, t) {
          return (t == _t) ? 1 : 0.33;
        }
      });
      gsap.fromTo(_t, { zIndex: 100 }, { duration: 0.2, scale: 0.62, overwrite: "auto", ease: "power3" });
    });

    item.addEventListener("mouseleave", function(e) {
      if (currentImg) return;
      const _t = e.currentTarget;

      if (gsap.getProperty(_t, "scale") > 0.62) delayedPlay = gsap.delayedCall(0.3, playBoxes); // to avoid jump, add delay when mouseout occurs as big image scales back down (not 100% reliable because the scale value sometimes evaluates too late)
      else playBoxes();

      gsap.timeline()
        .set(_t, { zIndex: 1 })
        .to(_t, { duration: 0.3, scale: 0.5, overwrite: "auto", ease: "expo" }, 0)
        .to(".photoBox", { duration: 0.5, opacity: 1, ease: "power2.inOut" }, 0);
    });

    item.addEventListener("click", function(e) {
      if (!isZooming) { //only tween if photoBox isn't currently zooming

        isZooming = true;
        gsap.delayedCall(0.8, function() {
          isZooming = false;
        });
        if (currentImg) {
          gsap.timeline({ defaults: { ease: "expo.inOut" } })
            .to(".mainBoxes", {
              duration: 0.5,
              scale: 1,
              left: "75%",
              width: 1200,
              rotationX: 14,
              rotationY: -15,
              rotationZ: 10,
              overwrite: true
            }, 0)
            .to(".photoBox", { duration: 0.6, opacity: 1, ease: "power4.inOut" }, 0)
            .to(currentImg, {
              duration: 0.6,
              width: 400,
              height: 640,
              borderRadius: 20,
              x: currentImgProps.x,
              y: currentImgProps.y,
              scale: 0.5,
              rotation: 0,
              zIndex: 1
            }, 0).add(playBoxes, 0.8);
          // .add(playBoxes, 0.8)
          currentImg = undefined;
        } else {
          pauseBoxes(e.currentTarget);

          currentImg = e.currentTarget;
          currentImgProps.x = gsap.getProperty(currentImg, "x");
          currentImgProps.y = gsap.getProperty(currentImg, "y");

          gsap.timeline({ defaults: { duration: 0.6, ease: "expo.inOut" } })
            .set(currentImg, { zIndex: 100 })
            .to(".photoBox", { opacity: 0 }, 0)
            .to(currentImg, {
              width: "100%",
              height: "100%",
              borderRadius: 0,
              x: 0,
              top: 0,
              y: 0,
              scale: 1,
              opacity: 1
            }, 0)
            .to(".mainBoxes", {
              duration: 0.5,
              left: "50%",
              width: "100%",
              rotationX: 0,
              rotationY: 0,
              rotationZ: 0
            }, 0.15)
            .to(".mainBoxes", { duration: 5, scale: 1.06, rotation: 0.05, ease: "none" }, 0.65);
        }
      }
    });
  });

  if ("ontouchstart" in window) {
    console.log("touch device!");
    mouse.x = window.innerWidth - 50;
    mouse.y = 60;
  } else {
    scrollBox.value?.addEventListener("mousemove", function(e) {
      mouse.x = e.x;
      mouse.y = e.layerY;
    });
  }
});

function pauseBoxes(b) {
  let classStr = "pb-col0";
  if (b?.classList.contains("pb-col1")) classStr = "pb-col1";
  if (b?.classList.contains("pb-col2")) classStr = "pb-col2";
  for (let i = 0; i < mainBoxes.value?.children.length; i++) {
    const b: Element | undefined = mainBoxes.value?.children[i];
    if (b?.classList.contains(classStr))
      gsap.to(b.tl, { timeScale: 0, ease: "sine" });
  }
}

function playBoxes() {
  for (let i = 0; i < mainBoxes.value?.children.length; i++) {
    let tl = mainBoxes.value?.children[i].tl;
    tl.play();
    gsap.to(tl, { duration: 0.4, timeScale: 1, ease: "sine.in", overwrite: true });
  }
}
</script>

<template>
  <div class="relative mx-auto my-0 h-880px w-1980px">
    <div ref="scrollBox" :class="['scroll-box absolute z-100 max-h880px overflow-hidden']">
      <div ref="mainBoxes" class="mainBoxes fs"></div>
    </div>
    <div class="absolute left-300px top-50% z-111 translate-y--50%">
      <h2 class="text-30px text-hex-fff">
        <span class="text-100px">AI</span>
        快速出图
      </h2>
      <h3 class="mt-20px text-25px text-hex-fff">让你的创作不在局限于技能</h3>
    </div>
  </div>
</template>

<style lang="scss">
.scroll-box {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .2);
  position: absolute;
  overflow: hidden;

  div {
    width: 100%;
    height: 100%;
    position: absolute;
  }
}
</style>