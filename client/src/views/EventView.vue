<script setup lang="ts">
import type { TEvent, TFetchEvent } from "@/components/CreateEventForm.vue";
import TicketCheckout from "@/components/TicketCheckout.vue";
import { useFetch } from "@/hooks/useFetch";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const baseUrl = import.meta.env.VITE_BASE_URL;
const route = useRoute();
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
		<div class="flex flex-col gap-2 w-screen md:w-1/2">
			<!-- <TicketCheckout /> -->
			<TicketCheckout
				v-if="
					eventData.connectedAccId && eventData.priceId && eventData.ticketPrice
				"
				:connected-acc-id="eventData.connectedAccId"
				:price-id="eventData.priceId"
				:ticket-price="eventData.ticketPrice"
			/>
			<div v-else>
				<p class="bg-red-400 p-3 rounded-sm">Cannot buy this event's ticket</p>
			</div>
			<div class="flex flex-col p-2 border border-primary-content/5 shadow-lg">
				<h2 class="p-2 text-xl text-info">Organiser details</h2>
				<SchoolDetails v-if="eventData.orgId" :orgId="eventData.orgId" />
			</div>
		</div>
	</div>
</template>

<style scoped></style>
