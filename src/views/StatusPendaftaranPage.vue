<template>
  <div id="StatusPendaftaran">
    <div class="wrapper">
      <section class="head text-end">
        <h3>Agenda</h3>

        <div class="header">
          <h2 style="color:var(--red)">Pekan Penerimaan Anggota Baru
          </h2>
          <h3>DPC GMNI DEPOK 2024</h3>
          <h4>Kamis, 25 April 2024</h4>
          <p>Pukul 17.00 WIB s.d. 21.00 WIB</p>
          <hr>
        </div>
        <div class="header">
          <h2 style="color:var(--red)">Kaderisasi Tingkat Dasar
          </h2>
          <h3>DPC GMNI DEPOK 2024</h3>
          <h4>Jum'at, 26 April 2024 s.d. Minggu, 28 April 2024</h4>
          <hr>
        </div>

        <!-- <div class="header">
          <p><strong>Merdeka!!!</strong></p>
          <p style="color:var(--red); font-weight: 600;">PEJUANG PEMIKIR - PEMIKIR PEJUANG</p>
        </div> -->

      </section>

      <section>
        <img @click="pushToHome" src="@/assets/logo.svg" alt="">
        <br><br>

        <div v-if="status != ''">
          <h3>Anda <em>{{ status }}</em> sebagai peserta KTD maupun PPAB</h3>
          <br>
          <div class="bt-divide">
            <button @click="pushToHome" class="secondary">Kembali</button>
            <button @click="pushPendaftaran">Daftarkan Diri</button>
          </div>
        </div>
        <span v-else>
          <h3 v-if="statusPeserta != 'Peserta KTD'">Anda Terdaftar sebagai <em>{{ statusPeserta }}</em></h3>
          <h3 v-else>Anda Terdaftar sebagai <em>Calon {{ statusPeserta }}</em></h3>
        </span>

        <div v-if="status == ''" class="dataPeserta">
          <h2>{{ peserta.Nama }}</h2>
          <p>Komisariat {{ peserta.Komisariat }} | {{ peserta.Universitas }}</p>
          <span v-if="statusPeserta == 'Peserta KTD dan PPAB' || statusPeserta == 'Peserta KTD'"
          style="margin-top: 10px;">
            <p>Sebelum mengikuti Kaderisasi Tingkat Dasar, anda harus melaksanakan <strong>tugas singkat</strong> di
              link berikut.</p>
            <p>Tugas harus dikirim selambat-lambatnya pada <strong>Rabu, 24 April 2024, pukul 23.59.</strong></p>
            <br>
            <button @click="pushToTugas">Tugas KTD</button>
          </span>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { axios } from "@/axios/config.js";

export default {
  name: 'StatusPendaftaranPage',

  data() {
    return {
      nomorTelpon: '',
      peserta: '',
      status: '',
      statusPeserta: '',
    }
  },

  created() {
    this.nomorTelpon = this.$route.params.phone;
    this.getDataByPhone()
  },

  methods: {
    async getDataByPhone() {
      try {
        const result = await axios.get(`/peserta/${this.nomorTelpon}`);
        if (result.status != '200') {
          if (result.status == '204') {
            this.status = 'Tidak Memenuhi Syarat';
            return
          }
          this.status = 'Tidak Terdaftar'
          return
        }

        this.peserta = result.data.peserta
        this.statusPeserta = result.data.statusPendaftaran
      }
      catch (err) {
        if (err.response.status != '200') {
          if (err.response.status == '204') {
            this.status = 'Tidak Memenuhi Syarat';
            return
          }
          this.status = 'Tidak Terdaftar';
          return
        }
      }
    },

    pushToHome() {
      this.$router.push({ name: 'HomePage' })
    },

    pushPendaftaran() {
      this.$router.push({ name: 'PendaftaranPage' });
    },

    pushToTugas() {
      this.$router.push({ name: 'PengumpulanTugasPage' });
    }
  }
}
</script>

<style scoped>
#StatusPendaftaran {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

#StatusPendaftaran em {
  color: var(--red);
}

#StatusPendaftaran h3 {
  margin-block: 5px;
}


#StatusPendaftaran a {
  color: var(--black2);
  /* text-decoration: none; */
}

#StatusPendaftaran a:hover {
  color: var(--red);
}

#StatusPendaftaran .wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 50px;
  background-color: white;
  width: 85%;
  min-height: 80%;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 #8888;
  padding: 30px;
  flex-wrap: wrap-reverse;
}

#StatusPendaftaran section {
  min-width: 300px !important;
  width: 45%;
}

#StatusPendaftaran .head {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

#StatusPendaftaran .header p,
#StatusPendaftaran .header h2,
#StatusPendaftaran .header h3,
#StatusPendaftaran .header h4 {
  margin-block: 10px !important;
}

#StatusPendaftaran .dataPeserta {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#StatusPendaftaran .dataPeserta p,
#StatusPendaftaran .dataPeserta h2 {
  margin-block: 5px;
}

#StatusPendaftaran section img {
  width: 20%;
}

.text-end {
  text-align: end;
}

.text-start {
  text-align: start;
}
</style>

<style scoped>
@media screen and (max-width: 728px) {
  .text-end {
    text-align: center;
  }

  #StatusPendaftaran {
    height: auto;
    margin-top: 10px
  }

  #StatusPendaftaran .wrapper {
    padding: 30px 10px;
    min-height: 50%;
  }

  #StatusPendaftaran .header h2 {
    font-size: 20px;
  }

  #StatusPendaftaran .wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 #8888;
    padding: 30px 15px;
    flex-wrap: wrap-reverse;
    margin: 10px;
  }

}
</style>

<!-- <style scoped>
@media screen and (max-width: 700px) {
  #StatusPendaftaran .wrapper {
    flex-direction: column;
  }
}
</style> -->