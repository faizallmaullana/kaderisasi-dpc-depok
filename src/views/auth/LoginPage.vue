<template>
  <article id="auth">
    <h3>Login</h3>

    <form @submit.prevent="submitData">
      <p style="color:var(--red)" v-if="alertStatus">{{ alertMessage }}</p>
      <span>
        <label for="username">Username</label>
        <input id="username" type="text" placeholder="Username..." v-model="username" required>
      </span>

      <span>
        <label for="password">Password</label>
        <input id="password" type="password" placeholder="Password..." v-model="password" required>
      </span>

      <input type="submit" value="Login" class="inputButton">
    </form>
  </article>
</template>

<script>
import { axios } from "@/axios/config.js";

export default {
  name: 'LoginPage',

  data() {
    return {
      alertStatus: false,
      alertMessage: '',

      username: '',
      password: '',
    }
  },

  methods: {
    async submitData() {
      const data = {
        username: this.username.toLowerCase(),
        password: this.password,
      };

      try {
        const result = await axios.post("/login", data)
        const token = result.data.token;
        localStorage.setItem("tokenAuth", token);
        this.$router.push({ name: 'AdmHomePage' })
      } catch (error) {
        const status = error.response.status;

        if (status == "401") {
          this.alertStatus = true;
          this.alertMessage = "Username atau password salah";
          window.location.reload();
        }
        console.error(error)
      }
    },
  },

  beforeCreate() {
    // kick if user is already logged in
    const token = localStorage.getItem("tokenAuth");
    if (token) {
      this.$router.push({ name: 'AdmHomePage' })
    }
  }
}
</script>