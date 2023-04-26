<template>
  <div class="sign-index">
    <header>
      <te-logo />
    </header>
    <main>
      <transition
        enter-class="none"
        enter-to-class="animate__jackInTheBox"
        leave-to-class="none"
        enter-active-class="animate__animated"
      >
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>
    </main>
    <footer>
      <!-- 页脚 -->
    </footer>
  </div>
</template>

<script>

/**
 * @file 开始页 (默认登录)
 * */

export default {
    name: 'SignIndex'
}
</script>

<style lang="stylus" scoped>
.sign-index
    header
    footer
        height-center 65px
        padding-left 35px
    main
        grid-center true
        height calc(100vh - 130px)
        .sign-box
            size 444px auto
            border-radius 10px
            padding 40px
            box-sizing border-box
            el-shadow false
</style>