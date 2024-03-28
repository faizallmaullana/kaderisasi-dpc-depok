<template>
  <article>
    <table>
      <tr>
        <th>No</th>
        <th>Nama</th>
        <th>Komisariat</th>
        <th>Peserta</th>
      </tr>
      <tr v-for="(peserta, index) in pesertas" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ peserta.Nama }}</td>
        <td>{{ peserta.Komisariat }}</td>
        <td></td>
      </tr>
    </table>
    <p>{{ pesertas }}</p>
  </article>
</template>

<script>
import { axios } from '@/axios/config.js';

export default {
  name: 'AdmHomePage',
  
  data() {
    return {
      pesertas: [],
      selectedArea: ''
    }
  },

  mounted() {
    this.semuaPeserta()
  },


  computed: {
    filteredMitra() {
      if (this.selectedArea === 'Semua') {
        return this.pesertas;
      } else {
        return this.pesertas.filter(peserta => peserta.Nama === this.selectedArea);
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
        this.pesertas = result.data.peserta
      } catch (err) {
        console.error(err)
      }
    }
  },
}
</script>