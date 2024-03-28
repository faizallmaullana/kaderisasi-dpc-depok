<template>
  <article>
    <h2>Halaman Pengelolaan Database</h2>

    <div>
      <button @click="downloadDatabase">Download Database</button>
    </div>

    <div class="token" v-if="token">
      <h1>{{ NomorToken }}</h1>
      <p>Token digunakan untuk registrasi admin baru</p>
    </div>

    <button @click="getToken">Dapatkan Nomor Token</button>
  </article>
</template>

<script>
import { axios } from '@/axios/config.js';

export default {
  name: "DatabaseManagement",

  data() {
    return {
      token: false,
      NomorToken: '',
    }
  },

  methods: {
    downloadDatabase() {
      axios.get('/getdb', { responseType: 'blob' })
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `database ${this.getCurrentDate()}.db`);
          document.body.appendChild(link);
          link.click();
        })
        .catch(error => {
          console.error('Error downloading database:', error);
        });
    },

    getCurrentDate() {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0'); // January is 0!
      const year = now.getFullYear().toString().slice(-2); // Extracting last two digits of the year
      return `${day}-${month}-${year}`;
    },

    async getToken() {
      try {
        const result = await axios.get("/token")
        const token = result.data.token;
        this.token = true;
        this.NomorToken = token;
      } catch (error) {
        console.log(error);
      }
    }
  },
}
</script>
