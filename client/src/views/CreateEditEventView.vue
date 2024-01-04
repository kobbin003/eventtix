<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { user } = storeToRefs(useUserStore());
console.log("user", user.value);
</script>
<template>
	<div
		v-if="!user.payment || (user.payment && !user.payment.detailsSubmitted)"
		class="bg-base-content/5 md:w-max m-4 flex flex-col gap-2 p-4"
	>
		<div class="py-4">
			<h2 class="text-xl text-info">Create a new event</h2>
		</div>
		<div class="flex items-start gap-2">
			<div class="relative top-1">
				<IconInfo />
			</div>
			<div class="flex flex-col gap-2">
				<p class="text-lg">
					It seems like you have not yet set up your payment account
				</p>
				<p class="">
					Events can be created only after setting up payment account
				</p>
				<RouterLink
					to="/user/profile/payment"
					class="btn btn-sm btn-primary rounded-sm w-max font-normal mt-2"
					>Go to payment section</RouterLink
				>
			</div>
		</div>
	</div>
	<div v-else>
		<CreateEventForm v-if="$route.path.includes('event/create')" />
		<EditEventForm v-if="$route.path.includes('event/edit')" />
	</div>
</template>

<style scoped></style>
