<template>
	<div class="w-full flex flex-col gap-4 items-center relative top-1/4">
		<div class="flex flex-col items-center gap-2">
			<IconFailure />
			<p class="text-2xl font-medium">Whoops!</p>
			<p class="text-base">Your payment request failed</p>
		</div>
		<RouterLink :to="`/event/${$route.params.eventId}`">
			<button class="btn btn-sm rounded-sm btn-primary">Try Again</button>
		</RouterLink>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
