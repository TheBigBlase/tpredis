<script setup>
import MainScreen from "../components/MainScreen.vue";
import Button from "../components/Button.vue";
</script>

<template>
	<div class="wrapper">
		<div>
			<header>
				<img
					alt="Polytech logo"
					class="logo"
					src="../assets/polytech.png"
					width="125"
					height="125"
				/>

				<div class="wrapper">
					<MainScreen msg="EtuService" />
				</div>
			</header>
			<main>
				<div class="grid" id="centerGrid">
					<Button name="Login" url="login" />
				</div>
			</main>
		</div>
	</div>
</template>

<style scoped>

.logo {
	display: block;
	margin: 0 auto 2rem;
}

#centerGrid {
	grid-template-columns: 1fr;
}

.wrapper{
	place-items: center;
	justify-content: center;
}

@media (min-width: 1024px) {
	header {
		display: flex;
		place-items: center;
		padding-right: calc(var(--section-gap) / 2);
	}

	.logo {
		margin: 0 2rem 0 0;
	}

	header .wrapper {
		display: flex;
		place-items: flex-start;
		flex-wrap: wrap;
	}

	main {
		padding-top: 50px;
	}
}
</style>
