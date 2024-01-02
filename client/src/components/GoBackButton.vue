<template>
	<div>
		<RouterLink :to="isAuthenticated() ? '/user' : '/'"
			><button
				class="btn btn-sm btn-neutral border-2 border-base-content/10 hover:border-base-content/30 rounded-sm my-2 text-base-content bg-base-100 hover:bg-base-100"
			>
				back
			</button></RouterLink
		>
	</div>
</template>

<script setup lang="ts">
import { isAuthenticated } from "@/router";
</script>

<style scoped></style>
