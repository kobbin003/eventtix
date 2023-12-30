<script setup lang="ts">
import type { TEvent, TFetchEvent } from "@/components/CreateEventForm.vue";
import TicketCheckout from "@/components/TicketCheckout.vue";
import { useFetch } from "@/hooks/useFetch";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const baseUrl = import.meta.env.VITE_BASE_URL;
const route = useRoute();
const dataFetched = ref(false); // required, the else condition gets rendered on initial mount.
const eventData = ref<
	TEvent & { id: string; orgId: string; connectedAccId?: string }
>({
	id: "",
	title: "",
	desc: "",
	imageUrl: "",
	location: "",
	time: "",
	ticketType: "paid",
	orgId: "",
});
onMounted(async () => {
	const url = `${baseUrl}/event/id/${route.params.eventId}`;
	const opts = { method: "get" };
	const { data, error } = await useFetch(url, fetch);
	// console.log("data", data);
	if (data) {
		const fetchedData = data as TFetchEvent;
		// console.log("fetchedData", fetchedData);
		eventData.value.id = fetchedData.id;
		eventData.value.title = fetchedData.title;
		eventData.value.desc = fetchedData.desc;
		eventData.value.location = fetchedData.location;
		eventData.value.imageUrl = fetchedData.imageUrl;
		eventData.value.time = fetchedData.time;
		eventData.value.orgId = fetchedData.orgId;
		eventData.value.ticketType = fetchedData.ticketType;
		eventData.value.ticketPrice = fetchedData.ticketPrice;
		//
		eventData.value.priceId = fetchedData.priceId;
		eventData.value.connectedAccId = fetchedData.org.payment.connectedAccId;
		// if (fetchedData.payment) {
		// 	console.log("payment is there", fetchedData.payment);
		// }
		dataFetched.value = true;
	}
	// console.log("eventData", eventData.value);
});
</script>
<template>
	<GoBackButton />
	<div class="flex flex-col md:flex-row gap-2">
		<div class="w-screen md:w-1/2">
			<EventDetails
				:id="eventData.id"
				:title="eventData.title"
				:desc="eventData.desc"
				:imgUrl="eventData.imageUrl"
				:location="eventData.location"
				:eventTime="eventData.time"
				:ticketType="eventData.ticketType"
				:ticketPrice="eventData.ticketPrice"
				:organiser="eventData.orgId"
			/>
		</div>
		<div v-if="dataFetched" class="flex flex-col gap-2 w-screen md:w-1/2">
			<TicketCheckout
				v-if="
					eventData.connectedAccId && eventData.priceId && eventData.ticketPrice
				"
				:connected-acc-id="eventData.connectedAccId"
				:price-id="eventData.priceId"
				:ticket-price="eventData.ticketPrice"
			/>
			<div
				v-else-if="eventData.ticketType == 'free'"
				role="alert"
				class="alert rounded-sm"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="stroke-info shrink-0 w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					></path>
				</svg>
				<span class="text-sm font-normal">It is a free ticket</span>
			</div>
			<div v-else>
				<div
					role="alert"
					class="alert alert-warning bg-accent text-black rounded-sm"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="stroke-current shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/>
					</svg>
					<span>Cannot Buy this Event's Ticket</span>
				</div>
			</div>

			<div class="flex flex-col p-2 border border-primary-content/5 shadow-lg">
				<h2 class="p-2 text-xl text-info">Organiser details</h2>
				<SchoolDetails v-if="eventData.orgId" :orgId="eventData.orgId" />
			</div>
		</div>
	</div>
</template>

<style scoped></style>
