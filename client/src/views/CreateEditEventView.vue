<script setup lang="ts"></script>
<template>
	<CreateEventForm v-if="$route.path.includes('event/create')" />
	<EditEventForm v-if="$route.path.includes('event/edit')" />
</template>

<style scoped></style>
