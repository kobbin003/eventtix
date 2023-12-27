<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const { user } = storeToRefs(useUserStore());
// console.log("getting user", user.value);
// console.log("orgId user", user.value.id);
</script>
<template>
	<GoBackButton />
	<div class="flex flex-col w-screen md:w-9/12 lg:w-7/12">
		<h2 class="p-2 text-xl text-info">Your Profile</h2>
		<SchoolDetails :orgId="user.id" />
	</div>
</template>

<style scoped></style>
