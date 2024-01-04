<script setup lang="ts">
import { useAlertStore } from "@/stores/alert";
import { storeToRefs } from "pinia";
const { isLoading } = storeToRefs(useAlertStore());
const props = defineProps({
	id: { type: String, required: true },
	title: { type: String, required: true },
	desc: { type: String, required: true },
	imgUrl: { type: String, required: true },
	organiser: { type: String, required: true },
	location: { type: String, required: true },
	eventTime: { type: String, required: true },
	ticketType: {
		type: String,
		validator: (val) => val == "free" || val == "paid",
	},
	ticketPrice: { type: Number },
});
</script>
<template>
	<div v-if="isLoading" class="w-full flex justify-center">
		<span class="loading loading-spinner loading-md"></span>
	</div>
	<div
		v-else
		class="w-full h-max border border-primary-content/5 shadow-lg p-4 flex flex-col gap-1"
	>
		<div>
			<!-- <div class="relative mb-4 min-h-[500px] max-h-[60vh]"> -->
			<img
				:src="props.imgUrl"
				alt=""
				class="w-full mb-4 min-h-[500px] max-h-[60vh] object-contain object-center bg-neutral/5"
			/>
			<!-- </div> -->
			<!-- class="w-full object-contain mb-4 min-h-[500px] max-h-[60vh]" -->
			<div>
				<h2 class="text-lg">{{ props.title }}</h2>
			</div>
			<div>
				<p class="text-sm">{{ props.desc }}</p>
			</div>
			<div class="flex flex-col gap-1 mt-2">
				<p class="flex items-center">
					<IconLocation />
					<span>{{ props.location }}</span>
				</p>
				<div class="flex items-center">
					<IconFee />

					<p v-if="props.ticketType == 'paid'">{{ props.ticketPrice }}</p>
					<p v-else>free</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
