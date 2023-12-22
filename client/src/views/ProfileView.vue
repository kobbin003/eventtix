<template>
	<GoBackButton />
	<div class="flex flex-col bg-orange-400 w-screen md:w-9/12 lg:w-7/12">
		<SchoolDetails />
		<div class="flex flex-col">
			<h3 class="text-center">Institute Heirarchy</h3>
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
