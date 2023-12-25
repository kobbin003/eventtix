<template>
	<div
		class="w-2/3 sm:w-1/3 md:w-1/4 flex flex-col justify-center items-center gap-7"
	>
		<img :src="eventNotFoundUrl" alt="" />
		<b class="text-xl">No events found!</b>
		<RouterLink :to="isAuthenticated() ? '/user/event/create' : '/login'">
			<button class="btn btn-sm btn-primary rounded-sm">create event</button>
		</RouterLink>
	</div>
</template>

<script setup lang="ts">
import eventNotFoundUrl from "@/assets/events_not_found.svg";
import { isAuthenticated } from "@/router";
</script>

<style scoped></style>
