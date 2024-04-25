<template>
  <div id="LandingPage">
    <div class="heroImage">
      <div class="temaKegiatan">
        <h2>Memaknai Marhaenisme guna Menghadapi Bonus Demografi</h2>
      </div>
      <img src="@/assets/hero.jpg" alt="">
    </div>

    <article>
      <h1>Page 404 Not Found</h1>
    </article>
  </div>
</template>

<style scoped>
#LandingPage article h1 {
  color: var(--red);
} 

#LandingPage .header h2 {
  font-size: 25px;
}

#LandingPage form p {
  margin-block: none;
  text-align: end;
}

#LandingPage .cekPeserta {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.inputBiasa {
  margin: 0;
}

.option {
  display: flex;
  gap: 20px
}

form input.pendaftaran {
  padding: 15px 20px;
}

form input.cekStatus {
  background-color: transparent;
  border-width: 3px;
  color: var(--red);
  border-style: solid;
  border-color: var(--red)
}

form input.cekStatus:hover {
  background-color: var(--red);
  color: var(--white);
}
</style>