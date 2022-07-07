<template>
  <div class="login">
    <BlockClose to="/" isWhite>Закрыть форму авторизации.</BlockClose>

    <div class="login__title">
      <BlockSubheading>Авторизуйтесь на сайте</BlockSubheading>
    </div>

    <form class="login__form" method="post" @submit.prevent="login">
      <div class="login__input">
        <BlockInput
          label="E-mail"
          name="email"
          type="email"
          placeholder="example@mail.ru"
          v-model="email"
        />
      </div>

      <div class="login__input">
        <BlockInput
          label="Пароль"
          name="pass"
          type="password"
          placeholder="***********"
          v-model="password"
        />
      </div>

      <BlockButton class="login__button" type="submit" :disabled="invalid">
        Авторизоваться
      </BlockButton>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginView",

  data() {
    return {
      email: "",
      password: "",
    };
  },

  computed: {
    invalid() {
      return !this.email || !this.password || !/^.+@.+\..+$/.test(this.email);
    },
  },

  methods: {
    async login() {
      if (this.invalid) {
        return;
      }

      try {
        await this.$store.dispatch("User/login", {
          email: this.email,
          password: this.password,
        });
        this.$router.push("/");
      } catch (err) {
        this.password = "";
      }
    },
  },
};
</script>

<style lang="scss">
.login {
  @include pf_center-all;

  z-index: 10;

  display: block;

  box-sizing: border-box;
  width: 455px;
  padding-top: 146px;
  padding-right: 32px;
  padding-bottom: 32px;
  padding-left: 32px;

  background: $white url("~@/assets/img/popup.svg") no-repeat center top;
  box-shadow: $shadow-light;
}

.login__title {
  margin-bottom: 24px;

  text-align: center;
}

.login__input {
  margin-bottom: 16px;
}

.login__button {
  display: table;
  margin: 0 auto;
  padding: 16px 14px;
}
</style>
