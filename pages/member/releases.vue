<template>
  <div class="releases">
    <h3 class="member-title">
      文章发布
    </h3>
    <div class="additional">
      <vs-button @click="dialogVisible = true">
        添加附加项
      </vs-button>
    </div>
    <div class="releases-content">
      <vs-input v-model="from.title" placeholder="标题" />
      <div class="rich-text">
        <div class="editor"></div>
      </div>
      <div class="footer-btn">
        <vs-button dark transparent @click="submitData">
          提交
        </vs-button>
      </div>
    </div>
    <vs-dialog v-model="dialogVisible" width="550px" not-center>
      <template #header>
        <h4 class="not-margin">
          附加项
        </h4>
      </template>
      <div class="con-content">
        <p>
          Vuesax is a relatively new framework with a refreshing design and in the latest trends, vuesax based on
          vuejs
          which means that we go hand in hand with one of the most popular javascript frameworks in the world and
          with a
          huge community with which you will have all the help and documentation to create and make your project
        </p>
      </div>
      <template #footer>
        <vs-button dark transparent @click="dialogVisible = false">
          确定
        </vs-button>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
const Quill = process.server ? "" : require("quill");
import "quill/dist/quill.snow.css";
import api from "@/api/blogs/index";

export default {
  name: "Releases",
  layout: "member",
  data () {
    return {
      from: {
        title: "",
        content: "",
        author: "zhuxb"
      },
      val: "",
      dialogVisible: false,
      quill: null,
      options: {
        theme: "snow",
        modules: {
          toolbar: [
            [ "bold", "italic", "underline", "strike" ],
            [ "blockquote", "code-block" ],
            [ { "header": 1 }, { "header": 2 } ],
            [ { "list": "ordered" }, { "list": "bullet" } ],
            [ { "script": "sub" }, { "script": "super" } ],
            [ { "indent": "-1" }, { "indent": "+1" } ],
            [ { "direction": "rtl" } ],
            [ { "size": [ "small", false, "large", "huge" ] } ],
            [ { "header": [ 1, 2, 3, 4, 5, 6, false ] } ],
            [ { "color": [] }, { "background": [] } ],
            [ { "font": [] } ],
            [ { "align": [] } ],
            [ "clean" ],
            [ "link", "image", "video" ]
          ],
          history: {
            delay: 2000,
            maxStack: 500,
            userOnly: true
          }
        },
        placeholder: "Insert text here ..."
      }
    };
  },
  mounted () {
    let dom = this.$el.querySelector(".editor");
    this.quill = new Quill(dom, this.options);
    this.quill.setContents(this.from.richTextVal);
    this.quill.on("text-change", () => {
      this.$emit("input", this.quill.getContents());
    });
  },
  methods: {
    submitData () {
      if (!this.anExaminationForm()) {
        return;
      }
      this.from.content = this.quill.container.firstChild.innerHTML;

      console.log(this.from);
      api.pushBlogArticle(this.from).then(res => {
        if (res.status === 0) {
          this.$utils.toast("success", "发布成功");
        } else {
          this.$utils.toast("danger", res.message);
        }
      });
    },
    anExaminationForm () {
      if (!this.from.title) {
        this.$utils.toast("danger", "请输入标题");
        return false;
      } else if (!this.from.content) {
        this.$utils.toast("danger", "请输入标题");
        return false;
      }
      return true;
    }
  }
};
</script>

<style scoped lang="less">
.releases {
  .bdr(5px);

  .member-title {
    .area-h(50px);
    .lh(50px);
    .bgc(var(--my-cur-default-theme-bgc));
    .bd-b(1px, solid, var(--my-cur-default-theme-bor-color));
  }

  .additional {
    .mt(20px);
    .pad-1(5px);
  }

  .releases-content {
    .mt(20px);
    .pad-1(5px);

    /deep/ .vs-input {
      .area(100%, 50px);
      .bgc(var(--my-cur-default-theme-bgc));
      .box-s(var(--my-cur-default-theme-shadow));
      .color(var(--my-cur-default-theme-color));
    }

    .rich-text {
      .mt(20px);

      /deep/ .ql-editor {
        .area-h(500px);
      }
    }

    .footer-btn {
      .mt(20px);
      .flex;
      .flex-jus-spa-eve;
    }
  }
}
</style>
