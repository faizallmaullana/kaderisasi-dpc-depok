<template>
  <article id="auth">
    <h3>Registration</h3>

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

      <span>
        <label for="confirmPassword">Konfirmasi Password</label>
        <input id="confirmPassword" type="password" placeholder="Konfirmasi Password..." v-model="passwordConfirmation" required>
      </span>

      <span>
        <label for="token">Token</label>
        <input id="token" type="number" placeholder="Token..." v-model="token" required>
      </span>

      <input type="submit" value="Registrasi" class="inputButton">
    </form>
  </article>
</template>

<script>
import {axios} from "@/axios/config.js";

export default {
  name: 'RegistrationPage',

  data() {
    return {
      alertStatus: false,
      alertMessage: '',

      username: '',
      password: '',
      passwordConfirmation: '',
      token: '',
    }
  },

  methods: {
    async submitData() {
      this.submitConfirmation();

      const data = {
        username: this.username.toLowerCase(),
        password: this.password,
        token: this.token,
      };

      try {
        const response = await axios.post("/registration", data);
        const token = response.data.tokenAuth
        localStorage.setItem("tokenAuth", token);
        this.$router.push({ name: 'AdmHomePage' })
      } catch (error) {
        if (error.response.status == 406) {
          this.clearAlert();
          this.alertMessage = "Token tidak valid"
          this.alertStatus = true;
        } else if (error.response.data.message == "username already exists") {
          this.clearAlert();
          this.alertMessage = "Username tidak valid";
          this.alertStatus = true;
        } else {
          this.submitConfirmation();
          // console.log(error);
        }
      }
    },

    submitConfirmation() {
      if (this.password.length < 8) {
        this.alertStatus = true;
        this.alertMessage = "Password must have at least 8 characters";
        return
      } else if (!/[A-Z]/.test(this.password)) {
        this.alertStatus = true;
        this.alertMessage = "Password must contain at least one uppercase letter";
        return
      } else if (!/[a-z]/.test(this.password)) {
        this.alertStatus = true;
        this.alertMessage = "Password must contain at least one lowercase letter";
        return
      } else if (!/\d/.test(this.password)) {
        this.alertStatus = true;
        this.alertMessage = "Password must contain at least one digit";
        return
      } else if (this.password !== this.passwordConfirmation) {
        this.alertStatus = true;
        this.alertMessage = "Password does not match";
        return
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