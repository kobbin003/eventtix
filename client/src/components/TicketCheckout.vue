<script setup lang="ts">
import { useFetchNoLoading } from "@/hooks/useFetchNoLoading";
import { baseUrl } from "@/utils/constants";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
	connectedAccId: { type: String, required: true },
	priceId: { type: String, required: true },
	ticketPrice: { type: Number },
	ticketType: { type: Boolean },
});
const ticketQuantity = ref<number>(1);
const paymentIsLoading = ref(false);
const increment = () => {
	ticketQuantity.value += 1;
};
const decrement = () => {
	if (ticketQuantity.value == 1) {
		return;
	}
	ticketQuantity.value -= 1;
};
const route = useRoute();

const buyTicket = async () => {
	paymentIsLoading.value = true;
	const eventId = route.params.eventId;
	console.log("eventId", eventId);
	// query: priceId,quantity, connectedAccId,eventId
	const url = `${baseUrl}/stripe/checkout?connectedAccId=${props.connectedAccId}&priceId=${props.priceId}&quantity=${ticketQuantity.value}&eventId=${eventId}`;
	const opts = { method: "POST" };
	const { data } = await useFetchNoLoading(url, opts);
	if (data) {
		const checkoutUrl = data.url;
		window.location.href = checkoutUrl;
		localStorage.setItem("checkoutsession-data", JSON.stringify(data));
	}
	console.log("checkout-url", url);
	console.log("checkout-data", data);
	paymentIsLoading.value = false;
};
watchEffect(() => {
	if (props.ticketPrice) {
		console.log(`total:${props.ticketPrice * ticketQuantity.value}`);
	}
});
</script>
<template>
	<div
		class="flex flex-col gap-2 px-3 py-3 bg-neutral-content rounded-sm shadow-md"
	>
		<div
			class="flex items-center justify-between border-b-2 pb-2 border-b-base-100"
		>
			<div class="flex items-center gap-2">
				<p class="text-sm mr-2">Ticket Quantity</p>
				<button
					@click="decrement"
					class="btn btn-xs btn-square border-2 border-base-content/20 p-0 bg-base-100 font-normal disabled:bg-base-100"
					:disabled="ticketQuantity == 1"
				>
					-
				</button>
				<span>{{ ticketQuantity }}</span>
				<button
					@click="increment"
					class="btn btn-xs btn-square border-2 border-base-content/20 p-0 bg-base-100 font-normal"
				>
					+
				</button>
			</div>
			<div v-if="props.ticketPrice" class="text-xl">
				&#x20B9; {{ props.ticketPrice * ticketQuantity }}
			</div>
		</div>
		<div class="flex justify-end items-center">
			<button
				@click="buyTicket"
				class="btn btn-sm btn-accent rounded-sm font-normal"
			>
				<span
					v-if="paymentIsLoading"
					class="loading loading-xs loading-spinner"
				></span>
				<span v-else
					>Buy {{ ticketQuantity }}
					{{ ticketQuantity > 1 ? "tickets" : "ticket" }}</span
				>
			</button>
		</div>
	</div>
</template>

<style scoped></style>
