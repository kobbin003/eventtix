<template>
	<!-- eventslist for public -->
	<div>
		<EventsList />
	</div>
</template>

<script setup lang="ts">
import EventsList from "@/components/EventsList.vue";
const props = defineProps({ someProp: String });
console.log(props.someProp);
</script>

<style scoped></style>
