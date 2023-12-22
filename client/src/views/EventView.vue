<template>
	<GoBackButton />
	<div class="flex flex-col md:flex-row">
		<div class="w-screen md:w-1/2"><EventDetails /></div>
		<div class="flex justify-center w-screen md:w-1/2 bg-green-400">
			<Heirarchy
				principal="event principal"
				vicePrincipal="event vice principal"
				:staffs="['staff one', 'staff two']"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const eventId = route.params.eventId;
</script>

<style scoped></style>
