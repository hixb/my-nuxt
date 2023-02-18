import { useI18n } from "vue-i18n";
import { useNuxtApp } from "#app";

/**
 * i18n
 */
export function useLocal() {
  const { locale } = useI18n();

  // 设置首语言
  locale.value = "zh-CN";

  const currentLocale = useCookie("locale", { maxAge: 20 * 365 * 24 * 60 * 60 });

  const setLocale = (l: string) => {
    currentLocale.value = l;

    locale.value = l;
  };

  const setPreferredLanguage = () => {
    if (!currentLocale.value) {
      if (process.server) {
        const nuxtApp = useNuxtApp();

        if (nuxtApp.ssrContext?.req?.headers) {
          const acceptLanguage = nuxtApp.ssrContext.req.headers["accept-language"] || "zh-CN";
          const preferredLanguage = acceptLanguage.split(",")[0];

          setLocale(preferredLanguage);
        }
      }
    } else {
      setLocale(currentLocale.value);
    }
  };

  return {
    setPreferredLanguage,
    setLocale,
    locale
  };
}
