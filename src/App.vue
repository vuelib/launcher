<template>
  <div id="app-launcher" class="app-launcher">
    <div class="launcher" v-if="isAuthenticated()">
      <div style="width: 40px; height: 40px; display: inline-block; background: red;"></div>
      <div style="display: inline-block;"></div>
      <div style="width: 120px; height: 40px; float: right; display: inline-block; background: green;">
        <div
          style="background: blue; width: 36px; height: 36px; border-radius: 100%; margin: 2px 6px; float: right; cursor: pointer;"
          @click="actionsHeader = !actionsHeader"
        >
          <div
            style="background: #333; width: 120px; height: 120px; position: relative; left: -78px; top: 45px; border-radius: 6px;"
            v-show="actionsHeader"
            @click="logout()"
          >
            <p style="cursor: pointer;">sair</p>
          </div>
        </div>
      </div>
    </div>

    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'launcher',
})
export default class Launcher extends Vue {
  private show = false;
  private actionsHeader = false;

  /**
   *Creates an instance of Launcher.
   * @memberof Launcher
   */
  constructor() {
    super();

    window.addEventListener('storage', () => {
      this.initialize();
    });
  }

  /**
   *
   * @readonly
   * @private
   * @type {void}
   * @memberof Launcher
   */
  private initialize(): void {
    this.show = this.isAuthenticated();
  }

  /**
   *
   * @readonly
   * @private
   * @type {boolean}
   * @memberof Launcher
   */
  private isAuthenticated(): boolean {
    return this.$auth.isAuthenticated();
  }

  /**
   *
   * @private
   * @memberof Login
   */
  private logout(): void {
    this.$auth
      .logout()
      .then(() => {
        setTimeout(() => {
          this.$vueRouter.push('/login');
        }, 1000);
      })
      .catch(() => {
        //
      });
  }
}
</script>

<style lang="scss">
#app-launcher {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-image: url('assets/images/background-blur.png');
  background-position: 100%;
  background-repeat: no-repeat;
}
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
@import '~@essencia-ui/vue-santorini/src/assets/scss/main';
</style>
