<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const isLoginPath = ref(false);
// console.log(isLoginPath.value);
const date = ref();
const time = ref();

watchEffect(() => {
	console.log("watcher", route.path, isLoginPath.value);
	isLoginPath.value = route.path == "/login";
});

watchEffect(() => {
	// automatically converts UTC to +05:30
	console.log(new Date("2023-12-14T10:34:37.712z"));
});
</script>

<template>
	<div class="flex flex-col items-center w-screen min-h-screen bg-white">
		<LoginForm v-if="isLoginPath" />
		<SignupForm v-else />
		<!-- <input type="date" name="" id="" v-model="date" /> -->
		<!-- <input type="time" name="" id="" v-model="time" /> -->
	</div>
</template>

<style scoped></style>
