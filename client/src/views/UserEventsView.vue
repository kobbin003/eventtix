<script setup lang="ts">
import image from "@/assets/zfm.jpeg";
import type { TEvent } from "@/components/CreateEventForm.vue";
import { useFetch } from "@/hooks/useFetch";
import { useAlertStore } from "@/stores/alert";
import { storeToRefs } from "pinia";
import { onBeforeMount, onMounted, ref } from "vue";

const { isLoading } = storeToRefs(useAlertStore());
type TFetchedEvent = { id: string; orgId: string } & TEvent;
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
	console.log("data-hook", data);
	if (data) {
		userEvents.value = data;
	}
	console.log("error-hook", error);
});
</script>
<template>
	<GoBackButton />
	<div v-if="isLoading" class="w-screen h-[100px] flex justify-center">
		<span class="loading loading-spinner loading-lg"></span>
	</div>
	<div v-else>
		<div
			v-if="userEvents && userEvents.length == 0"
			class="flex justify-center relative top-10"
		>
			<NoEventsFound />
		</div>
		<ul v-else class="py-2 md:py-4">
			<li v-for="event in userEvents">
				<UserEventCard
					:id="event.id"
					:title="event.title"
					:desc="event.desc"
					:imgUrl="event.imageUrl"
					organiser="demo organise"
					:location="event.location"
					:eventTime="event.time"
					:ticketType="event.ticketType"
					:ticketPrice="event.ticketPrice"
				/>
			</li>
			<!-- <li v-for="item in [1, 2, 3]">
			<UserEventCard
				title="demo title"
				desc="demo description"
				:imgUrl="image"
				organiser="demo organise"
				location="demo location"
				:eventTime="new Date()"
				ticketType="free"
				:ticketPrice="20"
			/>
		</li>
		<li v-for="item in [1, 2, 3]">
			<UserEventCard
				title="demo title"
				desc="demo description"
				:imgUrl="image"
				organiser="demo organise"
				location="demo location"
				:eventTime="new Date()"
				ticketType="free"
				:ticketPrice="20"
				eventDone="false"
			/>
		</li> -->
		</ul>
	</div>
</template>

<style scoped></style>
