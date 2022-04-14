<template>
  <el-popover
    placement="top-start"
    width="400"
    trigger="click"
  >
    <div
      v-if="url"
      :style="{ height: height }"
      class="qqface-container"
    >
      <span
        v-for="[key, value1] of Object.entries(emoijs)"
        :key="value1"
        class="qqface-wrapper pointer"
      >
        <img
          :src="url"
          class="qqface"
          :class="[`qqface${value1}`]"
          @click="input(key)"
        />
      </span>
    </div>
    <svg-icon
      slot="reference"
      icon-class="icon-face"
      class="pointer"
    />
  </el-popover>
</template>

<script>
import { deleteEmoji, qqfaceArr } from '@/utils/qq-emoji'
// const emojisUrl = require(url)
// const emojisUrl = require(url)

export default {
  name: 'EmojiPicker',
  props: {
    value: {
      type: String,
      default: () => {
        return ''
      }
    },
    height: {
      type: String,
      default: '400px'
    }
  },
  data() {
    return {
      emoijs: qqfaceArr,
      url: require('@/assets/qqface.png')
    }
  },
  // inject: ['emojisUrl'],
  methods: {
    input(key) {
      this.$emit('choose', this.value + key)
    },
    deleteEmoji() {
      this.$emit('input', deleteEmoji(this.value))
    }
  }
}
</script>

<style lang="scss">
@import './index.scss';

.qqface-container {
  overflow-y: scroll;

  // position: relative;
  // height: 300px;
  .qqface-wrapper {
    display: inline-block;
    transform: scale(1.4);
    margin: 12px;
  }
}
</style>
