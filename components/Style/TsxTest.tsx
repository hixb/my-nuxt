import { GeneralButton } from "#components";
import { defineEmits } from "vue";

interface TsxTestProps {
  isOpenCallback?: boolean;
  callback?: () => void;
  message: string;
}

const TsxTest = defineComponent({
  props: {
    isOpenCallback: Boolean,
    callback: {
      type: Function,
      default: undefined
    },
    message: {
      type: String,
      default: "",
      require: true
    }
  },
  emits: defineEmits<{
    jumpEvent: (data: string) => void
  }>(),
  setup(props: TsxTestProps & any, ctx) {
    function jump() {
      ctx.emit("jumpEvent", "jump");
    }

    return () => (
      <>
        <div
          class="text-30"
        >
          <span onClick={() => props.isOpenCallback && props.callback}></span>
          <GeneralButton onClick={() => jump()}>TsxTest</GeneralButton>
        </div>
      </>
    );
  }
});

export default TsxTest;
