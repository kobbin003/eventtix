<template>
	<div class="w-full bg-blue-400">
		<img :src="eventPoster" alt="" class="w-full" />
		<div><h2 class="text-lg">title</h2></div>
		<div><p class="text-sm">Description</p></div>
		<div>
			<p>location</p>
			<p>price</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import eventPoster from "@/assets/zfm.jpeg";
</script>

<style scoped></style>
