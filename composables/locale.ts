import { useI18n } from "vue-i18n";
import { useNuxtApp } from "#app";
import { LanguageEnum } from "~/types/interface/utils/idb";

/**
 * i18n
 */
export function useLocal() {
  const { locale } = useI18n();

  // 设置首语言
  locale.value = LanguageEnum.EN;

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
          const acceptLanguage = nuxtApp.ssrContext.req.headers["accept-language"] || LanguageEnum.CN;
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
