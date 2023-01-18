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
    res: null,
		email: null,
		emailNotSet: true, //string later, used to check if set
    notRes: null,
    useLeft: null,
  }),
	mounted(){//on page mount
		this.email = $cookies.get("email");
		if(this.email){
			this.emailNotSet = false;
			this.accessService();
		}
	},

  methods: {
    async accessService() {

			//remove the next 2 lines please

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Allow-Credentials": "true"
        },
        body: JSON.stringify({email: this.email})
      };
			let fetchRes = await (await fetch("http://localhost:3000/service", requestOptions)).json();
      this.res = fetchRes["canUse"] ? true : false;
      this.useLeft = fetchRes["useLeft"];

      this.notAuth = !this.res;

      console.log(this.res);
    }
  }
}
</script>

<template>
	<HeaderMenu />
	<h1>imagine something cool here</h1>
	<div class="wrapper">
		<h3 v-if="res" class="auth">authorized to use service : {{ this.useLeft }} uses left </h3>
		<h3 v-else-if="emailNotSet" class="notAuth">Not logged in !</h3>
		<h3 v-else class="notAuth">Unauthorized to use service !</h3>
	</div>
</template>

<style scoped>
h1 {
	font-weight: 500;
	font-size: 2.6rem;
	top: -10px;
}

h3.auth {
  color: green;
}
h3.notAuth {
  color: red;
}

.wrapper{
	display:flex;
	justify-content: center;
}

@media (min-width: 1024px) {
	h1 {
		text-align: left;
	}
}
</style>
