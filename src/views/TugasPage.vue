<template>
  <article id="tugas-page">
    <div class="head">
      <h2>Tugas Kaderisasi Tingkat Dasar</h2>

      <p>{{ tugas }}</p>

      <p>Template tugas bisa didapat dengan melakukan klik pada link di bawah:</p>
      <h4><a href="@/assets/template.docx" download="Template Tugas KTD.docx">Template Tugas</a></h4>
      <hr>
      <p>Tugas harus dikirim selambat-lambatnya pada <strong>Rabu, 24 April 2024, pukul 23.59</strong> menggunakan file
        berformat <strong>.pdf</strong></p>

      <h3>Pengumpulan Tugas</h3>
    </div>

    <form @submit.prevent="submitData">
      <label for="phone">Nomor Telpon</label>
      <input type="text" id="phone" placeholder="Nomor Telpon Terdaftar..." v-model="phone" required>

      <label for="title">Judul Karya</label>
      <input type="text" id="title" placeholder="Judul Karya..." v-model="title" required>

      <label for="file">Upload Tugas</label>
      <input type="file" id="file" @change="handleFileChange" required>

      <p v-if="statusError">{{ statusError }}</p>
      <input type="submit" class="inputButton" value="Upload">
    </form>
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
      const selectedFile = event.target.files[0];
      const allowedExtensions = /(\.pdf)$/i;  // Regular expression for PDF files

      // Check if the selected file has a valid extension
      if (!allowedExtensions.test(selectedFile.name)) {
        // Display an error message
        this.statusError = "Hanya diijinkan mengirim file PDF";
        // Clear the file input
        event.target.value = null;
        // Set the file to null
        this.file = null;
      } else {
        // Reset error message if file is valid
        this.statusError = "";
        // Set the file to the selected file
        this.file = selectedFile;
      }
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
        const statusCode = err.response.status;
        const errorMessage = err.response.data.message;

        if (statusCode == 400) {
          this.statusError = "Anda memasukan format nomor telpon yang tidak tepat"
        } else if (statusCode == 406) {
          this.statusError = "Nomor telpon tidak terdaftar";
        } else if (statusCode == 409) {
          this.statusError = "Anda sudah pernah mengirim tugas, silakan hubungi narahubung Faizal untuk mengirim ulang tugas Anda."
        } else if (statusCode == 500) {
          this.statusError = "Anda memasukan format nomor telpon yang salah"
        } else {
          this.statusError = "undefined error. Silahkan hubungi narahubung yang tertera"
        }

        if (errorMessage === "nomor telpon tidak terdaftar") {
          this.statusError = 'Nomor Telpon tidak terdaftar';
          return
        }
      }
    },

    pushToHome() {
      this.$router.push({ name: 'HomePage' })
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