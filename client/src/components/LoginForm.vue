<template>
	<div class="flex justify-center items-center">Login form</div>
	<div class="flex flex-col justify-center items-center bg-gray-500">
		<form class="flex flex-col bg-blue-300" @submit.prevent="submit">
			<label for="email">Email</label>
			<input
				v-model="email"
				type="email"
				name="email"
				id="email"
				class="input input-bordered rounded-sm"
			/>
			<label for="password">Password</label>
			<input
				type="password"
				name="password"
				id="password"
				class="input input-bordered rounded-sm"
			/>
			<button type="submit">Login</button>
		</form>
		<div class="flex">
			<p>Dont' have an account?</p>
			<RouterLink to="/signup">signup</RouterLink>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const submit = () => {
	console.log("email", email.value);
};
</script>

<style scoped></style>
