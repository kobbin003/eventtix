<template>
	<div class="flex">
		<SchoolDetails />
		<div class="flex flex-col items-center">
			<h3>Institute Heirarchy</h3>
			<Heirarchy
				principal="Principal"
				vicePrincipal="Vice Principal"
				:staffs="staffs"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import Heirarchy from "@/components/Heirarchy.vue";
import { ref } from "vue";
const staffs = ref(["staff1", "staff2", "staff3"]);
</script>

<style scoped></style>
