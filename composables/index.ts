/**
 * 主题
 */
export function useTheme() {
  const currentTheme = useState<string>("light-mode", () => "");

  // 设置默认值
  currentTheme.value = "light-mode";

  // 设置主题
  const setTheme = (theme: string) => {
    switch (theme) {
      case "light-mode":
        currentTheme.value = "light-mode";
        break;
      case "dark-mode":
        currentTheme.value = "dark-mode";
        break;
      default:
        currentTheme.value = "dark-mode";
    }
  };
  return {
    currentTheme,
    setTheme
  };
}
