<script setup lang="ts">
import { useFetch } from "@/hooks/useFetch";
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { baseUrl } from "@/utils/constants";

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

onMounted(() => {
	onBoardingIsLoading.value = false;
});
</script>
<template>
	<div>
		<p class="text-xl text-primary py-4">Payment Details</p>
	</div>

	<div v-if="!onBoarded" class="flex flex-col gap-4 w-max">
		<div class="bg-base-content/5 px-4 py-2">
			<p class="text-lg">You have not yet set up your payment account</p>
			<p class="py-1">
				It is required to set up a
				<span class="text-primary/75">stripe account</span> to accept payments.
			</p>
			<p>( It won't take much time )</p>
		</div>
		<button
			@click="onBoardToStripe"
			class="btn btn-sm btn-primary rounded-sm w-max"
		>
			<span
				v-if="onBoardingIsLoading"
				class="loading loading-spinner loading-sm"
			></span>
			<span v-else>setup payment account</span>
		</button>
	</div>
	<div v-else>
		<PaymentAccountDetails :connectedAccId="user.payment?.connectedAccId" />
	</div>
</template>

<style scoped></style>
