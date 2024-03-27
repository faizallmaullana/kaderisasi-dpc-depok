<template>
  <article>
    <p>{{ peserta }}</p>
  </article>
</template>

<script>
import { axios } from '@/axios/config.js';

export default {
  name: 'AdmHomePage',
  
  data() {
    return {
      peserta: [],
      selectedArea: ''
    }
  },

  mounted() {
    this.semuaPeserta()
  },


  computed: {
    filteredMitra() {
      if (this.selectedArea === 'Semua') {
        return this.peserta;
      } else {
        return this.peserta.filter(peserta => peserta.Nama === this.selectedArea);
      }
    },
    totalMitra() {
      return this.filteredMitra.length;
    }
  },

  methods: {
    async semuaPeserta() {
      try {
        const result = await axios.get("/peserta")
        result.data.peserta.sort((a, b) => (a.Nama > b.Nama) ? 1 : -1);
        this.peserta = result.data.peserta
      } catch (err) {
        console.error(err)
      }
    }
  },
}
</script>