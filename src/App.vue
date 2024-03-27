<template>
  <div class="container">
    <div class="content">
      <router-view />
    </div>
    <div class="overlay"></div>
    <div class="overlay2"></div>

    <FooterBar v-if="isAnon" />
    <FooterAdm v-if="isAuth" />
  </div>

</template>

<script>
import FooterBar from "@/components/FooterBar.vue"
import FooterAdm from "@/components/FooterAdm.vue"

export default {
  components: {
    FooterBar,
    FooterAdm,
  },

  computed: {
    isAnon() {
      // Check if the current route is one of the specified pages
      const validPages = ['HomePage', 'PendaftaranPage', 'StatusPendaftaranPage'];
      return validPages.includes(this.$route.name);
    },

    isAuth() {
      // Check if the current route is one of the specified pages
      const validPages = ['AdmHomePage', 'DatabaseManagement'];
      return validPages.includes(this.$route.name);
    },
  },

  methods: {
    pushToHome() {
      this.$router.push({ name: 'HomePage' })
    }
  }
}
</script>

<style>
@import url(@/assets/styles/landingstyle.css);
@import url(@/assets/styles/button.css);
@import url(@/assets/styles/footer.css);
@import url(@/assets/styles/auth.css);

</style>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  --red: rgb(196, 0, 0);
  --black: #2b2b2b;
  --white: #e6e6e6;
  --black2: #2c3e50;
}

.container {
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
}

.container .content {
  position: relative;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

body {
  margin: 0;
}

.container .overlay {
  position: absolute;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Set the height to cover the entire container */
  opacity: 0.08;
  background-image: url(@/assets/pattern.jpg);
  background-repeat: repeat;
  background-size: cover;
}

.container .overlay2 {
  background-color: var(--red);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Set the height to cover the entire container */
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
