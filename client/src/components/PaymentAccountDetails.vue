<script setup lang="ts">
import { useFetch } from "@/hooks/useFetch";
import { baseUrl } from "@/utils/constants";
import { onMounted, ref, watchEffect } from "vue";

const props = defineProps({
	connectedAccId: { type: String, required: true },
});

type TPaymentAccountDetails = {
	// [index: string]: string;
	"Business name": string;
	"Business number": string;
	Email: string;
	"Bank account (last 4 number)": string;
	"Account holder name": string;
	"Bank name": string;
	"IFSC code": string;
	Country: string;
	Currency: string;
};
const paymentAccountDetails = ref<TPaymentAccountDetails>({
	"Business name": "",
	"Business number": "",
	Email: "",
	"Bank account (last 4 number)": "",
	"Account holder name": "",
	"Bank name": "",
	"IFSC code": "",
	Country: "",
	Currency: "",
});

const paymentAccountDetailsArray = ref<string[][]>();

watchEffect(() => {
	// console.log(Object.entries(paymentAccountDetails.value));
	paymentAccountDetailsArray.value = Object.entries(
		paymentAccountDetails.value
	);
	console.log("array[]", paymentAccountDetailsArray.value);
});

onMounted(async () => {
	const url = `${baseUrl}/stripe/account?connectedAccId=${props.connectedAccId}`;
	const opts = {
		method: "GET",
	};
	const { data } = await useFetch(url, opts);
	if (data) {
		const {
			business_profile: { name, support_phone },
			email,
			details_submitted,
			external_accounts,
		} = data;
		console.log("connected-acc-data", data);

		// set the ref
		paymentAccountDetails.value["Business name"] = name;
		paymentAccountDetails.value["Business number"] = support_phone;
		paymentAccountDetails.value.Email = email;
		paymentAccountDetails.value["Bank account (last 4 number)"] =
			external_accounts.data[0].last4;
		paymentAccountDetails.value["Bank name"] =
			external_accounts.data[0].bank_name;
		paymentAccountDetails.value["Account holder name"] =
			external_accounts.data[0].account_holder_name;
		paymentAccountDetails.value["IFSC code"] =
			external_accounts.data[0].routing_number;
		paymentAccountDetails.value["Country"] = external_accounts.data[0].country;
		paymentAccountDetails.value["Currency"] = external_accounts.data[0].currency
			.split("")
			.map((letter: string) => letter.toUpperCase())
			.join("");
	}
});
</script>
<template>
	<div>
		<table class="table text-xs md:text-sm">
			<tbody>
				<tr v-for="items in paymentAccountDetailsArray" :key="items[0]">
					<td>{{ items[0] }}</td>
					<td>{{ items[1] }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<style scoped></style>
