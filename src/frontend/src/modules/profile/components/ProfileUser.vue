<template>
  <div class="user">
    <BasePicture
      :srcset="[user.srcset.x2, user.srcset.x4]"
      :webpset="[user.webpset.x2, user.webpset.x4]"
      :alt="user.name"
      width="72"
      height="72"
      remote
    />

    <div class="user__name">
      {{ user.name }}
    </div>

    <p class="user__phone">
      Контактный телефон:
      <span class="user__phone-value">{{ user.phone }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "ProfileUser",

  props: {
    user: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.user__name {
  @include b-s20-h23;

  margin-left: 30px;
}

.user__phone {
  @include b-s16-h19;

  width: 100%;
  margin-top: 20px;
}

.user__phone-value {
  font-weight: 400;
}
</style>
