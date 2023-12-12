<template>
	<div>Event id: {{ eventId }}</div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const eventId = route.params.eventId;
</script>

<style scoped></style>
