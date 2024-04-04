<template>
  <article>
    <h1>{{ peserta.Nama }}</h1>
    <p v-if="peserta.CreatedAt">{{ peserta.CreatedAt.slice(0, 10) }}</p>
    <p><a :href="'mailto:' + peserta.Email">{{ peserta.Email }}</a></p>
    <p><a :href="'https://wa.me/' + phoneNumber">{{ phoneNumber }}</a></p>
    <p>Komisariat {{ peserta.Komisariat }}</p>
    <p>Universitas {{ peserta.Universitas }}</p>
    <p>Cabang {{ peserta.Cabang }}</p>
  </article>
</template>

<script>
import { axios } from '@/axios/config.js';

export default {
  name: 'DataPesertaPage',

  data() {
    return {
      phoneNumber: '',
      peserta: [],
    }
  },

  created() {
    this.phoneNumber = this.$route.params.phone;
    this.GetDataPeserta();

  },

  methods: {
    async GetDataPeserta() {
      const result = await axios.get(`/peserta/${this.phoneNumber}`);
      this.peserta = result.data.peserta;
    }
  }
}
</script>