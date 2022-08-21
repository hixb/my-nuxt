import airbnb from "./db";

if (process.client) {
  airbnb.airbnbDB.openStore({
    ...airbnb.languageObjectStore,
    ...airbnb.themeObjectStore
  }).then((res: any) => {
    console.log("%c ✅ Initialized object repository successfully", "color: #41B375;");
  });
}

export default { };
