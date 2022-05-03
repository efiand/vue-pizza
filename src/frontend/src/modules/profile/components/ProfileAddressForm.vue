<template>
  <BlockSheet class="address-form" :class="{ 'address-form--opened': edited }">
    <div class="address-form__header">
      <b>
        Адрес №{{ index
        }}{{ edited || !currentAddress.name ? "" : `. ${currentAddress.name}` }}
      </b>

      <div v-if="!edited" class="address-form__edit">
        <BlockEditButton @click="edited = true">
          Изменить адрес
        </BlockEditButton>
      </div>
    </div>

    <template v-if="edited">
      <div class="address-form__wrapper">
        <div class="address-form__input">
          <BlockInput
            label="Название адреса*"
            name="addr-name"
            placeholder="Введите название адреса"
            required
            v-model="currentAddress.name"
          />
        </div>
        <div class="address-form__input address-form__input--size--normal">
          <BlockInput
            label="Улица*"
            name="addr-street"
            placeholder="Введите название улицы"
            required
            v-model="currentAddress.street"
          />
        </div>
        <div class="address-form__input address-form__input--size--small">
          <BlockInput
            label="Дом*"
            name="addr-house"
            placeholder="Введите номер дома"
            required
            v-model="currentAddress.house"
          />
        </div>
        <div class="address-form__input address-form__input--size--small">
          <BlockInput
            label="Квартира"
            name="addr-apartment"
            placeholder="Введите № квартиры"
            v-model="currentAddress.apartment"
          />
        </div>
        <div class="address-form__input">
          <BlockInput
            label="Комментарий"
            name="addr-comment"
            placeholder="Введите комментарий"
            v-model="currentAddress.comment"
          />
        </div>
      </div>

      <div class="address-form__buttons">
        <BlockButton transparent @click="$emit('delete')">
          Удалить
        </BlockButton>
        <BlockButton :disabled="disabled" @click="changeHandler">
          Сохранить
        </BlockButton>
      </div>
    </template>
    <template v-else>
      <p>{{ formattedAddress }}</p>
      <span v-if="currentAddress.comment">{{ currentAddress.comment }}</span>
    </template>
  </BlockSheet>
</template>

<script>
import { formatAddress } from "@/modules/profile/helpers";

export default {
  name: "ProfileAddressForm",
  props: {
    address: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      edited: this.address.template,
    };
  },
  computed: {
    currentAddress() {
      return this.address;
    },
    formattedAddress() {
      return formatAddress(this.currentAddress);
    },
    disabled() {
      const { name, street, house } = this.currentAddress;
      return !name || !street || !house;
    },
  },
  methods: {
    changeHandler() {
      this.edited = false;
      this.$emit("change");
    },
  },
};
</script>

<style lang="scss">
.address-form {
  $bl: &;

  position: relative;

  padding-top: 0;
  padding-bottom: 26px;

  &--opened {
    #{$bl}__header {
      padding-top: 18px;
      padding-bottom: 18px;
    }
  }

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
    padding: 0 16px;
  }

  small {
    @include l-s11-h13;

    display: block;

    padding: 0 16px;
  }
}

.address-form__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  width: 80%;
  padding: 16px;
}

.address-form__input {
  width: 100%;
  margin-bottom: 16px;

  &--size {
    &--normal {
      width: 60.5%;
    }

    &--small {
      width: 18%;
    }
  }
}

.address-form__buttons {
  display: flex;
  justify-content: flex-end;

  padding: 0 16px;

  button {
    margin-left: 16px;
    padding: 16px 27px;
  }
}

.address-form__header {
  @include b-s14-h16;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 21px;
  padding: 10px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);
}
</style>
