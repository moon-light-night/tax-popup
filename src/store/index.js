import { createStore } from 'vuex'

export default createStore({
  state: {
    isPopupShowing: false,
    calculatedSum: null
  },
  actions: {
  },
  mutations: {
    setIsPopupShowing(state) {
      state.isPopupShowing = !state.isPopupShowing
    },
    setCalculatedSum(state, sum) {
      state.calculatedSum = +((+(sum.replace(/[,]/gm, '.').replace(/[ ₽]/gm, '')) * 12) * 0.13).toFixed(2)
    }
  },
  getters: {
    ISPOPUPSHOWING: state => state.isPopupShowing,
    ISCALCULATEDSUM: state => state.calculatedSum
  }
})
