<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const isLoginPath = ref(false);

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
	</div>
</template>

<style scoped></style>
