<script setup>
import HeaderMenu from "../components/HeaderMenu.vue";
defineProps({
  name: {
    type: String,
    default: "EtuService",
  },
});
</script>

<script>
export default {
  data: () => ({
    email : '',
    password: '',
    res: null,
    notAuth: null
  }),

  methods: {
    async onSubmit(e) {
      e.preventDefault()
			//remove the next 2 lines please
      const newInformation = {
        "email": this.email,
        "password": this.password
      }
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Allow-Credentials": "true"
        },
        body: JSON.stringify(newInformation)
      };
      this.res = await (await (await fetch("http://localhost:3000/login", requestOptions)).json())["authentified"] ? true : false;
      this.notAuth = !this.res;
      if (this.res) {
        $cookies.set("email", this.email);
      }
      console.log(this.res);
    }
  }
}
</script>

<template>
  <div class="wrapper">

    <form @submit="onSubmit">
      <HeaderMenu/>
      <h3> Email</h3>
      <input class="text" v-model="email"/>
      <h3> Password</h3>
      <input class="text" v-model="password"/>
      <div class="flex">
        <input type="submit" value="Log in" class="btn"/>
      </div>
    </form>

    <!--div>
			<div>we check if a user is eligible to using the service in the backend </div>
			<div>when he requests it. It makes more sense there instead of here, since we log </div>
			<div>in once, and can use the service link whenever.  </div>
		</div!-->
    <div class="flex" v-if="res">
      <h3 class="auth"> Loged In ! </h3>
      <router-link to="/service"> click here to get redirected</router-link>
    </div>
    <div class="flex" v-else-if="notAuth">
      <h3 class="notAuth"> Unvalid credentials.</h3>
      <router-link to="/service"> Please signup if necessaray.</router-link>
    </div>

  </div>
</template>

<style scoped>
input.text {
  display: flex;
  width: 20vw;
}
@media (min-width: 1024px) {
  input {
    display: flex;
  }
}
h3.auth {
  color: green;
}
h3.notAuth {
  color: red;
}
.flex {
  display: flex;
  justify-content: center;
}
</style>
