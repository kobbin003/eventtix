import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore(
	"user",
	() => {
		const initialUser = {} as User;
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
			user.value.address = arg;
		}

		function updatePersonnels(arg: TPersonnels) {
			user.value.personnels = arg;
		}
		function updatePayment(arg: TPayment) {
			user.value.payment = arg;
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
