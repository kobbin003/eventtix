<template>
	<div class="flex flex-col justify-center items-center min-h-screen">
		<h1 class="text-2xl">Page Not Found!</h1>
		<img
			:src="PageNotFoundUrl"
			alt=""
			class="w-screen h-auto md:h-[70vh] md:w-auto md:min-h-[400px]"
		/>
		<RouterLink to="/user"
			><button class="btn btn-primary btn-sm rounded-sm">
				Go back to Home
			</button></RouterLink
		>
	</div>
</template>
<script setup lang="ts">
import PageNotFoundUrl from "@/assets/404.png";
</script>
<style></style>
