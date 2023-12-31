<template>
	<div class="w-full flex flex-col gap-4 items-center relative top-1/4">
		<div class="flex flex-col items-center gap-2">
			<IconSuccess />
			<p class="text-2xl font-medium">Congratulations! You got the ticket</p>
			<p class="text-base">The ticket purchase was successful</p>
		</div>
		<RouterLink :to="`/user`">
			<button class="btn btn-sm rounded-sm btn-primary">Go to Home</button>
		</RouterLink>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
