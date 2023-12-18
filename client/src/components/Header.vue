<script setup lang="ts">
import ThemeToggler from "./ThemeToggler.vue";
import logoLightUrl from "@/assets/logo_light.png";
import logoDarkUrl from "@/assets/logo_dark.png";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const darkenFromThemeToggler = ref();

const themeEventHandler = (arg: boolean) => {
	darkenFromThemeToggler.value = arg;
};

watchEffect(() => {
	console.log(route.path);
});
</script>

<template>
	<header class="w-full flex items-center justify-between px-2 sm:px-4 md:px-6">
		<RouterLink to="/user"
			><img
				:src="darkenFromThemeToggler ? logoDarkUrl : logoLightUrl"
				alt=""
				srcset=""
				width="50"
		/></RouterLink>
		<ThemeToggler @trackDarken="themeEventHandler" />

		<div
			v-if="$route.path?.toString().includes('user')"
			class="flex items-center"
		>
			<CreateEventButton
				v-if="!$route.path?.toString().includes('event/create')"
			/>
			<DropDownMenu />
		</div>

		<RouterLink v-else to="/login" class="btn btn-sm btn-primary rounded-my-sm"
			><span class="">Login</span></RouterLink
		>
	</header>
</template>

<style scoped></style>
