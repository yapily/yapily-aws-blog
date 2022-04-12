<template>
  <div
    class="item-image-holder"
    v-bind:class="{
      loaded: isLoaded,
      landscape: isLandscape,
      portrait: isPortrait,
      square: isSquare,
    }"
  >
    <img
      class="item-img"
      v-bind:class="{
        landscape: isLandscape,
        portrait: isPortrait,
        square: isSquare,
        cover: size && size === 'cover',
        contain: size && size === 'contain',
      }"
      v-bind:src="src"
      v-bind:alt="alt"
      ref="image"
    />
    <div v-if="showFileDimensions" class="item-img-dimensions">
      {{ this.imgWidth }} <span class="image-by-character">x</span>
      {{ this.imgHeight }}
    </div>
  </div>
</template>
<script>
export default {
  name: "ItemImage",
  props: {
    src: {
      required: false,
      type: String,
    },
    alt: {
      required: false,
      type: String,
    },
    size: {
      required: false,
      type: String,
    },
    itemClass: {
      required: false,
      type: String,
      default: "item-img",
    },
    showFileDimensions: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isLoaded: "loading",
      isLandscape: false,
      isSquare: false,
      isPortrait: false,
      imgWidth: 0,
      imgHeight: 0,
    };
  },
  computed: {
    imageRatio() {
      let image = this.$refs.image;
      let imageRatio = image.naturalHeight / image.naturalWidth;
      return imageRatio > 0.9 && imageRatio < 1.1 ? 1 : imageRatio;
    },
  },
  mounted() {
    let image = this.$refs.image;
    const img = new Image();
    img.onload = () => {
      this.isLandscape = this.imageRatio < 1;
      this.isPortrait = this.imageRatio > 1;
      this.isSquare = this.imageRatio === 1;
      this.imgWidth = image.naturalWidth;
      this.imgHeight = image.naturalHeight;
      this.isLoaded = "loaded";
      this.$emit("ImageAction", {
        isLoaded: this.isLoaded,
        isLandscape: this.isLandscape,
        isSquare: this.isSquare,
        isPortrait: this.isPortrait,
        imgWidth: this.imgWidth,
        imgHeight: this.imgHeight,
      });
    };
    img.src = image.src;
  },
};
</script>
<style lang="scss" scoped>
.item-image-holder {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;

  .item-img {
    &.contain {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      &.landscape {
        width: 100%;
      }
      &:not(.landscape) {
      }
    }
    &.cover {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      &.landscape {
        height: 100%;
      }
      &:not(.landscape) {
      }
    }
  }
}
</style>
