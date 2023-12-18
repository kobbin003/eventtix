<template>
	<div
		class="border border-gray-300/5 flex flex-col md:flex-row md:gap-2 justify-between w-full md:w-4/6 p-2 md:p-4 event-box rounded-sm"
	>
		<div class="flex gap-2 flex-col md:flex-row w-full">
			<RouterLink to="/event/1234">
				<img
					src="../assets/zfm.jpeg"
					alt="poster"
					class="w-full md:h-full md:w-full min-w-[150px] bg-blue-600"
				/>
			</RouterLink>
			<div class="flex flex-col justify-between">
				<div>
					<RouterLink to="/event/1234">
						<h6>
							<b>Title:{{ props.title }}</b>
						</h6>
					</RouterLink>
				</div>
				<p class="bg-blue-500">Description:{{ props.desc }}</p>
				<div>
					<RouterLink to="/event/1234">
						<p>Organiser:{{ props.organiser }}</p>
					</RouterLink>
				</div>
				<p>Location:{{ props.location }}</p>
			</div>
		</div>
		<div
			class="flex justify-between items-end md:justify-center md:items-start"
		>
			<p
				v-if="props.ticketType == 'free'"
				name="free-card"
				class="border px-3 py-3 bg-yellow-400 rounded-sm md:hidden w-max"
			>
				<span class="text-base font-medium">Free</span>
			</p>
			<button class="btn btn-md btn-secondary rounded-sm md:hidden">
				Buy Ticket
			</button>
			<div class="flex flex-col gap-1 border p-2 rounded-sm bg-gray-400/20">
				<p class="text-center">march</p>
				<p class="text-4xl">30</p>
				<p class="text-center">2024</p>
			</div>
		</div>
	</div>
	<p
		v-if="props.ticketType == 'free'"
		name="free-card"
		class="border px-4 py-1 bg-yellow-400 rounded-sm hidden md:block w-max"
	>
		<span class="text-base font-medium">Free</span>
	</p>
	<button v-else class="btn btn-sm btn-secondary rounded-sm hidden md:block">
		Buy Ticket
	</button>
</template>

<script setup lang="ts">
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
});
</script>

<style scoped>
.event-box {
	box-shadow: 3px 3px 10px 3px #8888881e;
}
</style>
