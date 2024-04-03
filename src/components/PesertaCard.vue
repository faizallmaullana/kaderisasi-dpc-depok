<template>
  <div class="floating">
    <div class="content">
      <div class="article" v-if="!statusEditData">
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
      </div>

      <form @submit.prevent="submitData" class="editData" v-if="statusEditData">
        <span class="inputEditData">
          <label for="">Nama</label>
          <input type="text" placeholder="nama" v-model="Nama">
        </span>

        <span class="inputEditData">
          <label for="">Komisariat</label>
          <input type="text" placeholder="Komisariat..." v-model="Komisariat">
        </span>

        <span class="inputEditData">
          <label for="">Universitas</label>
          <input type="text" placeholder="Universitas..." v-model="Universitas">
        </span>

        <span class="inputEditData">
          <label for="">Cabang</label>
          <input type="text" placeholder="Cabang..." v-model="Cabang">
        </span>

        <span class="inputEditData">
          <label for="">Email</label>
          <input type="email" placeholder="Email..." v-model="Email">
        </span>

        <span class="inputEditData">
          <label for="">WhatsApp</label>
          <input type="text" placeholder="Nomor WhatsApp" v-model="Phone">
        </span>

        <span class="inputEditData exept">
          <label for="">Status Peserta</label>
          <span class="divideCheck">
            <span class="check">
              <input id="isKtd" type="checkbox" v-model="IsKtd">
              <label for="isKtd">Peserta KTD</label>
            </span>
            <span class="check">
              <input id="isWillPpab" type="checkbox" v-model="IsWillPpab">
              <label for="isWillPpab">Peserta PPAB</label>
            </span>
          </span>
        </span>

        <input type="submit" value="Ubah Data!" class="inputButton" style="margin-top: 20px;"/>

      </form>

      <div class="bt-divide" v-if="!statusEditData">
        <button @click="$emit('backResponse', false)" class="secondary">Kembali</button>
        <button @click="ubahData">Ubah Data</button>
      </div>
    </div>
  </div>
</template>

<script>
import { toProperCase } from "@/assets/js/toProperCase.js";
import { axios } from "@/axios/config.js"

export default {
  name: 'PesertaCard',

  data() {
    return {
      statusEditData: false,

      ID: this.dataPeserta.peserta.ID,
      Nama: this.dataPeserta.peserta.Nama,
      Komisariat: this.dataPeserta.peserta.Komisariat,
      Universitas: this.dataPeserta.peserta.Universitas,
      Cabang: this.dataPeserta.peserta.Cabang,
      Email: this.dataPeserta.peserta.Email,
      Phone: this.dataPeserta.peserta.Phone,
      IsKtd: this.dataPeserta.peserta.IsKtd,
      IsWillPpab: this.dataPeserta.peserta.IsWillPpab,
      IsPpab: this.dataPeserta.peserta.IsPpab,
    }
  },

  props: {
    dataPeserta: Object,
  },

  methods: {
    ubahData() {
      this.statusEditData = true;
    },

    deleteData() {
      axios.delete(`/peserta/${this.ID}`)
    },

    async submitData() {

      // hati hati sangat komplek dan membingungkan

      let ktd = this.IsKtd;
      let ppab = this.IsPpab;
      let willPpab = this.IsWillPpab;


      if (ktd === true && willPpab === true) {
        willPpab = true;
        ppab = false;
      } else if (ktd === true && willPpab === false) {
        willPpab = false;
        ppab = true;
      } else if (ktd === false && willPpab === true) {
        willPpab = true;
        ppab = false;
      } else {
        this.deleteData();
        window.location.reload();
        return
      }

      const data = {
        Nama: toProperCase(this.Nama),
        Email: this.Email,
        Phone: this.Phone,
        komisariat: this.Komisariat,
        Universitas: this.Universitas,
        Cabang: this.Cabang,
        IsKtd: ktd.toString(),
        IsPpab: ppab.toString(),
        IsWillPpab: willPpab.toString(),
      };

      try {
        await axios.put(`/peserta/${this.ID}`, data);
        window.location.reload();
      }
      catch (error) {
        console.log(error);
        // this.$router.push(`/status/08`);
      }
    }
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
  width: 80vw;
  max-height: 90vh;
  border-radius: 8px;
  max-width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2em 1em;
  gap: 20px;
}

.floating table {
  text-align: left;
  border-spacing: 10px;
}

.floating table td {
  max-width: 30%;
  overflow-wrap: break-word;
  word-break: break-all;
}


.floating img {
  width: 70px;
}

p.statusPendaftaran {
  color: var(--red);
  font-weight: 600;
}

.floating .bt-divide {
  width: 80% !important;
}

.floating form.editData {
  display: flex;
  flex-direction: column;
  width: 80%;
  align-items: center;
  gap: 10px;
}

.floating form.editData span.inputEditData {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}


.floating form.editData span.exept {
  justify-content: flex-start !important;
}

.floating form.editData span.check {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
}

.floating form.editData span.check label {
  width: auto;
}

.floating form.editData span.check input {
  width: auto;
}

.floating form.editData span.divideCheck {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
}


.floating form.editData input {
  margin: 0;
  width: 70%;
}

.floating form.editData label {
  margin: 0;
  width: 30%;
}
</style>

<style scoped>
@media screen and (max-width:768px) {
  .floating .content {
    padding: 0;
  }
}
</style>