<script setup lang="ts">
import { useFetch } from "@/hooks/useFetch";
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { accessToken, baseUrl } from "@/utils/constants";

const { updatePayment } = useUserStore();
const { user } = storeToRefs(useUserStore());

const onBoardingIsLoading = ref(false);
const onBoarded = ref(user.value.payment?.detailsSubmitted); // onboarded when connected account's details_submitted is true

const onBoardToStripe = async () => {
	onBoardingIsLoading.value = true;
	const connectedAccId = user.value.payment?.connectedAccId;
	const url = `${baseUrl}/stripe/account/link?connectedAccId=${connectedAccId}`;
	const opts = {
		method: "POST",
		headers: { authorization: `Bearer ${user.value.accessToken}` },
	};
	const { data, error } = await useFetch(url, opts);
	if (data.url) {
		console.log(data);
		window.location.href = data.url;
		// keep onBoardingIsLoading true till navigated to the stripe onBoarding page
		// onBoardingIsLoading.value = false;
	}
	if (error) {
		console.log(error);
	}
};

onMounted(async () => {
	onBoardingIsLoading.value = false;
	console.log("user", user.value);
	const url = `${baseUrl}/profile/payment`;
	const opts = {
		method: "GET",
		headers: {
			authorization: `Bearer ${accessToken}`,
		},
	};
	const { data } = await useFetch(url, opts);
	console.log("payment-data", data);
	if (data) {
		updatePayment({
			connectedAccId: data.payment.connectedAccId,
			detailsSubmitted: data.payment.detailsSubmitted,
		});
	}
});
</script>
<template>
	<div>
		<p class="text-xl text-primary py-4">Payment Details</p>
	</div>

	<div
		v-if="!onBoarded"
		class="flex flex-col gap-4 md:w-max bg-base-content/5 p-4"
	>
		<div class="flex items-start gap-2">
			<div class="relative top-1">
				<IconInfo />
			</div>
			<div class="flex flex-col gap-2">
				<p class="text-lg">You have not yet set up your payment account</p>
				<div class="">
					<p>
						It is required to set up a&nbsp;<span class="text-primary/75"
							>stripe account</span
						>&nbsp;to accept payments.
					</p>
					<span> (It won't take much time) </span>
				</div>
				<button
					@click="onBoardToStripe"
					class="btn btn-sm btn-primary rounded-sm w-max font-normal mt-2"
				>
					<span
						v-if="onBoardingIsLoading"
						class="loading loading-spinner loading-sm"
					></span>
					<span v-else>Setup payment account</span>
				</button>
			</div>
		</div>
	</div>
	<div v-else>
		<PaymentAccountDetails :connectedAccId="user.payment?.connectedAccId" />
	</div>
</template>

<style scoped></style>
