<template>
  <div :class="prefixCls" class="flex flex-start">
    <div
      :class="[
        `${prefixCls}__classic`,
        {
          'is-acitve': layout === 'classic'
        },
        'pointer'
      ]"
      @click="$store.dispatch('app/setLayout', 'classic')"
    >经典</div>
    <div
      :class="[
        `${prefixCls}__top-left`,
        {
          'is-acitve': layout === 'topLeft'
        },
        'pointer'
      ]"
      @click="$store.dispatch('app/setLayout', 'topLeft')"
    >左上</div>
    <div
      :class="[
        `${prefixCls}__top`,
        {
          'is-acitve': layout === 'top'
        },
        'pointer'
      ]"
      @click="$store.dispatch('app/setLayout', 'top')"
    >顶部</div>
    <div
      :class="[
        `${prefixCls}__cut-menu`,
        {
          'is-acitve': layout === 'cutMenu'
        },
        'pointer'
      ]"
      @click="$store.dispatch('app/setLayout', 'cutMenu')"
    >
      切菜
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { useDesign } from '@/hooks/web/useDesign'
const { getPrefixCls } = useDesign()
export default {
  components: {

  },
  // 定义属性
  data() {
    return {
      prefixCls: getPrefixCls('layout-radio-picker')
    }
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {
    ...mapGetters(['buttonType']),
    layout() {
      return this.$store.dispatch('app/getLayout')
    }
  },
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  // 方法集合
  methods: {

  }
}
</script>

<style lang='scss' scoped>
@import '~@/styles/variables.scss';
$prefix-cls: '#{$namespace}-layout-radio-picker';

.#{$prefix-cls} {
    width: 100%;
    height: 50px;
&__classic {
    width: 20%;
  }

  &__top-left {
width: 20%;
  }

  &__top {
width: 20%;
  }

  &__cut-menu {
width: 20%;
  }

  .is-acitve {
    border-color: var(--el-color-primary);
  }
}

</style>
