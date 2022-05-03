<template>
  <div class="cart-form">
    <label class="cart-form__select">
      <span class="cart-form__label">Получение заказа:</span>

      <BlockSelect name="test" v-model="mode" :options="modes" />
    </label>

    <BlockInput
      label="Контактный телефон:"
      bigLabel
      placeholder="+7 999-999-99-99"
      name="tel"
      v-model="tel"
    />

    <div class="cart-form__address" v-if="mode !== 'no'">
      <span class="cart-form__label">Новый адрес:</span>

      <div
        v-for="field of addressFields"
        :key="field.name"
        class="cart-form__input"
        :class="{ 'cart-form__input--small': field.small }"
      >
        <BlockInput
          :label="`${field.label}${field.required ? '*' : ''}`"
          :name="field.name"
          :readonly="mode === 'profile'"
          :required="field.required"
          v-model="field.value"
          @input="changeDelivery({ [field.name]: $event })"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartForm",
  props: {
    delivery: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      modes: {
        no: "Заберу сам",
        new: "Новый адрес",
        profile: "Существующий адрес",
      },
    };
  },
  computed: {
    mode: {
      get() {
        return this.delivery.mode;
      },
      set(mode) {
        this.changeDelivery({ mode });
      },
    },
    tel: {
      get() {
        return this.delivery.tel;
      },
      set(tel) {
        this.changeDelivery({ tel });
      },
    },
    addressFields() {
      return [
        {
          small: false,
          label: "Улица",
          name: "street",
          value: this.delivery.street,
          required: true,
        },
        {
          small: true,
          label: "Дом",
          name: "house",
          value: this.delivery.house,
          required: true,
        },
        {
          small: true,
          label: "Квартира",
          name: "apartment",
          value: this.delivery.apartment,
          required: false,
        },
      ];
    },
  },
  methods: {
    changeDelivery(addition) {
      this.$emit("input", {
        ...this.delivery,
        ...addition,
      });
    },
  },
};
</script>

<style lang="scss">
.cart-form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.cart-form__select {
  display: flex;
  align-items: center;
  margin-right: auto;

  span {
    margin-right: 16px;
  }

  select {
    max-width: 172px;
  }
}

.cart-form__label {
  @include b-s16-h19;

  white-space: nowrap;
}

.cart-form__address {
  display: flex;
  align-items: center;

  width: 100%;
  margin-top: 20px;
}

.cart-form__input {
  flex-grow: 1;

  margin-bottom: 20px;
  margin-left: 16px;

  &--small {
    max-width: 120px;
  }
}
</style>
