import { SET_THEMES, SET_THEME } from "../mutations.type";

export default {
  state: {
    current: "macarons",
    themes: []
  },
  mutations: {
    [SET_THEMES](state, themes) {
      state.themes = themes;
    },
    [SET_THEME](state, theme) {
      state.current = theme;
    }
  }
};
