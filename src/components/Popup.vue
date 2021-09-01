<template>
  <div class="popup">
    <button
      class="popup__modal-open"
      v-if="!isPopupShowing"
      @click="handleIsPopupShowing"
      >
      Налоговый вычет
    </button>
    <div class="popup__body" ref="popup" v-show="isPopupShowing">
      <div class="popup__rect-close" @click="handleIsPopupShowing(), popupClose()" />
      <p class="popup__body-title">
        Налоговый вычет
      </p>
      <p class="popup__body-subtitle">Используйте налоговый вычет чтобы погасить ипотеку досрочно. Размер налогового вычета составляетне более 13% от своего официального годового дохода.
      </p>
      <p class="popup__body-b-mark">
        Ваша зарплата в месяц
      </p>
      <div>
        <input
          v-model.lazy="salary"
          v-money="money"
          class="popup__body-salary-input"
          :class="{error: inputIsEmpty}"
          placeholder="Ваши данные"
          />
          <label v-if="inputIsEmpty" class="popup__body-input-is-empty">Поле обязательно для заполнения</label>
      </div>
      <button
        class="popup__body-btn-subinput"
        @click="calculateSum"
        :disabled="inputIsEmpty"
        >
        Рассчитать
      </button>
      <section v-if="isCalculatedSum">
        <p class="popup__body-b-mark">
        Итого можете внести в качестве досрочных:
        </p>
        <div v-for="(field, i) in 3" :key="i">
          <fieldset style="margin: 0 0 16px;">
          <input :id="'checkbox-' + (i + 1)" type="checkbox"/>
          <label :for="'checkbox-' + (i + 1)">
            <span style="font-weight: 500;">{{calculatedSum}} рублей</span> в {{i}}-й год</label>
          </fieldset>
          <hr style="margin: 0 0 16px;">
        </div>
        <div v-if="balanceAmount >= 0">
          <fieldset style="margin: 0 0 16px;">
            <input id="checkbox-4" type="checkbox"/>
            <label for="checkbox-4"><span style="font-weight: 500;">{{balanceAmount}} рублей</span> в 4-й год</label>
          </fieldset>
          <hr>
        </div>
      </section>

      <div class="popup__body-footer">
        <p class="popup__body-b-mark">
          Что уменьшаем?
        </p>
        <div class="popup__body-radio-btns">
          <label><input type="radio" name="select" value="payment" v-model="result.type" /><span>Платёж</span></label>
          <label style="margin: 0 0 0 28px;"><input type="radio" value="date" name="select" v-model="result.type" /><span>Срок</span></label>
        </div>
      </div>
      <button
        class="popup__body-add-btn"
        @click="showResult"
        :disabled="!isCalculatedSum"
        :class="{disabled: !isCalculatedSum}"
        >
        Добавить
      </button>
    </div>
  </div>
</template>

<script>
import {VMoney} from 'v-money'
export default {
  name: 'HelloWorld',
  directives: {money: VMoney},
  data: () => ({
    salary: null,
    isCalculatedSum: false,
    money: {
      decimal: ',',
      thousands: ' ',
      suffix: ' ₽',
      precision: 2,
      masked: false
    },
    result: {
      fsum: null,
      ssum: null,
      type: null
    }
  }),
  computed: {
    isPopupShowing() {
      return this.$store.getters['ISPOPUPSHOWING']
    },
    calculatedSum() {
      return this.$store.getters['ISCALCULATEDSUM']
    },
    balanceAmount() {
      return (260000 - (+this.calculatedSum * 3)).toFixed(2)
    },
    inputIsEmpty() {
      if (this.salary) {
        return this.salary.match(/^[0]/gm)
      }
    }
  },
  watch: {
    balanceAmount() {
      if (this.balanceAmount) {
        this.result.fsum = +this.calculatedSum
        this.result.ssum = +this.balanceAmount
      }
    }
  },
  methods: {
    handleIsPopupShowing() {
      this.$refs.popup.classList.remove('popupClose')
      this.$refs.popup.classList.add('popupShow')
      this.$store.commit('setIsPopupShowing')
    },
    calculateSum() {
      this.isCalculatedSum = true
      this.$store.commit('setCalculatedSum', this.salary)
    },
    popupClose() {
      this.$refs.popup.classList.remove('popupShow')
      this.$refs.popup.classList.add('popupClose')
    },
    showResult() {
      console.log(this.result)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
