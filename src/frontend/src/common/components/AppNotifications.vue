<template>
  <ul v-if="notifications.length" class="notifications">
    <li
      v-for="{ id, text, type } in notifications"
      :key="id"
      :class="`notifications__item notifications__item--${type}`"
    >
      <span>{{ text }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "AppNotifications",

  computed: {
    notifications() {
      return this.$store.state.Notifications.notifications;
    },
  },
};
</script>

<style lang="scss">
.notifications {
  position: fixed;
  z-index: 9999;
  right: 0;
  bottom: 0;
  margin: 0;
  padding: 0;
  list-style: none;
}

.notifications__item {
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  padding: 20px;
  text-align: center;
  border-bottom: 2px solid;

  &--info {
    color: $purple-800;
    background-color: $purple-200;
  }

  &--error {
    color: $red-900;
    background-color: rgba($red-800, 0.3);
  }

  &--success {
    color: $green-600;
    background-color: $green-200;
  }

  &--warning {
    color: $orange-300;
    background-color: rgba($orange-100, 0.3);
  }
}
</style>
