<script setup lang="ts">
import ThemeToggler from "./ThemeToggler.vue";
import logoLightUrl from "@/assets/logo_light.png";
import logoDarkUrl from "@/assets/logo_dark.png";
import { ref } from "vue";
import { isAuthenticated } from "@/router";

const darkenFromThemeToggler = ref();
const reRender = ref(false);
const updateRerender = () => (reRender.value = !reRender.value);
const themeEventHandler = (arg: boolean) => {
	darkenFromThemeToggler.value = arg;
};
</script>

<template>
	<header
		class="h-16 fixed bg-base-100 w-full flex items-center justify-between px-2 sm:px-4 md:px-6 py-2 z-10 shadow-md shadow-base-content/5"
	>
		<RouterLink :to="isAuthenticated() ? '/user' : '/'"
			><img
				:src="darkenFromThemeToggler ? logoDarkUrl : logoLightUrl"
				alt=""
				srcset=""
				width="50"
		/></RouterLink>
		<ThemeToggler @trackDarken="themeEventHandler" />

		<div v-if="isAuthenticated()" class="flex items-center gap-2">
			<CreateEventButton
				v-if="!$route.path?.toString().includes('event/create')"
			/>
			<DropDownMenu :updateRerender="updateRerender" />
		</div>

		<RouterLink
			v-else-if="!isAuthenticated()"
			to="/login"
			class="btn btn-sm btn-primary rounded-sm"
			><span class="">Login</span></RouterLink
		>
		<!-- <div v-else></div> -->
	</header>
</template>

<style scoped></style>
