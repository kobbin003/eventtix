<script setup lang="ts">
import ThemeToggler from "./ThemeToggler.vue";
import logoLightUrl from "@/assets/logo_light.png";
import logoDarkUrl from "@/assets/logo_dark.png";
import { ref } from "vue";

const darkenFromThemeToggler = ref();

const themeEventHandler = (arg: boolean) => {
	darkenFromThemeToggler.value = arg;
};
</script>

<template>
	<header class="w-full flex justify-between px-2">
		<img
			:src="darkenFromThemeToggler ? logoDarkUrl : logoLightUrl"
			alt=""
			srcset=""
			width="50"
		/>
		<ThemeToggler @trackDarken="themeEventHandler" />
		<RouterLink to="/login" class="btn btn-primary scale-75 rounded-my-sm"
			><span class="scale-110">Login</span></RouterLink
		>
	</header>
</template>

<style scoped></style>
