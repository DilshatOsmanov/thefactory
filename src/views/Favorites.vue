<template>
  <div class="home">
    <Header />

    <div class="title">Избранное</div>

    <section class="gallery">
      <div class="container">
        <div class="gallery__inner">
          <router-link
            v-for="img in favorites"
            :key="img.id"
            class="gallery__img-wrapper"
            :to="'/gallery/' + img.id"
          >
            <img :src="img?.urls?.regular" alt="some photo" />
          </router-link>
        </div>

        <h1 class="not-found" v-if="!favorites.length">Ничего не найдено!</h1>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from "vue";
import Header from "@/components/Header.vue";

export default {
  name: "Home",
  components: {
    Header,
  },
  setup() {
    const favorites = ref(
      JSON.parse(localStorage.getItem("favorites") || "[]")
    );

    return { favorites };
  },
};
</script>

<style lang="scss" scoped>
.not-found {
  text-align: center;
  width: max-content;
  margin: 0 auto;
}

.title {
  font-size: 52px;
  font-weight: 700;
  margin-top: 100px;

  @media screen and (max-width: 600px) {
    margin-top: 50px;
    font-size: 36px;
  }
}

.gallery {
  margin-top: 114px;
  margin-bottom: 200px;

  @media screen and (max-width: 600px) {
    margin-top: 50px;
    margin-bottom: 100px;
  }

  &__inner {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 30px;

    @media screen and (max-width: 940px) {
      grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }

  &__img-wrapper {
    height: 440px;

    @media screen and (max-width: 1400px) {
      height: 360px;
    }

    @media screen and (max-width: 1100px) {
      height: 310px;
    }

    @media screen and (max-width: 360px) {
      height: 270px;
    }

    transition: all 0.3s ease-out;

    &:hover {
      transform: scale(0.95);
    }

    & img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 8px;
    }
  }
}
</style>