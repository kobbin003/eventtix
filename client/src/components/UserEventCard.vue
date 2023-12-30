<script setup lang="ts">
import { ref, watch } from "vue";
import { format, isBefore } from "date-fns";

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

const eventId = ref(123);

/** date segmentation */
const date = props.eventTime;
const formattedDate = format(date, "MMM/dd/yyyy");

/** instead of getting eventDone props check if the event's time is less than the current time */
const eventDone = ref(false);
if (isBefore(props.eventTime, new Date())) {
	// console.log(`oudated:${props.title}`);
	eventDone.value = true;
}
</script>
<template>
	<div
		class="border border-gray-300/5 flex flex-col md:flex-row gap-4 justify-between w-full md:w-4/6 p-2 md:p-4 event-box rounded-sm"
		:class="{ ['bg-[#cccccca6] text-gray-600/70']: eventDone }"
	>
		<div class="relative flex gap-4 flex-col md:flex-row w-full">
			<div
				class="absolute right-0 translate-y-1 -translate-x-1 md:hidden flex flex-col border border-black/25 py-1 px-4 rounded-sm bg-gray-400/20"
			>
				<p class="text-base text-center text-black">
					{{ formattedDate.split("/")[0] }}
				</p>
				<p class="text-4xl text-center text-black">
					{{ formattedDate.split("/")[1] }}
				</p>
				<p class="text-base text-center text-black">
					{{ formattedDate.split("/")[2] }}
				</p>
			</div>
			<div
				v-if="!eventDone"
				class="border-2 rounded-sm h-[60vh] md:h-[30vh] w-full md:w-1/3 min-h-[200px] min-w-[200px]"
			>
				<RouterLink :to="`/event/${props.id}`">
					<!-- class="w-full md:h-full md:w-full min-w-[150px] bg-blue-600" -->
					<!-- class="w-full h-full md:w-full md:h-full border-2 border-blue-600" -->
					<img
						:src="$props.imgUrl"
						alt="poster"
						class="h-full w-full object-cover"
					/>
				</RouterLink>
			</div>
			<div
				v-else
				class="border-2 rounded-sm h-[60vh] md:h-[30vh] w-full md:w-1/3 min-h-[200px] min-w-[200px]"
			>
				<img
					:src="$props.imgUrl"
					alt="poster"
					class="h-full w-full object-cover"
				/>
			</div>
			<div class="flex flex-col justify-between gap-2 md:pb-2">
				<div class="flex flex-col gap-2">
					<div>
						<RouterLink v-if="!eventDone" :to="`/event/${props.id}`">
							<p class="text-xl">{{ props.title }}</p>
						</RouterLink>
						<div v-else>
							<p class="text-xl">{{ props.title }}</p>
						</div>
					</div>
					<p class="">{{ props.desc }}</p>
				</div>
				<div class="flex flex-col gap-2">
					<div class="flex items-center gap-2">
						<IconSchool />
						<p>{{ props.organiser }}</p>
					</div>
					<div class="flex items-center gap-2">
						<IconLocation />
						<p>{{ props.location }}</p>
					</div>
					<div class="flex items-center gap-2">
						<IconFee />

						<p v-if="$props.ticketType === 'free'">free</p>
						<p v-else>
							<span class="text-xl">{{ props.ticketPrice }}&nbsp;</span>
							<span>&#x20B9;</span>
						</p>
					</div>
				</div>
			</div>
		</div>
		<div
			class="flex justify-between items-end md:justify-center md:items-start"
		>
			<div
				class="hidden md:flex flex-col border py-1 px-4 rounded-sm bg-gray-400/20"
			>
				<p class="text-base text-center">{{ formattedDate.split("/")[0] }}</p>
				<p class="text-4xl text-center">{{ formattedDate.split("/")[1] }}</p>
				<p class="text-base text-center">{{ formattedDate.split("/")[2] }}</p>
			</div>
		</div>
	</div>
	<div class="flex justify-end w-full md:w-4/6 mb-4">
		<div v-if="eventDone" class="bg-red-600 p-2 text-gray-200">
			<b>Outdated</b>
		</div>
		<RouterLink
			:to="`/user/event/edit/${props.id}`"
			v-else
			class="btn btn-sm btn-primary rounded-sm"
		>
			Edit
		</RouterLink>
	</div>
</template>

<style scoped>
.event-box {
	box-shadow: 3px 3px 10px 3px #8888881e;
}
</style>
