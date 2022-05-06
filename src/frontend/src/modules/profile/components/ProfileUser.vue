<template>
  <div class="user">
    <BlockPicture
      :srcset="['users/user5@2x.jpg', 'users/user5@4x.jpg']"
      :webpset="['users/user5@2x.webp', 'users/user5@4x.webp']"
      :alt="user.name"
      width="72"
      height="72"
    />

    <div class="user__name">
      <span>{{ user.name }}</span>
    </div>

    <p class="user__phone">
      Контактный телефон: <span>{{ user.phone }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "ProfileUser",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.user {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.user__name {
  @include b-s20-h23;

  margin-left: 30px;

  span {
    display: inline-block;

    vertical-align: middle;
  }
}

.user__phone {
  @include b-s16-h19;

  width: 100%;
  margin-top: 20px;

  span {
    font-weight: 400;
  }
}
</style>
