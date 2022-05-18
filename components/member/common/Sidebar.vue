<template>
  <div class="sidebar">
    <div class="hidden">
      <vs-sidebar v-model="active" absolute hover-expand reduce open>
        <template #logo>
          <!-- ...img logo -->
        </template>
        <vs-sidebar-item id="home">
          <template #icon>
            <i class="isax isax-dcube"></i>
          </template>
          Home
        </vs-sidebar-item>
        <vs-sidebar-group>
          <template #header>
            <vs-sidebar-item arrow>
              <template #icon>
                <i class="bx bx-group"></i>
              </template>
              Social media
            </vs-sidebar-item>
          </template>

          <vs-sidebar-item id="Instagram">
            <template #icon>
              <i class="bx bxl-instagram"></i>
            </template>
            Instagram
          </vs-sidebar-item>
        </vs-sidebar-group>
        <template #footer>
          <vs-row justify="space-between">
            <vs-avatar badge-color="danger" badge-position="top-right">
              <i class="bx bx-bell"></i>
              <template #badge>
                28
              </template>
            </vs-avatar>

            <vs-avatar>
              <img src="/avatars/avatar-5.png" alt="">
            </vs-avatar>
          </vs-row>
        </template>
      </vs-sidebar>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data () {
    return {
      active: "home"
    };
  }
};
</script>

<style scoped lang="less">

</style>
