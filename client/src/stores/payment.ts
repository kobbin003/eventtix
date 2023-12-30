import { defineStore } from "pinia";
import { ref } from "vue";

export const payments = defineStore(
	"payments",
	() => {
		const paymentDetails = ref();
		return "";
	},
	{ persist: true }
);

export type TPayment = {
	orgId: string;
	connectedAccId: string;
	detailsSubmitted: boolean;
};
