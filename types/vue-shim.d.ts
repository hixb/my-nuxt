import Vue from "vue";

declare module "*.vue" {
  export default Vue;
}

declare module "vue/types/vue" {
  interface Vue {
    $layer: any;
    $loginModel: any;
    $userProtocol: any;
  }
}
