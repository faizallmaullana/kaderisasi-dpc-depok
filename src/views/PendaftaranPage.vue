<script>
import { axios } from "@/axios/config.js";
import { toProperCase } from "@/assets/js/toProperCase.js";

export default {
  name: 'PendaftaranPage',

  data() {
    return {
      isppab: 'false',
      isktd: 'true',
      isWillPpab: '',
      nama: '',
      email: '',
      phone: '',
      komisariat: '',
      universitas: '',
      cabang: 'Depok',

      statusMessage: false,
    }
  },

  methods: {
    async submitData() {
      const willPpab = this.isWillPpab;
      if (this.isppab == 'false')
        if (willPpab === '') {
          this.statusMessage = true;
          return;
        }

      const data = {
        Nama: toProperCase(this.nama),
        Email: this.email,
        Phone: this.phone,
        Komisariat: this.komisariat,
        Universitas: this.universitas,
        Cabang: this.cabang,
        IsKtd: this.isktd,
        IsPpab: this.isppab,
        IsWillPpab: this.isWillPpab
      };

      try {
        const result = await axios.post("/pendaftaran", data);
        const phone = result.data.peserta.Phone;
        this.$router.push(`/status/${phone}`);
      }
      catch (error) {
        this.$router.push(`/status/08`);
      }
    }
  }
}
</script>

<template>
  <div id="LandingPage">
    <div class="heroImage">
      <div class="temaKegiatan">
        <h2>Memaknai Marhaenisme guna Menghadapi Bonus Demografi</h2>
      </div>
      <img src="@/assets/hero.jpg" alt="">
    </div>

    <article>
      <div class="header">
        <h1>Formulir Pendaftaran</h1>
        <h2 style="color:var(--red)">Kaderisasi Tingkat Dasar dan Pekan Penerimaan Anggota Baru</h2>
        <h3>DPC GMNI DEPOK 2024</h3>

        <p>Halo, Bung dan Sarinah</p>
        <p>Terima kasih atas ketersediaan Anda untuk mengisi formulir registrasi ini. Untuk informasi lebih lanjut dan
          jika terdapat pertanyaan, silakan untuk mengubungi <a href="https://wa.me/+6283845715328">Sarinah Risha (0838
            4571 5328)</a>. Sampai bertemu, Bung dan
          Sarinah.</p>
        <p><strong>Merdeka!!!</strong></p>
        <p style="color:var(--red); font-weight: 600;">PEJUANG PEMIKIR - PEMIKIR PEJUANG</p>
      </div>

      <form @submit.prevent="submitData" class="wrapper">
        <div class="divider">
          <h3>Identitas</h3>

          <label for="nama">Nama</label>
          <input type="text" id="nama" v-model="nama" placeholder="Nama..." required>

          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" placeholder="Email..." required>

          <label for="phone">Nomor WhatsApp</label>
          <input type="text" id="phone" v-model="phone" placeholder="08..." required>

          <label for="komisariat">Komisariat</label>
          <input type="text" id="komisariat" v-model="komisariat" placeholder="Asal Komisariat..." required>

          <label for="universitas">Universitas</label>
          <input type="text" id="universitas" v-model="universitas" placeholder="Asal Universitas..." required>

          <label for="cabang">Cabang</label>
          <input type="text" id="cabang" v-model="cabang" placeholder="Asal Cabang..." required>

        </div>

        <!-- </form>

        <form class="kesediaan"> -->
        <div class="divider">
          <h3>Kesediaan Mengikuti Kegiatan</h3>


          <label for="" class="formRight">Apakah Anda sudah mengikuti <strong class="em">Pekan Penerimaan Anggota Baru
              (PPAB)</strong>?</label>
          <div class="radio">
            <span>
              <input type="radio" id="ppabTrue" v-model="isppab" placeholder="Nama" class="checkbox" value="true">
              <label for="ppabTrue">Saya <strong>sudah</strong> mengikuti PPAB</label>
            </span>

            <span>
              <input type="radio" id="ppabFalse" v-model="isppab" placeholder="Nama" class="checkbox" value="false">
              <label for="ppabFalse">Saya <strong>belum</strong> mengikuti PPAB</label>
            </span>
          </div>

          <!-- dom tampilkan jika user belum pernah mengikuti ppab -->
          <label for="" class="formRight red" v-if="isppab === 'false'">
            Sebagai langkah awal Anda untuk menjadi anggota GMNI, Anda <strong>wajib mengikuti PPAB</strong> yang
            akan dilaksanakan pada:
            <p><strong>Kamis, 25 April 2024</strong></p>
            <p><strong>Pukul 17.00 WIB s.d. 21.00 WIB</strong></p>
            <p><strong>di Depok</strong></p>
            Silakan mengikuti rangkaian kegiatan PPAB tersebut untuk bisa mengikuti Kaderisasi Tingkat Dasar DPC GMNI
            Depok 2024.
          </label>
          <div class="radio" v-if="isppab === 'false'">
            <span>
              <input type="radio" id="isWillPpabTrue" v-model="isWillPpab" placeholder="Nama" class="checkbox"
                value="true">
              <label for="isWillPpabTrue">Saya <strong>bersedia</strong> mengikuti PPAB</label>
            </span>

            <span>
              <input type="radio" id="isWillPpabFalse" v-model="isWillPpab" placeholder="Nama" class="checkbox"
                value="false">
              <label for="isWillPpabFalse">Saya <strong>tidak bersedia</strong> mengikuti PPAB</label>
            </span>
          </div>

          <label for="" class="formRight">Apakah Anda bersedia untuk mengikuti <strong class="em">Kaderisasi Tingkat
              Dasar (KTD)</strong> DPC GMNI
            Depok 2024?</label>
          <div class="radio">
            <span>
              <input id="bersediaKTD" type="radio" v-model="isktd" placeholder="Nama" class="checkbox" value="true">
              <label for="bersediaKTD">Saya <strong>bersedia</strong></label>
            </span>

            <span>
              <input id="tidakBersediaKTD" type="radio" v-model="isktd" placeholder="Nama" class="checkbox"
                value="false">
              <label for="tidakBersediaKTD">Saya <strong>tidak bersedia</strong></label>
            </span>
          </div>

          <p v-if="statusMessage" class="em">Semua kolom harus terisi</p>
          <input type="submit" value="Submit" class="inputButton">
          <p v-if="isktd == 'true'">*Setelah melakukan pendaftaran, anda akan diarahkan untuk mengerjakan sebuah tugas
            singkat</p>

        </div>
      </form>
    </article>
  </div>
</template>

<style scoped>
strong.em {
  color: var(--red)
}

p.em {
  color: var(--red);
  font-style: italic;
  text-decoration: underline;
}
</style>