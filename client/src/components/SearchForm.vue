<template>
	<div class="flex flex-col md:flex-row items-center gap-2">
		<select
			v-model="searchType"
			class="select select-sm select-bordered rounded-sm"
		>
			<option disabled selected value="">select search type</option>
			<option value="location">location</option>
			<option value="schoolName">school name</option>
			<option value="date">date</option>
		</select>

		<div v-if="!searchType" class="tooltip" data-tip="select search type">
			<input
				type="search"
				name=""
				id=""
				placeholder="search event"
				class="input input-sm input-bordered rounded-2xl"
				:disabled="!searchType"
			/>
		</div>
		<div v-else-if="searchType == 'date'" class="flex items-center gap-2">
			<input
				type="date"
				name="date"
				id="date"
				class="input input-sm input-bordered rounded-md border-2"
			/>
			<button class="btn btn-xs md:btn-sm btn-primary rounded-sm">
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
				type="search"
				name="search"
				id="search"
				:placeholder="
					searchType == 'location' ? 'enter location' : 'enter school name'
				"
				class="input input-sm focus:outline-none focus:border-none rounded-none"
				:disabled="!searchType"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import blackSearchIcon from "@/assets/search_black.svg";
const searchType = ref("");
</script>

<style scoped></style>
