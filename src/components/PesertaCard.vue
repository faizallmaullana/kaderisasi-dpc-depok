<template>
  <div class="floating">
    <div class="content">
      <div class="article">
        <p>PesertaCard</p>
        <p>{{ dataPeserta }}</p>
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
  position: fixed; /* Changed to fixed to ensure it stays on top even when scrolling */
  background-color: rgba(17, 17, 17, 0.7);
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* Set a high z-index to ensure it's on top of other content */
}

.floating .content {
  background-color: white;
  width: 90vw;
  border-radius: 8px
}

.floating .article {
  margin: 15px;
}

</style>