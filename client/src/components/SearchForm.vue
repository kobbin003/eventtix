<script setup lang="ts">
import { ref, watch } from "vue";
// import blackSearchIcon from "@/assets/search_black.svg";
const emit = defineEmits(["searchInputs"]);

const searchType = ref("");
const date = ref("");
const searchValue = ref<string>();

// debouncing
let timeOutId: number;
watch(searchValue, () => {
	// emit("searchType", searchType.value);
	clearTimeout(timeOutId);
	timeOutId = window.setTimeout(() => {
		emit("searchInputs", {
			searchType: searchType.value,
			searchValue: searchValue.value,
		});
	}, 500);
});
watch(date, () => {
	// emit("searchType", searchType.value);
	emit("searchInputs", {
		searchType: "day",
		searchValue: date.value,
	});
});
</script>
<template>
	<div class="flex flex-col md:flex-row items-start md:items-center gap-2 py-3">
		<select
			v-model="searchType"
			class="select select-sm select-bordered rounded-sm"
		>
			<option disabled selected value="">select search type</option>
			<option value="location">location</option>
			<option value="orgName">school name</option>
			<option value="date">date</option>
		</select>

		<div
			v-if="!searchType"
			class="tooltip tooltip-bottom"
			data-tip="select search type"
		>
			<div
				class="w-full h-full border border-base-content/25 bg-base-100 rounded-2xl overflow-hidden"
			>
				<input
					type="search"
					name=""
					id=""
					placeholder="search event"
					class="input input-sm"
					autocomplete="off"
					:disabled="!searchType"
				/>
			</div>
		</div>
		<div v-else-if="searchType == 'date'" class="flex items-center gap-2">
			<input
				type="date"
				name="date"
				id="date"
				class="date-picker input input-sm input-bordered rounded-md border-2"
				v-model="date"
			/>
			<div v-if="!date" class="tooltip z-20" data-tip="select a date">
				<button
					class="btn btn-sm md:btn-sm btn-primary rounded-sm disabled:border-base-content/20"
					:disabled="!date"
				>
					search
				</button>
			</div>
			<button
				v-else
				class="btn btn-sm md:btn-sm btn-primary rounded-sm"
				:disabled="!date"
			>
				search
			</button>
		</div>
		<div
			v-else
			class="flex border-2 border-gray-400/50 rounded-2xl overflow-hidden"
		>
			<img
				src="../assets/search.svg"
				alt=""
				height="20"
				width="20"
				class="relative left-2"
			/>
			<input
				v-model="searchValue"
				type="search"
				name="search"
				id="search"
				:placeholder="
					searchType == 'location'
						? 'search by location'
						: 'search by school name'
				"
				autocomplete="off"
				class="input input-sm focus:outline-none focus:border-none rounded-none"
				:disabled="!searchType"
			/>
		</div>
	</div>
</template>

<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
	filter: invert(40%); /* Adjust the color using invert() */
	/* Other styling properties */
}
</style>
