<template>
	<div class="w-full bg-green-400">
		<p>School name</p>
		<p>Email</p>
		<p>Address</p>
		<p></p>
		<p></p>
	</div>
	<div v-if="$route.path.includes('user/profile')">
		<button class="btn btn-sm btn-primary rounded-sm">Edit Address</button>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
