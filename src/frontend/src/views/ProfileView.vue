<template>
  <div class="profile">
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
      class="profile__address"
      :address="newAddress"
      @change="addAddress"
      @delete="newAddress = null"
    />

    <div v-if="!newAddress" class="profile__button">
      <BlockButton bordered @click="newAddress = createAddress(user.id)">
        Добавить новый адрес
      </BlockButton>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { createAddress } from "@/common/helpers";
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
      default: null,
    },
  },
  data() {
    return {
      newAddress: null,
    };
  },
  computed: {
    ...mapState("User", ["addresses"]),
  },
  methods: {
    ...mapActions("User", ["updateAddress", "deleteAddress"]),
    async addAddress() {
      const { id = null } = await this.$store.dispatch(
        "User/addAddress",
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
