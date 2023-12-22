<template>
	<div
		class="border border-gray-300/5 flex flex-col md:flex-row md:gap-2 justify-between w-full md:w-4/6 p-2 md:p-4 event-box rounded-sm"
		:class="{ ['bg-[#cccccca6] text-gray-600/70']: eventdone }"
	>
		<div class="flex gap-2 flex-col md:flex-row w-full">
			<RouterLink v-if="!eventDone" :to="'/event/1234'">
				<img
					:src="$props.imgUrl"
					alt="poster"
					class="w-full md:h-full md:w-full min-w-[150px] bg-blue-600"
				/>
			</RouterLink>
			<div v-else>
				<img
					:src="$props.imgUrl"
					alt="poster"
					class="w-full md:h-full md:w-full min-w-[150px] bg-blue-600"
				/>
			</div>
			<div class="flex flex-col justify-between">
				<div>
					<RouterLink v-if="!eventDone" :to="'/event/1234'">
						<h6>
							<b>Title:{{ props.title }}</b>
						</h6>
					</RouterLink>
					<div v-else>
						<h6>
							<b>Title:{{ props.title }}</b>
						</h6>
					</div>
				</div>
				<p class="">Description:{{ props.desc }}</p>
				<div>
					<div>
						<p>Organiser:self</p>
					</div>
				</div>
				<p>Location:{{ props.location }}</p>
				<div class="flex">
					price:&nbsp;
					<p v-if="$props.ticketType === 'free'">free</p>
					<p v-else>
						Rs <span class="text-green-400">{{ props.ticketPrice }}</span
						>/-
					</p>
				</div>
			</div>
		</div>
		<div
			class="flex justify-between items-end md:justify-center md:items-start"
		>
			<!-- <p
				v-if="props.ticketType == 'free'"
				name="free-card"
				class="border px-3 py-3 bg-yellow-400 rounded-sm md:hidden w-max"
			>
				<span class="text-base font-medium">Free</span>
			</p>
			<button v-else class="btn btn-md btn-secondary rounded-sm md:hidden">
				Buy Ticket
			</button> -->
			<div class="flex flex-col border py-1 px-4 rounded-sm bg-gray-400/20">
				<p class="text-base text-center">{{ formattedDate.split("/")[0] }}</p>
				<p class="text-4xl text-center">{{ formattedDate.split("/")[1] }}</p>
				<p class="text-base text-center">{{ formattedDate.split("/")[2] }}</p>
			</div>
		</div>
	</div>
	<div class="flex justify-end md:justify-between w-full md:w-4/6 mb-4">
		<!-- <p
			v-if="props.ticketType == 'free'"
			name="free-card"
			class="border px-4 py-1 bg-yellow-400 rounded-sm hidden md:block w-max"
		>
			<span class="text-base font-medium">Free</span>
		</p>
		<button v-else class="btn btn-sm btn-secondary rounded-sm hidden md:block">
			Buy Ticket
		</button> -->
		<div v-if="eventdone" class="bg-red-600 p-2 text-gray-200">
			<b>Outdated</b>
		</div>
		<RouterLink
			:to="`/user/event/edit/${eventId}`"
			v-else
			class="btn btn-sm btn-primary rounded-sm"
		>
			Edit
		</RouterLink>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { format } from "date-fns";

const props = defineProps({
	title: { type: String, required: true },
	desc: { type: String, required: true },
	imgUrl: { type: String, required: true },
	organiser: { type: String, required: true },
	location: { type: String, required: true },
	eventTime: { type: Date, required: true },
	ticketType: {
		type: String,
		validator: (val) => val == "free" || val == "paid",
	},
	ticketPrice: { type: Number },
	eventDone: { type: Boolean }, //trial only
});

const eventId = ref(123);

/** date segmentation */
const date = props.eventTime;
const formattedDate = format(date, "MMM/dd/yyyy");

/** instead of getting eventDone props check if the event's time is less than the current time */
const eventdone = ref(props.eventDone);
</script>

<style scoped>
.event-box {
	box-shadow: 3px 3px 10px 3px #8888881e;
}
</style>
