<template>
	<div>
		<SearchForm />
		<h3>Events</h3>
		<!-- <ul>
			<li v-for="item in [1, 2, 3]">{{ item }}</li>
		</ul> -->
		<EventCard />
	</div>
</template>

<script setup lang="ts">
import SearchForm from "@/components/SearchForm.vue";
</script>

<style scoped></style>
