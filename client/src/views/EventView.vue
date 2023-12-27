<script setup lang="ts">
import type { TEvent } from "@/components/CreateEventForm.vue";
import { useFetch } from "@/hooks/useFetch";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const baseUrl = import.meta.env.VITE_BASE_URL;
const route = useRoute();
const eventData = ref<TEvent & { id: string; orgId: string }>({
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
		const fetchedData = data as TEvent & { orgId: string; id: string };
		eventData.value.id = fetchedData.id;
		eventData.value.title = fetchedData.title;
		eventData.value.desc = fetchedData.desc;
		eventData.value.location = fetchedData.location;
		eventData.value.imageUrl = fetchedData.imageUrl;
		eventData.value.time = fetchedData.time;
		eventData.value.orgId = fetchedData.orgId;
		eventData.value.ticketType = fetchedData.ticketType;
		eventData.value.ticketPrice = fetchedData.ticketPrice;
	}
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
		<div
			class="flex flex-col w-screen md:w-1/2 p-2 border border-primary-content/5 shadow-lg"
		>
			<h2 class="p-2 text-xl text-info">Organiser details</h2>
			<SchoolDetails v-if="eventData.orgId" :orgId="eventData.orgId" />
		</div>
	</div>
</template>

<style scoped></style>
