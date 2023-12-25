<script setup lang="ts">
import SearchForm from "@/components/SearchForm.vue";
import image from "@/assets/zfm.jpeg";
import { ref } from "vue";
const events = ref([]);
</script>
<template>
	<div class="relative flex flex-col">
		<SearchForm />
		<div v-if="events.length == 0" class="flex justify-center relative top-10">
			<NoEventsFound />
		</div>
		<ul v-else class="py-2 md:py-4">
			<li v-for="item in [1, 2, 3]">
				<EventCard
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
		</ul>
	</div>
</template>

<style scoped></style>
