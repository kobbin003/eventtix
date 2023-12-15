<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const isLoginPath = ref(false);
// console.log(isLoginPath.value);
watchEffect(() => {
	console.log("watcher", route.path, isLoginPath.value);
	isLoginPath.value = route.path == "/login";
});
</script>

<template>
	<div class="fixed w-screen h-screen bg-gray-400">
		<!-- /** conditionally render LoginForm or RegisterForm */ -->
		<LoginForm v-if="isLoginPath" />
		<SignupForm v-else />
	</div>
</template>

<style scoped></style>
