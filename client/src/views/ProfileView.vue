<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
</script>
<template>
	<GoBackButton />
	<div class="flex flex-col w-screen md:w-9/12 lg:w-7/12">
		<h2 class="p-2 text-xl text-info">Your Profile</h2>
		<SchoolDetails :orgId="user.id" />
	</div>
</template>

<style scoped></style>
