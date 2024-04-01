<template>
  <div class="floating">
    <div class="content">
      <div class="article">
        <img src="@/assets/logo.png" alt="">
        <h2>{{ dataPeserta.peserta.Nama }}</h2>
        <p class="statusPendaftaran">{{ dataPeserta.status_pendaftaran }}</p>
        <table>
          <th>
            <tr>Komisariat</tr>
            <tr>Universitas</tr>
            <tr>Cabang</tr>
            <tr>Email</tr>
            <tr>WhatsApp</tr>
          </th>
          <td>
            <tr>{{ dataPeserta.peserta.Komisariat }}</tr>
            <tr>{{ dataPeserta.peserta.Universitas }}</tr>
            <tr>{{ dataPeserta.peserta.Cabang }}</tr>
            <tr>
              <a :href="'mailto:' + dataPeserta.peserta.Email">{{ dataPeserta.peserta.Email }}</a>
            </tr>
            <tr>
              <a :href="'https://wa.me/' + dataPeserta.peserta.Phone">{{ dataPeserta.peserta.Phone }}</a>
            </tr>
          </td>
        </table>

        <div class="bt-divide">
            <button @click="$emit('backResponse', false)" class="secondary">Kembali</button>
            <button @click="pushPendaftaran">Ubah Data</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PesertaCard',

  props: {
    dataPeserta: Object,
  }
}
</script>

<style scoped>
.floating {
  position: fixed;
  /* Changed to fixed to ensure it stays on top even when scrolling */
  background-color: rgba(17, 17, 17, 0.7);
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  /* Set a high z-index to ensure it's on top of other content */
}

.floating .content {
  background-color: white;
  width: 90vw;
  border-radius: 8px;
  max-width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.floating table {
  text-align: left;
  border-spacing: 10px;
}

.floating .article {
  margin: 40px 25px;
}

.floating img {
  width: 70px;
}

p.statusPendaftaran {
  color: var(--red);
  font-weight: 600;
}
</style>