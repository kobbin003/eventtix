<template>
	<div>
		<SearchForm />
		<ul class="py-2 md:py-4">
			<li v-for="item in [1, 2, 3]">
				<EventCard />
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import SearchForm from "@/components/SearchForm.vue";
</script>

<style scoped></style>
