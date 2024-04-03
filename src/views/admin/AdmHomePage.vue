<template>
  <div id="Admin">
    <article class="round">
      <div class="navButton">
        <button @click="filterByKTD">KTD</button>
        <button @click="filterByPPAB">PPAB</button>
        <button @click="showAll">Semua Peserta</button>
      </div>

      <h2 v-if="selectedFilter != 'Semua'" style="margin-block-end:0.5em">Peserta {{ selectedFilter }}</h2>
      <h2 v-else style="margin-block-end:0.5em">{{ selectedFilter }} Peserta</h2>

      <a v-if="selectedFilter != 'Semua'" @click="convertJSONtoCSV" style="margin-block-end: 1em">Download Daftar
        Peserta {{ selectedFilter }}</a>
      <a v-else @click="convertJSONtoCSV" style="margin-block-end: 1em">Download Daftar {{ selectedFilter }} Peserta</a>

      <div class="listCard">
        <div class="peserta" v-for="(peserta, index) in filteredPeserta" :key="index">
          <!-- <h3><router-link :to="{path: '/peserta/' + peserta.peserta.Phone}">{{ peserta.peserta.Nama }}</router-link></h3> -->
          <h3 class="name" @click="showDataPeserta(index)">{{ peserta.peserta.Nama }}</h3>
          <h5>{{ peserta.status_pendaftaran }}</h5>
          <p>Komisariat {{ peserta.peserta.Komisariat }} | {{ peserta.peserta.Universitas }}</p>
          <!-- if peserta ktd/ppab dikirim nomor telpon berbeda -->
          <a v-if="peserta.status_pendaftaran == 'Peserta KTD dan PPAB'"
            :href="'https://wa.me/' + peserta.peserta.Phone + '?text=Hallo%20Bung%2FSarinah%21%20%0A%0ADalam%20rangka%20pelaksanaan%20rangkaian%20kegiatan%20%2AKaderisasi%20Tingkat%20Dasar%2A%20%20dan%20%2APekan%20Penerimaan%20Anggota%20Baru%2A%20DPC%20GMNI%20Depok%202024.%20Anda%20dipersilakan%20untuk%20masuk%20ke%20grup%20WhatsApp%20berikut%3A%0A%0A-%20%2AKTD%2A%20%0Ahttps%3A%2F%2Fchat.whatsapp.com%2FLpjupKAvskrEPwFygVTT6C%0A%0A-%20%2APPAB%2A%20%0Ahttps%3A%2F%2Fchat.whatsapp.com%2FJSp3u0Fm6Vd1GcZwyoeJef%0A%0ATerima%20kasihh'">{{
          peserta.peserta.Phone }}</a>

          <a v-if="peserta.status_pendaftaran == 'Peserta KTD'"
            :href="'https://wa.me/' + peserta.peserta.Phone + '?text=Hallo%20Bung%2FSarinah%21%20%0A%0ADalam%20rangka%20pelaksanaan%20rangkaian%20kegiatan%20%2AKaderisasi%20Tingkat%20Dasar%2A%20DPC%20GMNI%20Depok%202024.%20Anda%20dipersilakan%20untuk%20masuk%20ke%20grup%20WhatsApp%20berikut%3A%0A%0A-%20%2AKTD%2A%20%0Ahttps%3A%2F%2Fchat.whatsapp.com%2FLpjupKAvskrEPwFygVTT6C%0A%0ATerima%20kasihh'">{{
          peserta.peserta.Phone }}</a>

          <a v-if="peserta.status_pendaftaran == 'Peserta PPAB'"
            :href="'https://wa.me/' + peserta.peserta.Phone + '?text=Hallo%20Bung%2FSarinah%21%20%0A%0ADalam%20rangka%20pelaksanaan%20rangkaian%20kegiatan%20%2APekan%20Penerimaan%20Anggota%20Baru%2A%20DPC%20GMNI%20Depok%202024.%20Anda%20dipersilakan%20untuk%20masuk%20ke%20grup%20WhatsApp%20berikut%3A%0A%0A-%20%2APPAB%2A%20%0Ahttps%3A%2F%2Fchat.whatsapp.com%2FJSp3u0Fm6Vd1GcZwyoeJef%0A%0ATerima%20kasihh'">{{
          peserta.peserta.Phone }}</a>
          <hr>
        </div>
      </div>
      <div class="floating" v-if="statusDataPeserta">
        <div class="content">
          <PesertaCard :dataPeserta="dataPeserta" @backResponse="clearAlert" />
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { axios } from '@/axios/config.js';
import PesertaCard from '@/components/PesertaCard.vue';

export default {
  name: 'AdmDaftarPeserta',

  components: {
    PesertaCard,
  },

  data() {
    return {
      statusDataPeserta: false,
      dataPeserta: [],
      pesertas: [],
      filteredPeserta: [],
      selectedFilter: 'Semua',
      // waktu: '',
    }
  },

  mounted() {
    this.semuaPeserta();
  },

  computed: {
    totalPeserta() {
      return this.filteredPeserta.length;
    }
  },

  methods: {
    async semuaPeserta() {
      try {
        const result = await axios.get(`/peserta`);
        result.data.peserta.sort((a, b) => (a.peserta.Nama > b.peserta.Nama) ? 1 : -1);
        this.pesertas = result.data.peserta;
        console.log(this.pesertas)
        this.filteredPeserta = this.pesertas; // Initialize filteredPeserta with all pesertas
      } catch (err) {
        console.error(err);
      }
    },

    clearAlert() {
      this.dataPeserta = [];
      this.statusDataPeserta = false;
    },

    showDataPeserta(index) {
      const dataPeserta = this.pesertas[index];
      this.dataPeserta = dataPeserta;
      this.statusDataPeserta = true;
    },

    // Method to filter by KTD
    filterByKTD() {
      this.selectedFilter = 'KTD';
      this.filteredPeserta = this.pesertas.filter(peserta => peserta.peserta.IsKtd && peserta.peserta.IsPpab);
    },

    // Method to filter by Not KTD
    filterByPPAB() {
      this.selectedFilter = 'PPAB';
      this.filteredPeserta = this.pesertas.filter(peserta => peserta.peserta.IsWillPpab && !peserta.peserta.isPpab);
    },

    // Method to show all pesertas
    showAll() {
      this.selectedFilter = 'Semua';
      this.filteredPeserta = this.pesertas;
    },

    convertJSONtoCSV() {
      console.log("berhasil hore")

      let csvContent = "data:text/csv;charset=utf-8,";

      // Headers
      let objNama = Object.keys(this.filteredPeserta[0].peserta.Nama).join(",")

      console.log(objNama)

      csvContent += "Nama\t" + "Komisariat\t" + "Universitas\t" + "Cabang\t" + "Email\t" + "WhatsApp\t" + "Status Peserta\n";

      console.log(csvContent)

      // Rows
      this.filteredPeserta.forEach(item => {
        let values = [];
        values.push(item.peserta["Nama"]); // Add Nama
        values.push(item.peserta["Komisariat"]); // Add Alamat
        values.push(item.peserta["Universitas"]); // Add Alamat
        values.push(item.peserta["Cabang"]); // Add Alamat
        values.push(item.peserta["Email"]); // Add Alamat
        values.push(item.peserta["Phone"]); // Add Alamat
        values.push(item["status_pendaftaran"]); // Add Alamat
        csvContent += values.join(",") + "\n";
      });


      // Create a link element
      const link = document.createElement("a");
      link.setAttribute("href", encodeURI(csvContent));
      link.setAttribute("download", "data.csv");

      console.log(csvContent)


      // Append the link to the body
      document.body.appendChild(link);

      // Trigger the click event on the link
      link.click();

      // Clean up
      document.body.removeChild(link);
    }
  },
}
</script>


<style scoped>
.navButton {
  display: flex;
  gap: 10px;
}

.listCard {
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.listCard .peserta {
  width: 47%;
  text-align: left !important;
}

.listCard .peserta h5 {
  margin-block: 5px 0;
  color: var(--red)
}

.listCard .peserta h3 {
  margin-block: 0;
}

a {
  cursor: pointer;
}

.listCard .peserta a {
  text-decoration: none;
  color: var(--black);
}

.listCard .peserta a:hover {
  color: var(--red);
}

.listCard .peserta p {
  margin-block-end: 7px;
}

.listCard h3.name {
  cursor: pointer;
}
</style>

<style scoped>
@media screen and (max-width:768px) {
  .listCard {
    width: 85%;
  }

  .listCard .peserta {
    width: 100%;
  }
}
</style>