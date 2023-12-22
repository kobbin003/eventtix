<template>
	<GoBackButton />
	<ul class="py-2 md:py-4">
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
		</li>
	</ul>
</template>

<script setup lang="ts">
import image from "@/assets/zfm.jpeg";
</script>

<style scoped></style>
