<template>
      <footer>
      <div class="wrapper">
        <span @click="pushToHome" class="logo">
          <img src="@/assets/home.png" alt="Home">
          <h4>Home</h4>
        </span>

        <span @click="pushToHomeAdmin" class="logo">
          <img src="@/assets/home.png" alt="Home">
          <h4>Home Admin</h4>
        </span>

        <hr style="width: 100%; transform: translateY(-10px);">

        <span @click="pushToHome" class="organization">
          <img src="@/assets/logo.png" alt="GMNI">
          <div class="divide">
            <h3>GMNI</h3>
            <p>Dewan Pengurus Cabang Depok</p>
          </div>
        </span>

        <span class="sosmed">
          <p><strong>Narahubung</strong></p>
          <a href="https://wa.me/+6283845715328">Risha 0838-4571-5328</a>
        </span>
      </div>

      <div class="copyright" style="width:100%;background-color: #999;padding:5px 0;">
        <a style="color:var(--black)" href="https://github.com/faizallmaullana">&copy;2024</a>
      </div>
    </footer>
</template>


<script>
export default {
  name: 'FooterBar',

  methods: {
    pushToHome() {
      this.$router.push({ name: 'HomePage' })
    },

    pushToHomeAdmin() {
      this.$router.push({ name: 'AdmHomePage' })
    }
  },

  beforeCreate() {
    const token = localStorage.getItem("tokenAuth");
    if (!token || token.length < 12) {
      this.$router.push({name: 'LoginPage'})
    } 
  }
}
</script>