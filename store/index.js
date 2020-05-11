import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
  currentArticle: null,
  currentArticlesList: []
})
export const getters = {
  getArticleBySlug: (state) => (slug) => {
    return state.currentArticlesList.find((article) => article.slug === slug)
  }
}
export const mutations = {
  SET_CURRENT_ARTICLE(state, article) {
    state.currentArticle = article
  },
  SET_CURRENT_ARTICLES_LIST(state, payload) {
    state.currentArticlesList.push(payload)
  }
}
