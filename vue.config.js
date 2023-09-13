module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'vue-easy-lightbox$': 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.esm.min.js',
      },
    },
  },
};
