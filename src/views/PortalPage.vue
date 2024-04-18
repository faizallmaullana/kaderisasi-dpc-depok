<template>
  <div id="portal">
    <section>
      <div class="title">
        <img src="@/assets/logo-dpc.png" alt="DPC GMNI DEPOK">
        <h1>Selamat Datang di Portal Kaderisasi Tingkat Dasar!</h1>
        <div class="instansi">
          <h2>Dewan Pimpinan Cabang</h2>
          <h2 class="em-red">Gerakan Mahasiswa Nasional Indonesia</h2>
          <h2>Kota Depok</h2>
        </div>
        <p>Let's Come and Join Us!</p>
      </div>

      <div class="tema">
        <h3>Memaknai Marhaenisme Guna Menghadapi Bonus Demografi</h3>
      </div>
    </section>


    <div class="count-down">
      <div class="wrapper">
        <h2>KTD akan dilaksanakan dalam</h2>
        <h1>{{ countdown.days }} Hari : {{ countdown.hours }} Jam : {{ countdown.minutes }} Menit : {{ countdown.seconds
          }} Detik</h1>
      </div>
    </div>

    <div class="informations">
      <div class="wrapper">
        <div class="info">
          <button @click="rincian('ktd')">Kaderisasi Tingkat Dasar itu apa sih?</button>
          <p v-if="ktd">
            <strong>Kaderisasi Tingkat Dasar (KTD)</strong> itu kayak langkah awal buat jadi kader GMNI yang mantap.
            Jadi, setelah lewat PPAB, kita masuk ke proses KTD ini. Nah, di KTD, kita enggak cuma diajarin tentang
            ideologi Marhaenisme secara biasa-biasa aja. Lebih dari itu, KTD ini tuh bener-bener ngasih kita pemahaman
            yang dalam tentang Marhaenisme, dari yang sifatnya nggak cuma teoritis doang, tapi juga praktis banget.

            Jadi, tujuannya bukan cuma bikin kita ngerti aja, tapi juga meyakini banget sama Marhaenisme sebagai cara
            kita berpikir dan bertindak. Harapannya, setelah lewat proses KTD, kita bakal jadi kader GMNI yang
            bener-bener siap tempur, dari cara mikir sampe cara bertindak sehari-hari.

            Intinya, KTD ini tuh kayak pembekalan buat jadi kader yang punya pemahaman yang kuat tentang Marhaenisme,
            siap berjuang buat organisasi dan ideologi, serta punya kepribadian yang keren banget!
          </p>
        </div>
        <div class="info">
          <button @click="rincian('ppab')">Kalo PPAB apa?</button>
          <p v-if="ppab">
            <strong>PPAB (Pekan Penerimaan Anggota Baru)</strong> itu kayak jendela buat mahasiswa-mahasiswi Indo buat
            masuk ke dalam dunia GMNI. Jadi, GMNI tuh kayak komunitas keren gitu, yang punya misi buat ngebantu bangsa
            kita. Nah, pas PPAB, kita bukan cuma dikenalin sama GMNI, tapi juga diajarin apa aja yang harus kita lakuin
            kalo jadi bagian dari mereka. Mulai dari tugas, tanggung jawab, sampe visi-misi yang mereka usung.

            Ide utamanya sih, biar kita sebagai calon anggota bisa ngerti apa aja yang GMNI hadirin. Kan tujuannya bukan
            cuma jadi anggota doang, tapi juga ikut berkontribusi buat bangsa dan negara kita. Jadi, di PPAB ini, kita
            diharapkan bisa nyambung sama nilai-nilai GMNI, terutama soal kepekaan terhadap masalah sosial yang lagi
            terjadi.

            Intinya sih, PPAB tuh ngajakin kita buat gabung sama GMNI, jadi bagian dari anak muda yang peduli sama
            ketidakadilan di sekitar kita. Apalagi, GMNI tuh tempatnya buat berkembang jadi pemimpin masa depan yang
            penuh semangat!
          </p>
        </div>
        <div class="info">
          <button @click="rincian('syarat')">Syarat ikut KTD apa?</button>
          <p v-if="syarat">
            Buat ikutan KTD, kamu <strong>harus </strong>udah jadi anggota resmi GMNI lewat PPAB dan juga
            <strong>terdaftar</strong> di komisariat asal. Terus, kamu juga harus tegasin komitmen kamu sama ideologi
            Marhaenisme, plus siap belajar dan praktikin itu ideologi dalam kehidupan sehari-hari. Pokoknya, hadir dan
            aktif dalam semua kegiatan KTD, patuh sama aturan yang ada, dan jangan lupa, selalu punya sikap kritis dan
            kreatif!
          </p>
        </div>
        <div class="call">
          <button @click="pushPage('HomePage')">Gabung dan Daftar Sekarang</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ktd: false,
      ppab: false,
      syarat: false,
      countdown: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      },
      countdownInterval: null,
      targetDate: new Date('2024-04-26T00:00:00')
    };
  },
  methods: {
    rincian(bagian) {
      switch (bagian) {
        case "ktd":
          this.ktd = !this.ktd;
          break;
        case "ppab":
          this.ppab = !this.ppab;
          break;
        case "syarat":
          this.syarat = !this.syarat;
          break;
        default:
          break;
      }
    },

    pushPage(page) {
      this.$router.push({ name: page })
    },

    startCountdown() {
      this.updateCountdown(); // Initial call to update countdown immediately
      this.countdownInterval = setInterval(this.updateCountdown, 1000); // Update countdown every second
    },
    updateCountdown() {
      const now = new Date();
      const difference = this.targetDate - now;

      if (difference <= 0) {
        clearInterval(this.countdownInterval);
        return;
      }

      this.countdown.days = Math.floor(difference / (1000 * 60 * 60 * 24));
      this.countdown.hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.countdown.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      this.countdown.seconds = Math.floor((difference % (1000 * 60)) / 1000);
    }
  },
  mounted() {
    this.startCountdown(); // Start the countdown when the component is mounted
  }
};
</script>

<style scoped>
#portal {
  width: 100%;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

#portal section {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

#portal .title {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 70px);
}

#portal .title img {
  width: 180px;
}

#portal .title h1 {
  color: var(--red);
  font-size: 40px;
  font-weight: 600;
}

#portal .title .instansi h2 {
  margin-block: 0;
  font-weight: 300;
}

#portal .title .instansi h2.em-red {
  color: var(--red);
  font-weight: 600;
  font-size: 2em;
}

#portal .tema {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--red);
  width: 100%;
  color: var(--white);
  height: 80px;
}

#portal .tema h3 {
  margin-block: 0;
}

#portal .count-down {
  box-shadow: 0 0 7px 0 #888;
  color: var(--red);
  border-radius: 10px;
  background-color: white;
}

#portal .count-down .wrapper {
  margin: 15px 25px;
}

#portal .informations {
  background-color: white;
  overflow: hidden;
  width: 95%;
  border-radius: 10px;
  box-shadow: 0 0 7px 0 #888;
}

#portal .informations .wrapper {
  margin: 0;
}

#portal .informations .info p {
  margin: 20px;
  text-align: start;
  font-size: 0.9em;
  line-height: 1.5;
}

#portal .informations button {
  width: 100%;
  border-color: white;
  border-width: 0 0 1px 0;
  text-align: start;
  background-color: #eeb0b0;
  color: var(--black);
  font-weight: 300;
}

#portal .informations button:hover {
  background-color: var(--red);
  color: var(--white);
}

#portal .call button {
  width: auto !important;
  border-color: white;
  border-width: 0;
  text-align: start;
  font-size: 1em;
  background-color: var(--red);
  color: var(--white);
  padding: 20px 30px;
  font-weight: 600;
  border-radius: 5px;
}

#portal .call button:hover {
  background-color: #eeb0b0;
  color: var(--black);
}


#portal .informations .call {
  padding: 50px 0
}
</style>