<template>
  <div class="cart-form">
    <label class="cart-form__select">
      <span class="cart-form__label">Получение заказа:</span>

      <BlockSelect
        name="mode"
        v-model="currentMode"
        :options="modes"
        @input="changeAddressByMode"
      />
    </label>

    <BlockInput
      name="phone"
      label="Контактный телефон:"
      big-label
      placeholder="+7 999-999-99-99"
      v-model="currentPhone"
    />

    <div class="cart-form__address" v-if="address">
      <span class="cart-form__label">
        {{ currentMode === "new" ? "Новый адрес" : "Адрес" }}:
      </span>

      <div class="cart-form__input">
        <BlockInput
          name="street"
          label="Улица*"
          :readonly="currentMode !== 'new'"
          required
          v-model="address.street"
          @input="$emit('updateAddress', { street: $event })"
        />
      </div>

      <div class="cart-form__input cart-form__input--small">
        <BlockInput
          name="building"
          label="Дом*"
          :readonly="currentMode !== 'new'"
          required
          v-model="address.building"
          @input="$emit('updateAddress', { building: $event })"
        />
      </div>

      <div class="cart-form__input cart-form__input--small">
        <BlockInput
          name="flat"
          label="Квартира"
          :readonly="currentMode !== 'new'"
          v-model="address.flat"
          @input="$emit('updateAddress', { flat: $event })"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartForm",

  props: {
    addresses: {
      type: Array,
      required: true,
    },

    address: {
      type: Object,
      default: null,
    },

    phone: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      currentMode: this.chooseMode(),
    };
  },

  computed: {
    currentPhone: {
      get() {
        return this.phone;
      },

      set(phone) {
        this.$emit("changePhone", phone);
      },
    },

    modes() {
      return [
        {
          id: "self",
          name: "Заберу сам",
        },
        {
          id: "new",
          name: "Новый адрес",
        },
        ...this.addresses.map(({ id, name }) => ({
          id: `${id}`,
          name,
        })),
      ];
    },
  },

  methods: {
    chooseMode() {
      if (this.address) {
        return `${this.address.id || "new"}`;
      }

      return "self";
    },

    changeAddressByMode() {
      switch (this.currentMode) {
        case "self":
          this.$emit("changeAddress", null);
          break;
        case "new":
          this.$emit("changeAddress", {
            street: "",
            building: "",
            flat: "",
          });
          break;
        default:
          this.$emit(
            "changeAddress",
            this.addresses.find(({ id }) => id === +this.currentMode) || null
          );
      }
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
