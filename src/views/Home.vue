<template>
  <div style="text-align: center; font-size: 24px; color: #fff; padding-top: 30px;">
    DASH - PROJECT LAUNCHER
    <button
      @click="toCompanies()"
      style="display: block; margin: 20px auto; padding: 10px 20px; background: #eee; border: none; border-radius: 6px; cursor: pointer;"
    >
      EMPRESAS
    </button>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue from 'vue';

export default class Home extends Vue {
  /**
   *Creates an instance of Home.
   * @memberof Home
   */
  constructor() {
    super();
  }

  private toCompanies() {
    this.$vueRouter.push('/companies');
  }
}
</script>

<style>
.launcher {
  height: 40px;
  background: #222;
}
.launcher p {
  margin: 0;
  text-align: center;
  color: #eee;
  font-size: 20px;
  line-height: 40px;
}
</style>
