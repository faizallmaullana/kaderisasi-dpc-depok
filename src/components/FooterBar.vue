<template>
      <footer>
      <div class="wrapper">
        <span class="logo">
          <h4 @click="pushToHome">Home</h4>
          <h4 @click="pushToTugas">Tugas KTD</h4>
          <h4 @click="pushToPendaftaran">Pendaftaran</h4>
        </span>

        <hr style="width: 100%; transform: translateY(-10px);">

        <span @click="pushToHome" class="organization">
          <img src="@/assets/logo.svg" alt="GMNI">
          <div class="divide">
            <h3>GMNI</h3>
            <p>Dewan Pengurus Cabang Depok</p>
          </div>
        </span>

        <span class="sosmed">
          <p><strong>Narahubung</strong></p>
          <a href="https://wa.me/+6283845715328">Risha 0838-4571-5328</a>
          <a href="https://wa.me/+6285162808518">Faizal 0851-6280-8518</a>
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

    pushToTugas() {
      this.$router.push({ name: 'PengumpulanTugasPage' })
    },

    pushToPendaftaran() {
      this.$router.push({ name: 'PendaftaranPage' })
    }
  }
}
</script>

<style scoped>
footer .sosmed {
  margin-top: 10px;;
  gap: 10px;
}
</style>