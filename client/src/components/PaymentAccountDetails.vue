<template>
	<div>
		<table>
			<tbody>
				<tr v-for="items in paymentAccountDetailsArray">
					<td>{{ items[0] }}</td>
					<td>{{ items[1] }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup lang="ts">
import { useFetch } from "@/hooks/useFetch";
import { baseUrl } from "@/utils/constants";
import { onMounted, ref, watchEffect } from "vue";

const props = defineProps({
	connectedAccId: { type: String, required: true },
});

const paymentAccountDetails = ref<TPaymentAccountDetails>({
	"business-name": "string",
	"business-number": "string",
	email: "string",
	"bank-account": "string",
	"account-holder-name": "string",
	"bank-name": "string",
	"IFSC-code": "string",
	country: "string",
	currency: "string",
});
const paymentAccountDetailsArray = ref<string[][]>();

watchEffect(() => {
	// console.log(Object.entries(paymentAccountDetails.value));
	paymentAccountDetailsArray.value = Object.entries(
		paymentAccountDetails.value
	);
	console.log(paymentAccountDetailsArray.value);
});
type TPaymentAccountDetails = {
	// [index: string]: string;
	"business-name": string;
	"business-number": string;
	email: string;
	"bank-account": string;
	"account-holder-name": string;
	"bank-name": string;
	"IFSC-code": string;
	country: string;
	currency: string;
};

onMounted(async () => {
	const url = `${baseUrl}/stripe/account?connectedAccId=${props.connectedAccId}`;
	const opts = {
		method: "GET",
	};
	const { data } = await useFetch(url, opts);
	if (data) {
		const {
			business_profile: { name, support_number },
			email,
			details_submitted,
			default_currency,
			country,
		} = data;
		console.log("connected-acc-data", data);
	}
});
</script>

<style scoped></style>
