<template>
  <div id="app-techat">
    <router-view></router-view>
  </div>
</template>

<script>
import ajax from './utils/ajax';
export default {
  name: 'App',
  async created() {
      const res = await ajax('http://localhost:3000/');
      const res1 = await ajax('http://localhost:3000/');
      const res2 = await ajax('http://localhost:3000/');
      console.log(res, res1, res2);
  }
}
</script>
