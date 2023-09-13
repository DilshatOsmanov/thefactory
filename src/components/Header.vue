<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <router-link to="/">
          <img class="header__logo" alt="logo" src="../assets/logo.svg" />
        </router-link>

        <div class="header__links-wrapper">
          <router-link v-show="!isHome" class="header__link" to="/">
            <span>Поиск</span>
          </router-link>

          <router-link class="header__link" to="/favorites">
            <span>Избранное</span>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    isHome: Boolean,
  },
};
</script>

<style scoped lang="scss">
.header {
  background-color: #000;
  padding: 35px 0;

  @media screen and (max-width: 500px) {
    padding: 15px 0;
  }

  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    height: 73px;

    @media screen and (max-width: 800px) {
      height: 48px;
    }

    @media screen and (max-width: 500px) {
      height: 32px;
    }
  }

  &__links-wrapper {
    display: flex;
    align-items: center;
  }

  &__link {
    text-decoration: none;
    color: #fff;
    position: relative;
    padding-left: 28px;

    &:first-child {
      &::before {
        background-image: url("~@/assets/search.svg");
      }
    }

    &:nth-child(2) {
      margin-left: 30px;

      &::before {
        background-image: url("~@/assets/favorite.svg");
      }

      @media screen and (max-width: 800px) {
        margin-left: 20px;
      }
      @media screen and (max-width: 500px) {
        margin-left: 10px;
      }
    }

    &::before {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      content: "";
      width: 22px;
      height: 22px;

      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }

    @media screen and (max-width: 500px) {
      & span {
        display: none;
      }
    }
  }
}
</style>
