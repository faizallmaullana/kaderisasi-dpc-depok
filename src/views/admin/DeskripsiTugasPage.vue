<template>
  <article id="deskripsi-tugas">
    <h2>Deskripsi Tugas Peserta</h2>
    <br>
    <form @submit.prevent="submitData">
      <textarea cols="10" rows="20" :placeholder="errorMessage" v-model="message"></textarea>
      <br><br>
      <input type="submit" class="inputButton">
    </form>
  </article>
</template>

<script>
import { axios } from '@/axios/config.js';

export default {
  data() {
    return {
      errorMessage: '',
      message: '',
    }
  },

  mounted() {
    this.getTugas();
  },

  methods: {
    async getTugas() {
      try {
        const result = await axios.get("/tugas/deskripsi");
        this.message = result.data.tugas.Tugas;
      } catch {
        this.errorMessage = 'Tugas Masih Kosong'
      }
    },

    async submitData() {
      const data = {
        tugas: this.message,
      }

      try {
        await axios.post("/tugas/deskripsi", data);
        this.$router.push({ name: 'PengumpulanTugasPage' })
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style scoped>
#deskripsi-tugas form {
  width: 100%;
}

#deskripsi-tugas form textarea {
  width: 80%;
  min-height: 20px;
  border-width: 2px 0 2px 0;
  padding: 10px
}

#deskripsi-tugas form textarea:hover {
  border-color: var(--red);
  outline: none;
}
</style>