import { SET_THEMES, SET_THEME, SET_THEME_COLORS } from "../mutations.type";

export default {
  state: {
    current: "macarons",
    themes: [],
    colors: {}
  },
  getters: {
    currentColor(state) {
      return state.colors[state.current];
    }
  },
  mutations: {
    [SET_THEMES](state, themes) {
      state.themes = themes;
    },
    [SET_THEME](state, theme) {
      state.current = theme;
    },
    [SET_THEME_COLORS](state, colors) {
      state.colors = colors;
    }
  }
};
