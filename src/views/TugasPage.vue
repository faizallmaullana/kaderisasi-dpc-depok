<template>
  <article id="tugas-page">
    <div class="head">
      <h2>Tugas Kaderisasi Tingkat Dasar</h2>

      <p>{{ tugas }}</p>
      <hr>
      <p>Tugas harus dikirim selambat-lambatnya pada <strong>Kamis, 18 April 2024, pukul 23.59.</strong></p>

      <h3>Pengumpulan Tugas</h3>
    </div>

    <form @submit.prevent="submitData">
      <label for="phone">Nomor Telpon</label>
      <input type="text" id="phone" placeholder="Nomor Telpon Terdaftar..." v-model="phone">

      <label for="title">Judul Karya</label>
      <input type="text" id="title" placeholder="Judul Karya..." v-model="title">

      <label for="file">Upload Tugas</label>
      <input type="file" id="file" @change="handleFileChange">

      <p v-if="statusError">{{ statusError }}</p>
      <input type="submit" class="inputButton" value="Upload">
    </form>

    <!-- Button to trigger file download -->
    <!-- <button @click="downloadFile">Download File</button> -->
  </article>

  <div v-if="message" class="cardBerhasilTerkirim">
    <div class="wrapper">
      <h4>Data Berhasil Dikirim</h4>
      <button @click="pushToHome" class="secondary">Kembali ke Halaman Utama</button>
    </div>
  </div>
</template>

<style scoped>
.cardBerhasilTerkirim {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.555);
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cardBerhasilTerkirim h4 {
  margin-block: 0;
}

.cardBerhasilTerkirim .wrapper {
  background-color: white;
  width: 80%;
  height: 200px;
  display: flex;
  gap: 20px;
  border-radius: 8px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
</style>

<script>
import { axios } from "@/axios/config.js";

export default {
  data() {
    return {
      tugas: '',

      idFile: '',

      file: null,
      phone: '',
      title: '',

      statusError: '',
      message: false,
    }
  },

  mounted() {
    this.getTugas();
  },

  methods: {
    handleFileChange(event) {
      // Capture the selected file
      this.file = event.target.files[0];
    },

    async getTugas() {

      try {
        const result = await axios.get('/tugas/deskripsi');
        this.tugas = result.data.tugas.Tugas;
      } catch (err) {
        this.tugas = "Tugas masih kosong"
      }
    },

    async submitMetaData() {
      // Create a FormData object and append the file
      const formData = new FormData();
      formData.append('file', this.file);

      try {
        // Send the formData object to the backend for upload
        await axios.put(`/pengumpulan/tugas/${this.idFile}`, formData);
        this.message = true;
      } catch (error) {
        console.error(error);
      }
    },

    async submitData() {
      const data = {
        id: this.idFile,
        title: this.title,
        phone: this.phone,
      }

      try {
        const result = await axios.post("/pengumpulan/tugas", data);
        this.idFile = result.data.id;
        this.submitMetaData();
      } catch (err) {
        const errorMessage = err.response.data.message;
        if (errorMessage === "nomor telpon tidak terdaftar") {
          this.statusError = errorMessage;
        }
      }
    },

    // ini nanti diisi ketika ingin melakukan download tugas
    async downloadFile() {
      try {
        // Replace 'file_id' with the actual ID of the file you want to download
        const fileID = '4d607662-bcba-4886-b67b-41e5ba191eb7';

        // Send a GET request to download the file from the backend
        const response = await axios.get(`/pengumpulan/tugas/${fileID}`, {
          responseType: 'blob' // Set response type to 'blob' to handle binary data
        });

        // Create a blob URL for the file data
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);

        // Create an anchor element and trigger a download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file_name.csv'); // Replace 'file_name.extension' with the actual file name and extension
        document.body.appendChild(link);
        link.click();

        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      } catch (error) {
        console.error(error);
      }
    },

    pushToHome() {
      this.$router.push({name: 'HomePage'})
    }
  }
}
</script>

<style scoped>
#tugas-page form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

#tugas-page .head {
  max-width: 90%;
}
</style>