<template>
  <div class="profile">
    <BaseHeading class="profile__title">
      {{ $route.meta.title }}
    </BaseHeading>

    <ProfileUser class="profile__user" :user="user" />

    <ProfileAddressForm
      v-for="address of addresses"
      :key="`address-${address.id}`"
      class="profile__address"
      :address="address"
      @change="updateAddress(address)"
      @delete="deleteAddress(address.id)"
    />

    <ProfileAddressForm
      v-if="newAddress"
      class="profile__address profile__address--new"
      :address="newAddress"
      @change="addAddress"
      @delete="newAddress = null"
    />

    <BaseButton
      v-if="!newAddress"
      class="profile__button"
      data-test="new-address"
      bordered
      @click="newAddress = createAddress(user.id)"
    >
      Добавить новый адрес
    </BaseButton>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { createAddress } from "@/common/helpers";
import ProfileUser from "@/modules/profile/components/ProfileUser.vue";
import ProfileAddressForm from "@/modules/profile/components/ProfileAddressForm.vue";

export default {
  name: "ProfileView",

  meta: {
    layout: "AppLayoutWithSidebar",
    title: "Мои данные",
  },

  components: {
    ProfileUser,
    ProfileAddressForm,
  },

  props: {
    user: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      newAddress: null,
    };
  },

  computed: {
    ...mapState("Profile", ["addresses"]),
  },

  methods: {
    ...mapActions("Profile", ["updateAddress", "deleteAddress"]),

    async addAddress() {
      const { id = null } = await this.$store.dispatch(
        "Profile/addAddress",
        this.newAddress
      );

      if (id) {
        this.newAddress = null;
      }
    },

    createAddress,
  },
};
</script>

<style lang="scss" scoped>
.profile__title {
  margin: 0 0 27px;
}

.profile__user {
  margin-bottom: 33px;
}

.profile__address {
  margin-top: 16px;
}

.profile__button {
  margin: 40px 0;
  padding: 12px 23px;
}
</style>
