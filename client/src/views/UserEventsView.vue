<script setup lang="ts">
import type { TEvent } from "@/components/CreateEventForm.vue";
import type { TFetchedEvent } from "@/components/EventsList.vue";
import { useFetch } from "@/hooks/useFetch";
import { useAlertStore } from "@/stores/alert";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const { isLoading } = storeToRefs(useAlertStore());
// type TFetchedEvent = { id: string; orgId: string } & TEvent;
const userEvents = ref<Array<TFetchedEvent>>();
const baseUrl = import.meta.env.VITE_BASE_URL;
const accessToken = localStorage.getItem("accessToken");
const url = `${baseUrl}/event/`;
const opts = {
	method: "get",
	headers: {
		"Content-Type": "application/json",
		authorization: `Bearer ${accessToken}`,
	},
};

onBeforeMount(async () => {
	const { data, error } = await useFetch(url, opts);
	console.log("data-hook UsEr event", data);
	if (data) {
		const fetchedData = data as TFetchedEvent[];
		userEvents.value = fetchedData;
	}
	// console.log("error-hook", error);
});
</script>
<template>
	<GoBackButton />
	<div v-if="isLoading" class="w-screen h-[100px] flex justify-center">
		<span class="loading loading-spinner loading-lg"></span>
	</div>
	<div v-else>
		<div
			v-if="!userEvents || (userEvents && userEvents.length == 0)"
			class="flex justify-center relative top-10"
		>
			<NoEventsFound />
		</div>
		<div v-else-if="userEvents && userEvents?.length >= 1">
			<h1 class="text-xl text-primary py-2">Your Events</h1>
			<ul class="py-2">
				<li
					v-for="event in userEvents"
					:key="event.id"
					class="relative w-full md:w-4/6"
				>
					<UserEventCard
						:id="event.id"
						:title="event.title"
						:desc="event.desc"
						:imgUrl="event.imageUrl"
						:organiser="event.org.name"
						:location="event.location"
						:eventTime="event.time"
						:ticketType="event.ticketType"
						:ticketPrice="event.ticketPrice"
					/>
				</li>
			</ul>
		</div>
	</div>
</template>

<style scoped></style>
