<template>
  <div class="profile">
    <ProfileUser class="profile__user" :user="user" />

    <ProfileAddressForm
      v-for="(address, i) of addresses"
      :key="`address-${i}`"
      class="profile__address"
      :address="address"
      :index="i + 1"
      @change="changeHandler(address, i)"
      @delete="addresses.splice(i, 1)"
    />

    <div class="profile__button">
      <BlockButton bordered @click="addNewAddress">
        Добавить новый адрес
      </BlockButton>
    </div>
  </div>
</template>

<script>
import ProfileUser from "@/modules/profile/components/ProfileUser.vue";
import ProfileAddressForm from "@/modules/profile/components/ProfileAddressForm.vue";

export default {
  name: "ProfileView",
  components: {
    ProfileUser,
    ProfileAddressForm,
  },
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {
      addresses: [],
    };
  },
  methods: {
    changeHandler(address, index) {
      delete address.template;

      this.addresses[index] = address;
    },
    addNewAddress() {
      this.addresses.push({
        name: "",
        street: "",
        house: "",
        apartment: "",
        comment: "",
        template: true,
      });
    },
  },
};
</script>

<style lang="scss">
.profile__user {
  margin-bottom: 33px;
}

.profile__address {
  margin-top: 16px;
}

.profile__button {
  margin: 40px 0;

  button {
    padding: 12px 23px;
  }
}
</style>
