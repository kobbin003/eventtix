import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore(
	"user",
	() => {
		const initialUser = {
			payment: { connectedAccId: "", detailsSubmitted: false },
		} as User;
		const user = ref<User>(initialUser);

		// const getUser = user.value;

		function setUser(arg: User) {
			// Object.assign(user.value, arg);
			user.value = arg;
		}

		// function updateUser(arg: Partial<User>) {
		// 	// Object.assign(user.value, { ...user.value, ...arg });
		// 	user.value = {...user,...arg}
		// }

		function updateAddress(arg: TAddress) {
			if (user.value.address) {
				user.value.address.addressLine1 = arg.addressLine1;
				user.value.address.addressLine2 = arg.addressLine2;
				user.value.address.state = arg.state;
				user.value.address.pin = arg.pin;
			}
		}

		function updatePersonnels({
			principal,
			vicePrincipal,
			staffs,
		}: TPersonnels) {
			if (user.value.personnels) {
				user.value.personnels.principal = principal;
				user.value.personnels.vicePrincipal = vicePrincipal;
				user.value.personnels.staffs = staffs;
			}
		}
		function updatePayment({ connectedAccId, detailsSubmitted }: TPayment) {
			if (user.value.payment) {
				console.log("payment updated", connectedAccId, detailsSubmitted);
				user.value.payment.connectedAccId = connectedAccId;
				user.value.payment.detailsSubmitted = detailsSubmitted;
			}
		}

		return {
			user,
			setUser,
			updateAddress,
			updatePersonnels,
			updatePayment,
		};
	},
	{ persist: true }
);

export type Credentials = {
	id: string;
	name: string;
	email: string;
};

export type User = Credentials & {
	accessToken: string;
	addressId?: string;
	personnelsId?: string;
	address?: TAddress;
	personnels?: TPersonnels;
	payment?: TPayment;
};

export type TAddress = {
	addressLine1: string;
	addressLine2: string;
	state: string;
	pin: number;
};

export type TPersonnels = {
	principal: string;
	vicePrincipal: string;
	staffs: string[];
};

export type TPayment = {
	connectedAccId: string;
	detailsSubmitted: boolean;
};
