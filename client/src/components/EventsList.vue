<script setup lang="ts">
import SearchForm from "@/components/SearchForm.vue";
import { onBeforeMount, onMounted, ref, watch, watchEffect } from "vue";
import type { TEvent } from "./CreateEventForm.vue";
import { useFetch } from "@/hooks/useFetch";
import { storeToRefs } from "pinia";
import { useAlertStore } from "@/stores/alert";
import showMoreUrl from "@/assets/showMore.svg";
const { isLoading } = storeToRefs(useAlertStore());
const steps = 3;
const offset = ref(0);
const limit = ref(steps);

const searchType = ref<string>("");
const searchValue = ref<string>("");
const setSearchType = (val: { searchType: string; searchValue: string }) => {
	// searchType.value = val;
	searchType.value = val.searchType;
	searchValue.value = val.searchValue;
	console.log("val", val);
};
export type TFetchedEvent = {
	id: string;
	orgId: string;
	org: {
		name: string;
		payment: { connectedAccId: string; detailsSubmitted: boolean };
	};
} & TEvent;

const allEvents = ref<Array<TFetchedEvent>>([]);
const baseUrl = import.meta.env.VITE_BASE_URL;
const accessToken = localStorage.getItem("accessToken");
const opts = {
	method: "get",
	headers: {
		"Content-Type": "application/json",
		authorization: `Bearer ${accessToken}`,
	},
};
async function paginate() {
	offset.value = offset.value + steps;
	// const url = `${baseUrl}/event/filter?offset=${offset.value}&limit=${limit.value}`;
	const url = `${baseUrl}/event/filter?offset=${offset.value}&limit=${limit.value}&${searchType.value}=${searchType.value}`;
	const { data, error } = await useFetch(url, opts);
	// console.log("data-hook-page", data);
	if (data) {
		// allEvents.value = data;
		allEvents.value = [...allEvents.value, ...data];
	}
}
onMounted(async () => {
	const url = `${baseUrl}/event/filter?offset=${offset.value}&limit=${limit.value}`;
	const { data, error } = await useFetch(url, opts);
	// console.log("data-hook-mount", data);
	if (data) {
		const fetchedData = data as TFetchedEvent[];
		allEvents.value = fetchedData;
	}
	// console.log("error-hook", error);
});

watch(searchValue, async () => {
	//reset the offset
	offset.value = 0;
	const url = `${baseUrl}/event/filter?offset=${offset.value}&limit=${limit.value}&${searchType.value}=${searchValue.value}`;

	// const url = `${baseUrl}/event/filter?offset=${offset.value}&limit=${limit.value}`;
	const { data, error } = await useFetch(url, opts);
	// console.log("data-hook-mount", data);
	if (data) {
		const fetchedData = data as TFetchedEvent[];
		allEvents.value = fetchedData;
	}
	// console.log("error-hook", error);
	console.log("searchvalue", url);
});

// watch(searchType, () => {
// 	searchValue.value = "";
// });
</script>
<template>
	<div class="relative flex flex-col">
		<SearchForm @search-inputs="setSearchType" />
		<div v-if="isLoading" class="w-screen h-[100px] flex justify-center">
			<span class="loading loading-spinner loading-lg"></span>
		</div>
		<div v-else>
			<h1 v-if="!searchValue" class="text-xl text-primary py-2">
				Upcoming Events
			</h1>
			<h1 v-else class="text-xl text-primary py-2">
				Searched Events for
				{{ searchType == "orgName" ? "school name" : searchType }} : "{{
					searchValue
				}}"
			</h1>
			<div
				v-if="allEvents && allEvents.length == 0"
				class="flex justify-center relative top-10"
			>
				<NoEventsFound />
			</div>
			<div v-else-if="allEvents && allEvents?.length >= 1">
				<ul class="py-2">
					<li
						v-for="event in allEvents"
						:key="event.id"
						class="relative w-full md:w-4/6"
					>
						<EventCard
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
					<div class="w-full flex justify-center">
						<button
							@click="paginate"
							class="text-primary hover:scale-105 flex flex-col items-center"
						>
							<span>show more</span>
							<img :src="showMoreUrl" alt="" height="30" width="30" />
						</button>
					</div>
				</ul>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
