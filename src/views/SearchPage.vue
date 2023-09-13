<template>
  <div class="home">
    <Header isHome />

    <section class="search">
      <div class="search__inner">
        <div class="container">
          <div class="search__input-wrapper">
            <input
              v-model.lazy="searchQuery"
              class="search__input"
              id="search"
              type="text"
              placeholder="Поиск"
            />
            <label class="search__input-label" for="search">
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.8596 22.1821L15.8614 15.1838C17.315 13.5699 18.2084 11.442 18.2084 9.10414C18.2083 4.08416 14.1242 0 9.10418 0C4.08416 0 0 4.08416 0 9.10418C0 14.1242 4.08416 18.2084 9.10418 18.2084C11.442 18.2084 13.5699 17.315 15.1839 15.8614L22.1821 22.8596C22.2756 22.9532 22.3983 23 22.5209 23C22.6435 23 22.766 22.9532 22.8597 22.8596C23.0468 22.6724 23.0468 22.3692 22.8596 22.1821ZM9.10418 17.25C4.61294 17.25 0.958363 13.5959 0.958363 9.10418C0.958363 4.61249 4.61294 0.958318 9.10418 0.958318C13.5954 0.958318 17.25 4.61244 17.25 9.10418C17.25 13.5959 13.5954 17.25 9.10418 17.25Z"
                  fill="black"
                />
              </svg>
            </label>
          </div>
        </div>
      </div>
    </section>

    <section class="gallery">
      <div class="container">
        <div ref="scrollComponent" class="gallery__inner">
          <router-link
            v-for="img in images"
            :key="img.id"
            class="gallery__img-wrapper"
            :to="'/gallery/' + img.id"
          >
            <img :src="img?.urls?.regular" alt="some photo" />
          </router-link>
        </div>
        <h1 class="not-found" v-if="!images.length">Ничего не найдено!</h1>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import Header from "@/components/Header.vue";

import axios from "axios";

export default {
  name: "Home",
  components: {
    Header,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const scrollComponent = ref(null);
    const images = ref([]);
    const currentPage = ref(1);
    const totalPage = ref(null);
    const searchQuery = ref(route.query.query);

    const searchPhotos = () => {
      axios
        .get(`https://api.unsplash.com/search/photos`, {
          params: {
            client_id: "M9A55Wlare4TtbucVM4Z0e6c2YjV_2WmM6cdFW3zb7E",
            query: searchQuery.value,
            page: currentPage.value,
          },
        })
        .then(({ data }) => {
          images.value = [...images.value, ...data.results];

          totalPage.value = data.total_pages;
        });
    };

    searchPhotos();

    watch(searchQuery, () => {
      router.push({ path: "/search", query: { query: searchQuery.value } });
      searchPhotos();
    });

    onMounted(() => {
      searchPhotos();
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    const handleScroll = () => {
      let element = scrollComponent.value;

      if (element.getBoundingClientRect().bottom < window.innerHeight) {
        if (currentPage.value != totalPage.value) currentPage.value++;
        searchPhotos();
      }
    };

    return { images, searchQuery, scrollComponent };
  },
};
</script>

<style lang="scss" scoped>
.not-found {
  text-align: center;
  width: max-content;
  margin: 0 auto;
}

.search {
  background-image: url("~@/assets/main-bg.jpg");
  background-repeat: no-repeat;

  &__inner {
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    padding: 92px 0 100px 0;
  }

  &__input-wrapper {
    display: flex;
    margin: 0 auto;
    width: 100%;
    max-width: 866px;
    position: relative;
  }

  &__input {
    width: 100%;
    font-size: 24px;
    font-weight: 300;
    opacity: 1;
    padding: 20px 60px 20px 30px;
    border-radius: 0;
    border: none;

    &::placeholder {
      font-size: 24px;
      font-weight: 300;
      opacity: 1;
    }

    @media screen and (max-width: 600px) {
      padding: 18px 50px 18px 25px;
    }
  }

  &__input-label {
    position: absolute;
    top: 50%;
    right: 30px;
    transform: translateY(-50%);
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