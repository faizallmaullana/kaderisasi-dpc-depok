<script>
// import {axios} from  "@/axios/config.js";

export default {
  name: 'HomePage',

  data() {
    return {
      nomorTelpon: '',
      statusPendaftaran: false,
    }
  },

  methods: {
    goToStatus() {
      if (this.nomorTelpon.length > 0) {
        this.$router.push({ path: `/status/${this.nomorTelpon}` })
      }
    },

    pushPendaftaran() {
      this.$router.push({ name: 'PendaftaranPage' });
    },

    cekPeserta() {
      this.statusPendaftaran = !this.statusPendaftaran;
    }
  }

}
</script>

<template>
  <div id="LandingPage">
    <div class="heroImage">
      <div class="temaKegiatan">
        <h2>Ini adalah Tema Kegiatan, Rada Panjang dikit</h2>
      </div>
      <img src="@/assets/hero.jpg" alt="">
    </div>

    <article>
    <div class="cekPeserta" v-if="statusPendaftaran">
      <h3>Cek Status Keikutsertaan</h3>
      <form @submit.prevent="goToStatus" style="max-width: 80%">
        <label for="">Nomor Telpon</label>
        <input class="inputBiasa" type="text" v-model="nomorTelpon" placeholder="Masukkan Nomor Telpon Anda...">
        <br> <br>
        <input type="submit" value="Cek Status" class="inputButton">
      </form>
    </div>

    <div class="option">
      <button @click="cekPeserta" class="secondary">Cek Peserta</button>
      <button @click="pushPendaftaran">Pendaftaran</button>
    </div>

    <div class="div" style="display: flex; flex-direction: column; gap: 20px;" v-if="nomorTelpon === 'Admin'">
      <br>
      <router-link :to="{name: 'AdmHomePage'}">Halaman Admin</router-link>
      <router-link :to="{name: 'RegistrationPage'}">Registrasi</router-link>
    </div>
  </article>

    <article>
      <div class="header">
        <h2 style="color:var(--red)">Kaderisasi Tingkat Dasar dan Pekan Penerimaan Anggota Baru DPC GMNI DEPOK 2024
        </h2>
        <h4>Jum'at, 19 April 2024 s.d. Minggu, 21 April 2024</h4>
      </div>
    </article>

    <article>
      <div class="header">
        <h2 style="color:var(--red)">Pekan Penerimaan Anggota Baru DPC GMNI Depok 2024
        </h2>
        <h4>Rabu, 17 April 2024</h4>
        <p>Pukul 17.00 WIB s.d. 21.00 WIB</p>
      </div>
    </article>
  </div>
</template>

<style scoped>
#LandingPage form p {
  margin-block: none;
  text-align: end;
}

#LandingPage .cekPeserta {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.inputBiasa {
  margin: 0;
}

.option {
  display: flex;
  gap: 20px
}
</style>