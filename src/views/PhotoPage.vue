<template>
  <div class="home">
    <Header />

    <section v-show="image" class="photo-page">
      <div class="container">
        <div class="photo-page__inner">
          <div class="photo-page__top">
            <div class="photo-page__account-info">
              <img :src="image?.user?.profile_image?.medium" alt="avatar" />
              <div class="photo-page__account-info-inner">
                <h4>{{ image?.user?.username }}</h4>
                <h5>@{{ image?.user?.twitter_username }}</h5>
              </div>
            </div>

            <div class="photo-page__actions">
              <button
                v-if="!isFavorite"
                @click="setFavorite(image)"
                class="photo-page__favorite-btn"
              >
                <svg
                  width="25"
                  height="23"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                    fill="#000"
                  />
                </svg>
              </button>
              <button
                v-else
                @click="removeFavorite(image.id)"
                class="photo-page__favorite-btn"
              >
                <svg
                  width="25"
                  height="23"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                    fill="#ff0000"
                  />
                </svg>
              </button>

              <a
                :href="image?.links?.download"
                class="photo-page__download-btn"
                download
                target="_blank"
              >
                <svg
                  width="26"
                  height="23"
                  viewBox="0 0 26 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.381 10.7776C25.0395 10.7787 24.7629 11.055 24.7619 11.3966V19.209C24.759 20.2333 23.9291 21.0631 22.9048 21.0662H3.09524C2.07091 21.0631 1.241 20.2333 1.2381 19.209V11.3966C1.2381 11.0548 0.961071 10.7776 0.619048 10.7776C0.277024 10.7776 0 11.0548 0 11.3966V19.209C0.00077381 20.9182 1.38609 22.3035 3.09524 22.3043H22.9048C24.6139 22.3035 25.9992 20.9182 26 19.209V11.3966C25.999 11.055 25.7224 10.7787 25.381 10.7776Z"
                    fill="black"
                  />
                  <path
                    d="M8.46874 14.3124L12.4059 17.6862C12.4094 17.6862 12.4121 17.6891 12.4121 17.6924L12.4306 17.711C12.4368 17.7171 12.4492 17.7233 12.4554 17.7295C12.4614 17.7373 12.4703 17.7417 12.4802 17.7419C12.4864 17.7481 12.4987 17.7543 12.5049 17.7605C12.5111 17.7667 12.5235 17.7667 12.5297 17.7729C12.5359 17.779 12.5483 17.779 12.5606 17.7852C12.5668 17.7914 12.5792 17.7914 12.5854 17.7976C12.5978 17.8038 12.604 17.8038 12.6164 17.81C12.6225 17.81 12.6349 17.8162 12.6411 17.8162C12.6535 17.8162 12.6597 17.8224 12.6721 17.8224C12.6783 17.8224 12.6906 17.8286 12.6968 17.8286C12.7092 17.8286 12.7216 17.8348 12.734 17.8348H12.8949C12.9073 17.8348 12.9197 17.8286 12.9321 17.8286C12.9383 17.8286 12.9506 17.8224 12.9568 17.8224C12.9692 17.8224 12.9754 17.8162 12.9878 17.8162C12.994 17.8162 13.0064 17.81 13.0125 17.81C13.0249 17.8038 13.0311 17.8038 13.0435 17.7976C13.0497 17.7914 13.0621 17.7914 13.0683 17.7852C13.0806 17.779 13.0868 17.779 13.0992 17.7729C13.1054 17.7667 13.1178 17.7667 13.124 17.7605C13.1302 17.7543 13.1425 17.7481 13.1487 17.7419C13.1549 17.7357 13.1611 17.7357 13.1735 17.7295C13.1797 17.7233 13.1921 17.7171 13.1983 17.711L13.2168 17.6924C13.2203 17.6924 13.223 17.6895 13.223 17.6862L17.1602 14.3124C17.4202 14.0901 17.4505 13.6993 17.2283 13.4395C17.0062 13.1797 16.6154 13.1492 16.3554 13.3714L13.4335 15.8724V0.619048C13.4335 0.277024 13.1565 0 12.8145 0C12.4724 0 12.1954 0.277024 12.1954 0.619048V15.8724L9.2735 13.3714C9.0135 13.1492 8.62272 13.1797 8.40064 13.4395C8.17836 13.6993 8.20874 14.0901 8.46874 14.3124Z"
                    fill="black"
                  />
                </svg>

                <span>Download</span>
              </a>
            </div>
          </div>

          <div class="photo-page__img-wrapper">
            <img
              :src="image?.urls?.regular"
              alt="image"
              class="photo-page__img"
            />
            <span @click="showLightbox">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.59835 3.59835C4.30161 2.89509 5.25544 2.5 6.25 2.5H10C10.6904 2.5 11.25 3.05964 11.25 3.75C11.25 4.44036 10.6904 5 10 5H6.25C5.91848 5 5.60054 5.1317 5.36612 5.36612C5.1317 5.60054 5 5.91848 5 6.25V10C5 10.6904 4.44036 11.25 3.75 11.25C3.05964 11.25 2.5 10.6904 2.5 10V6.25C2.5 5.25544 2.89509 4.30161 3.59835 3.59835ZM18.75 3.75C18.75 3.05964 19.3096 2.5 20 2.5H23.75C24.7446 2.5 25.6984 2.89509 26.4017 3.59835C27.1049 4.30161 27.5 5.25544 27.5 6.25V10C27.5 10.6904 26.9404 11.25 26.25 11.25C25.5596 11.25 25 10.6904 25 10V6.25C25 5.91848 24.8683 5.60054 24.6339 5.36612C24.3995 5.1317 24.0815 5 23.75 5H20C19.3096 5 18.75 4.44036 18.75 3.75ZM3.75 18.75C4.44036 18.75 5 19.3096 5 20V23.75C5 24.0815 5.1317 24.3995 5.36612 24.6339C5.60054 24.8683 5.91848 25 6.25 25H10C10.6904 25 11.25 25.5596 11.25 26.25C11.25 26.9404 10.6904 27.5 10 27.5H6.25C5.25544 27.5 4.30161 27.1049 3.59835 26.4017C2.89509 25.6984 2.5 24.7446 2.5 23.75V20C2.5 19.3096 3.05964 18.75 3.75 18.75ZM26.25 18.75C26.9404 18.75 27.5 19.3096 27.5 20V23.75C27.5 24.7446 27.1049 25.6984 26.4017 26.4017C25.6984 27.1049 24.7446 27.5 23.75 27.5H20C19.3096 27.5 18.75 26.9404 18.75 26.25C18.75 25.5596 19.3096 25 20 25H23.75C24.0815 25 24.3995 24.8683 24.6339 24.6339C24.8683 24.3995 25 24.0815 25 23.75V20C25 19.3096 25.5596 18.75 26.25 18.75Z"
                  fill="white"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </section>

    <div v-show="image && isModalOpen" class="modal">
      <img :src="image?.urls?.regular" alt="image" class="modal__img" />
      <span @click="closeLightbox()"
        ><svg
          fill="#fff"
          height="30px"
          width="30px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512"
          xml:space="preserve"
          stroke="#fff"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0" />

          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <g id="SVGRepo_iconCarrier">
            <g>
              <g>
                <polygon
                  points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512 512,452.922 315.076,256 "
                />
              </g>
            </g>
          </g></svg
      ></span>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";

import Header from "@/components/Header.vue";

import axios from "axios";

export default {
  name: "Home",
  components: {
    Header,
  },
  setup() {
    const route = useRoute();
    const pageId = route.params.id;
    const image = ref({});
    const isModalOpen = ref(false);
    const favorites = ref(
      JSON.parse(localStorage.getItem("favorites") || "[]")
    );
    const isFavorite = ref(
      favorites.value.findIndex((item) => item.id == pageId) >= 0 ? true : false
    );

    const setFavorite = (image) => {
      favorites.value = [...favorites.value, image];

      localStorage.setItem("favorites", JSON.stringify(favorites.value));
      isFavorite.value = true;
    };

    const removeFavorite = (id) => {
      favorites.value = favorites.value.filter((item) => item.id != id);

      localStorage.setItem("favorites", JSON.stringify(favorites.value));
      isFavorite.value = false;
    };

    axios
      .get(`https://api.unsplash.com/photos/${pageId}`, {
        params: {
          client_id: "M9A55Wlare4TtbucVM4Z0e6c2YjV_2WmM6cdFW3zb7E",
        },
      })
      .then(({ data }) => {
        image.value = data;
      });

    const showLightbox = () => {
      isModalOpen.value = true;
    };

    const closeLightbox = () => {
      isModalOpen.value = false;
    };

    return {
      image,
      setFavorite,
      removeFavorite,
      isFavorite,
      isModalOpen,
      showLightbox,
      closeLightbox,
    };
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.507);

  & img {
    height: 100%;
  }

  & span {
    position: absolute;
    right: 40px;
    top: 40px;
    cursor: pointer;
  }
}

.photo-page {
  padding-top: 32px;
  margin-bottom: 100px;
  background-image: url("~@/assets/photo-page-bg.jpg");
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 92%;

  @media screen and (max-width: 600px) {
    background: none;
  }

  &__top {
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  &__account-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 15px;
    margin-top: 10px;

    & img {
      width: 55px;
      height: 55px;
      border-radius: 8px;
      border: 1px solid #fff;
      object-fit: cover;
      margin-right: 10px;
    }
  }

  &__account-info-inner {
    color: #fff;
    text-align: left;

    & h4 {
      font-size: 24px;
      margin: 0;

      @media screen and (max-width: 600px) {
        color: #000;
        font-size: 18px;
      }
    }
    & h5 {
      font-size: 16px;
      margin: 0;

      @media screen and (max-width: 600px) {
        color: #bdbdbd;
        font-size: 14px;
      }
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }

  &__favorite-btn {
    margin-right: 20px;
    padding: 12px;
    cursor: pointer;
    background-color: #fff;
    border-radius: 8px;
    border: none;
    display: flex;
    align-items: center;
    @media screen and (max-width: 600px) {
      box-shadow: 0px 0px 8px 2px rgba(40, 36, 22, 0.2);
    }
  }

  &__download-btn {
    cursor: pointer;
    background-color: #fff200;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    color: #000;
    display: flex;
    align-items: center;
    text-decoration: none;

    & svg {
      width: 26px;
      height: 22px;
      margin-right: 5px;
    }

    @media screen and (max-width: 600px) {
      box-shadow: 0px 0px 8px 2px rgba(40, 36, 22, 0.2);
      padding: 12px;

      & svg {
        margin-right: 0px;
      }

      & span {
        display: none;
      }
    }
  }

  &__img-wrapper {
    position: relative;

    & span {
      position: absolute;
      bottom: 30px;
      right: 30px;
      cursor: pointer;

      @media screen and (max-width: 600px) {
        bottom: 15px;
        right: 15px;
      }
    }
  }

  &__img {
    width: 100%;
    height: 744px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0px 30px 25px 0px rgba(40, 36, 22, 0.2);

    @media screen and (max-width: 1200px) {
      height: 644px;
    }

    @media screen and (max-width: 1000px) {
      height: 544px;
    }

    @media screen and (max-width: 780px) {
      height: 444px;
    }

    @media screen and (max-width: 600px) {
      height: 344px;
    }

    @media screen and (max-width: 460px) {
      height: 244px;
    }
  }
}
</style>