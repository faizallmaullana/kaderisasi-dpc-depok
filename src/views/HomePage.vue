<template>
  <div id="LandingPage">
    <div class="heroImage">
      <div class="temaKegiatan">
        <h2>Memaknai Marhaenisme guna Menghadapi Bonus Demografi</h2>
      </div>
      <img src="@/assets/hero.jpg" alt="">
    </div>

    <article>
      <div class="cekPeserta">
        <h3>Cek Status Keikutsertaan</h3>
        <form @submit.prevent="goToStatus" style="max-width: 80%">
          <label for="">Nomor Telpon</label>
          <input class="inputBiasa" type="text" v-model="nomorTelpon" placeholder="Masukkan Nomor Telpon Anda...">
          <div class="div" style="display: flex; flex-direction: column; gap: 20px;" v-if="nomorTelpon === 'Admin'">
            <br>
            <router-link :to="{ name: 'LoginPage' }">Halaman Admin</router-link>
            <router-link :to="{ name: 'RegistrationPage' }">Registrasi</router-link>
          </div>
          <br> <br>
          <input type="submit" value="Cek Status" class="inputButton cekStatus">

          <p style="text-align: center">Belum Daftar?</p>
          <input class="inputButton pendaftaran" type="submit" value="Pendaftaran" @click="pushPendaftaran" />
        </form>
      </div>

    </article>

    <article>
      <div class="header">
        <h2 style="color:var(--red)">Kaderisasi Tingkat Dasar
        </h2>
        <h3>DPC GMNI DEPOK 2024</h3>
        <hr>
        <h4>Jum'at, 26 April 2024 s.d. Minggu, 28 April 2024</h4>
      </div>
    </article>

    <article>
      <div class="header">
        <h2 style="color:var(--red)">Pekan Penerimaan Anggota Baru
        </h2>
        <h3>DPC GMNI Depok 2024</h3>
        <hr>
        <h4>Rabu, 17 April 2024</h4>
        <p>Pukul 17.00 WIB s.d. 21.00 WIB</p>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'HomePage',

  data() {
    return {
      nomorTelpon: '',
    }
  },

  methods: {
    goToStatus() {
      if (this.nomorTelpon.length > 0 && this.nomorTelpon !== "Admin") {
        this.$router.push({ path: `/status/${this.nomorTelpon}` })
        return
      }
    },

    pushPendaftaran() {
      this.$router.push({ name: 'PendaftaranPage' });
    },
  }

}
</script>


<style scoped>
#LandingPage .header h2 {
  font-size: 25px;
}

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

form input.pendaftaran {
  padding: 15px 20px;
}

form input.cekStatus {
  background-color: transparent;
  border-width: 3px;
  color: var(--red);
  border-style: solid;
  border-color: var(--red)
}

form input.cekStatus:hover {
  background-color: var(--red);
  color: var(--white);
}
</style>