<script setup lang="ts">
import { useFetch } from "@/hooks/useFetch";
import router from "@/router";
import { baseUrl, isLoading, user } from "@/utils/constants";
import { ref } from "vue";
const onBoardingLink = ref<string>();
// const startOnBoardingButton = ref<HTMLButtonElement>();
const onBoarded = ref(user.value.payment?.detailsSubmitted); // onboarded when connected account's details_submitted is true
const getOnBoardingLink = async () => {
	const connectedAccId = user.value.payment?.connectedAccId;
	const url = `${baseUrl}/stripe/account/link?connectedAccId=${connectedAccId}`;
	const opts = {
		method: "POST",
		headers: { authorization: `Bearer ${user.value.accessToken}` },
	};
	const { data, error } = await useFetch(url, opts);
	if (data) {
		console.log(data);
		onBoardingLink.value = data.url;
	}
	if (error) {
		console.log(error);
	}
};
const startOnBoarding = async () => {
	if (onBoardingLink.value) {
		window.location.href = onBoardingLink.value;
		// OR
		// window.open(onBoardingLink.value, "_blank");
		// OR
		// const redirectUrl = `${baseUrl}/stripe/account/link/redirect?url=${onBoardingLink.value}`;
		// const opts = {
		// 	method: "get",
		// 	headers: { authorization: `Bearer ${user.value.accessToken}` },
		// };
		// await useFetch(redirectUrl, opts);
	}
};
// watchEffect(() => {
// 	console.log("toStripeLinkButton", startOnBoardingButton.value);
// 	if (startOnBoardingButton.value) {
// 		startOnBoardingButton.value.addEventListener("click", startOnBoarding);
// 	}
// });
</script>
<template>
	<div>
		<p class="text-xl text-primary py-4">Payment Details</p>
		<!-- <p>{{ user.payment?.connectedAccId }}</p> -->
	</div>

	<div v-if="!onBoarded" class="flex flex-col gap-2 w-max">
		<div class="bg-gray-100 px-4 py-2">
			<p class="text-lg">You have not yet set up your payment account</p>
			<p class="py-1">
				It is required to set up a
				<span class="text-primary/75">stripe account</span> to accept payments.
			</p>
			<p>( It won't take much time )</p>
		</div>
		<button
			@click="getOnBoardingLink"
			class="btn btn-sm btn-primary rounded-sm w-max"
		>
			<span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
			<span v-else>get setup link</span>
		</button>
		<div v-if="onBoardingLink">
			<a :href="onBoardingLink" class="underline text-info text-sm"
				>follow this link to set up a stripe account
			</a>
			<!-- <button
				@click="startOnBoarding"
				ref="toStripeLinkButton"
				id="toStripeLinkButton"
			>
				follow this link to begin account stipe on stripe. It won't tak much
				time
			</button> -->
		</div>
	</div>
	<div v-else>
		<PaymentAccountDetails :connectedAccId="user.payment?.connectedAccId" />
	</div>
</template>

<style scoped></style>
