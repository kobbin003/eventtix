<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const password = ref("");
const submit = () => {
	console.log("email", email.value);
};
</script>

<template>
	<div class="flex justify-center items-center">Logo</div>
	<div class="flex flex-col justify-center items-center">
		<form class="flex flex-col" @submit.prevent="submit">
			<label for="email">Email</label>
			<input
				v-model="email"
				type="email"
				name="email"
				id="email"
				class="input input-sm input-bordered rounded-sm bg-#d8d8da"
			/>
			<label for="password">Password</label>
			<input
				v-model="password"
				type="password"
				name="password"
				id="password"
				class="input input-sm input-bordered rounded-sm bg-#d8d8da"
			/>
			<button type="submit" class="btn btn-md btn-info my-5">Login</button>
		</form>
		<div class="flex">
			<p>Dont' have an account?</p>
			<RouterLink to="/signup" class="text-primary mx-1">signup</RouterLink>
		</div>
	</div>
</template>

<style scoped></style>
