<template>
  <div id="Admin">
    <article class="round">
      <div class="navButton">
        <button @click="filterByKTD">KTD</button>
        <button @click="filterByPPAB">PPAB</button>
        <button @click="showAll">Semua Peserta</button>
      </div>

      <br>

      <h2 v-if="selectedFilter != 'Semua'">Peserta {{ selectedFilter }}</h2>
      <h2 v-else>{{ selectedFilter }} Peserta</h2>
      
      <div class="listCard">
        <div class="peserta" v-for="(peserta, index) in filteredPeserta" :key="index">
          <h3>{{ peserta.peserta.Nama }}</h3>
          <h5>{{ peserta.status_pendaftaran }}</h5>
          <p>Komisariat {{ peserta.peserta.Komisariat }} | {{ peserta.peserta.Universitas }}</p>
          <a :href="'https://wa.me/' + peserta.peserta.Phone">{{ peserta.peserta.Phone }}</a>
          <hr>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { axios } from '@/axios/config.js';

export default {
  name: 'AdmDaftarPeserta',

  data() {
    return {
      pesertas: [],
      filteredPeserta: [],
      selectedFilter: 'Semua',
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