<template>
  <div id="Admin">
    <article class="round">
      <div class="navButton">
        <button @click="filterByKTD">KTD</button>
        <button @click="filterByPPAB">PPAB</button>
        <button @click="showAll">Semua Peserta</button>
      </div>

      <h2 v-if="selectedFilter != 'Semua'" style="margin-block-end:0.5em">Peserta {{ selectedFilter }} ({{
          filteredPeserta.length }})</h2>
      <h2 v-else style="margin-block-end:0.5em">{{ selectedFilter }} Peserta ({{ filteredPeserta.length }})</h2>

      <a v-if="selectedFilter != 'Semua'" @click="convertJSONtoCSV" style="margin-block-end: 1em">Download Daftar
        Peserta {{ selectedFilter }}</a>
      <a v-else @click="convertJSONtoCSV" style="margin-block-end: 1em">Download Daftar {{ selectedFilter }} Peserta</a>

      <div class="listCard">
        <div class="peserta" v-for="(peserta, index) in  filteredPeserta " :key="index">
          <!-- <h3><router-link :to="{path: '/peserta/' + peserta.peserta.Phone}">{{ peserta.peserta.Nama }}</router-link></h3> -->

          <div class="profile">
            <span>
              <h3 class="name" @click="showDataPeserta(index)">{{ peserta.peserta.Nama }}</h3>
              <h5>{{ peserta.status_pendaftaran }} <em>- <a v-if="peserta.essay_dikumpulkan"
                    @click="downloadEssay(peserta.peserta.Phone)">essay</a></em></h5>

            </span>

            <div v-if="selectedFilter != 'Semua'" class="kehadiran">
              <label for="hadir" style="color: var(--red);">Presensi</label>
              <input v-if="selectedFilter == 'KTD'" id="hadir" type="checkbox"
                @click="presensiKehadiran(selectedFilter, peserta.peserta.ID, peserta.ktd_hadir)"
                :checked="peserta.ktd_hadir">
              <input v-if="selectedFilter == 'PPAB'" id="hadir" type="checkbox"
                @click="presensiKehadiran(selectedFilter, peserta.peserta.ID, peserta.ppab_hadir)"
                :checked="peserta.ppab_hadir">
            </div>
          </div>

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

      buttonKehadiran: 'Absen',
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
      this.filteredPeserta = this.pesertas.filter(peserta => peserta.peserta.IsKtd && (peserta.peserta.IsPpab || peserta.ppab_hadir));
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

    async presensiKehadiran(tipePeserta, idPeserta, statusKehadiran) {
      // Update the statusKehadiran based on the selectedFilter
      this.pesertas.forEach(peserta => {
        if (peserta.peserta.ID === idPeserta) {
          if (tipePeserta === 'KTD') {
            peserta.ktd_hadir = !statusKehadiran;
          } else if (tipePeserta === 'PPAB') {
            peserta.ppab_hadir = !statusKehadiran;
          }
        }
      });

      if (statusKehadiran == false) {
        // Assuming your backend API call to update the statusKehadiran
        await axios.post(`/presensi/${tipePeserta}/${idPeserta}`);
      }

      else if (statusKehadiran == true) {
        await axios.delete(`/presensi/${tipePeserta}/${idPeserta}`);
      }

      // Optionally, you can refresh the filteredPeserta list to reflect the changes immediately
      // this.filteredPeserta = [...this.pesertas];

      // If you don't want to refresh the entire list, you can just update the specific peserta object in filteredPeserta
    },

    convertJSONtoCSV() {

      let csvContent = "data:text/csv;charset=utf-8,";

      // Headers
      csvContent += "Nama\t" + "Komisariat\t" + "Universitas\t" + "Cabang\t" + "Email\t" + "WhatsApp\t" + "Status Peserta\t" + "Presensi PPAB\t" + "Presensi KTD\t" + "Essay\n";

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
        values.push(item["ppab_hadir"]); // Add Alamat
        values.push(item["ktd_hadir"]); // Add Alamat
        values.push(item["essay_dikumpulkan"]); // Add Alamat
        csvContent += values.join(",") + "\n";
      });


      // Create a link element
      const link = document.createElement("a");
      link.setAttribute("href", encodeURI(csvContent));

      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().slice(0, 10); // Format: YYYY-MM-DD
      link.setAttribute("download", "GMNI_" + this.selectedFilter + "_" + formattedDate + ".csv");


      // Append the link to the body
      document.body.appendChild(link);

      // Trigger the click event on the link
      link.click();

      // Clean up
      document.body.removeChild(link);
    },

    async downloadEssay(phone) {
      try {
        // Replace 'file_id' with the actual ID of the file you want to download
        const result = await axios.get(`/pengumpulan/tugasName/${phone}`)
        const FileName = result.data.filename;

        // Send a GET request to download the file from the backend
        const response = await axios.get(`/pengumpulan/tugas/${phone}`, {
          responseType: 'blob' // Set response type to 'blob' to handle binary data
        });

        // Create a blob URL for the file data
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);

        // Create an anchor element and trigger a download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', FileName); // Replace 'file_name.extension' with the actual file name and extension
        document.body.appendChild(link);
        link.click();

        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      } catch (error) {
        console.error(error);
      }
    },
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

.listCard .profile {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.listCard .profile .kehadiran {
  display: flex;
  gap: 10px;
  align-items: center;
}

.listCard h5 em {
  color: #0d048a
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