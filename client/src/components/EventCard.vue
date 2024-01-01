<script setup lang="ts">
import { ref } from "vue";
import { format, isBefore } from "date-fns";
import router from "@/router";
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
	priceId: { type: String },
	// connectedAccId: { type: String, required: true },
});

/** date segmentation */
const date = props.eventTime;
const formattedDate = format(date, "MMM/dd/yyyy");

const eventDone = ref(false);
if (isBefore(props.eventTime, new Date())) {
	// console.log(`oudated:${props.title}`);
	eventDone.value = true;
}

const buyTicket = async () => {
	router.push({ path: `/event/${props.id}` });
};
</script>
<template>
	<RouterLink :to="`/event/${props.id}`">
		<div
			class="border border-gray-300/5 flex flex-col md:flex-row md:gap-2 justify-between p-2 md:p-4 event-box rounded-sm"
			:class="{ ['bg-[#cccccca6] text-gray-600/70']: eventDone }"
		>
			<div class="relative flex gap-2 flex-col md:flex-row w-full">
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
					class="border-2 rounded-sm h-[60vh] md:h-[30vh] w-full md:w-1/3 min-h-[200px] min-w-[200px]"
				>
					<img
						:src="$props.imgUrl"
						alt="poster"
						class="h-full w-full object-cover"
					/>
				</div>

				<div class="flex flex-col justify-between gap-2 md:pb-2">
					<div class="flex flex-col gap-2 pb-2 md:pb-0">
						<div>
							<p class="text-xl">{{ props.title }}</p>
						</div>
						<p class="text-sm">{{ props.desc }}</p>
					</div>
					<div class="flex flex-col gap-1 md:gap-2">
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
			<div class="flex justify-end items-end md:justify-center md:items-start">
				<div
					class="hidden md:flex flex-col border py-1 px-4 rounded-sm bg-gray-400/20"
				>
					<p class="text-base text-center">{{ formattedDate.split("/")[0] }}</p>
					<p class="text-4xl text-center">{{ formattedDate.split("/")[1] }}</p>
					<p class="text-base text-center">{{ formattedDate.split("/")[2] }}</p>
				</div>
				<div v-if="eventDone" class="md:hidden bg-red-600 p-2 text-gray-200">
					<b>Outdated</b>
				</div>
				<div v-else>
					<p
						v-if="props.ticketType == 'free'"
						name="free-card"
						class="border px-3 py-3 bg-[#29BA53] rounded-sm md:hidden w-max"
					>
						<span class="text-base font-normal text-white">Free</span>
					</p>
					<button
						v-else
						class="btn btn-md btn-accent rounded-sm md:hidden font-normal"
					>
						Buy Ticket
					</button>
				</div>
			</div>
		</div>
	</RouterLink>
	<div class="flex justify-end mb-4">
		<div v-if="eventDone" class="hidden md:block bg-red-600 p-2 text-gray-200">
			<b>Outdated</b>
		</div>
		<div v-else>
			<p
				v-if="props.ticketType == 'free'"
				name="free-card"
				class="border px-4 py-1 bg-[#29BA53] rounded-sm hidden md:block w-max"
			>
				<span class="text-base font-normal text-white">Free</span>
			</p>
			<RouterLink v-else :to="`/event/${props.id}`">
				<button
					class="btn btn-sm btn-accent rounded-sm hidden md:block font-normal"
					@click="buyTicket"
				>
					Buy Ticket
				</button>
			</RouterLink>
		</div>
	</div>
</template>

<style scoped>
.event-box {
	box-shadow: 3px 3px 10px 3px #8888881e;
}
</style>
