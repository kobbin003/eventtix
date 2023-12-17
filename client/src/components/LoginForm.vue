<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import logoLightUrl from "@/assets/logo_light.png";
const router = useRouter();
const email = ref("");
const password = ref("");
const submit = () => {
	console.log("email", email.value);
	router.push({ path: "/user" });
};
</script>

<template>
	<div class="flex justify-center items-center">
		<img :src="logoLightUrl" alt="" class="scale-75" />
	</div>
	<div
		class="flex flex-col gap-2 justify-center items-start bg-white border border-gray-100 shadow-lg py-7 px-9"
	>
		<b class="text-lg">Log in to your account</b>
		<form class="flex flex-col gap-2" @submit.prevent="submit">
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
			<button type="submit" class="btn btn-md btn-info my-5 rounded-sm">
				Login
			</button>
		</form>
		<div class="flex">
			<p>Dont' have an account?</p>
			<RouterLink to="/signup" class="text-primary mx-1">signup</RouterLink>
		</div>
	</div>
</template>

<style scoped></style>
