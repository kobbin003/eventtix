import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore(
	"user",
	() => {
		const initialUser = {} as User;
		const user = ref<User>(initialUser);

		// const getUser = user.value;

		function setUser(arg: User) {
			Object.assign(user.value, arg);
		}

		function updateUser(arg: Partial<User>) {
			Object.assign(user.value, { ...user.value, ...arg });
		}

		function updateAddress(arg: TAddress) {
			Object.assign(user, {
				...user,
				address: { ...user.value.address, ...arg },
			});
		}
		// function updateAddress(arg: Partial<TAddress>) {
		// 	Object.assign(user, {
		// 		...user,
		// 		address: { ...user.value.address, ...arg },
		// 	});
		// }

		function updatePersonnels(arg: TPersonnels) {
			Object.assign(user, {
				...user,
				personnels: { ...user.value.personnels, ...arg },
			});
		}
		// function updatePersonnels(arg: Partial<TPersonnels>) {
		// 	Object.assign(user, {
		// 		...user,
		// 		personnels: { ...user.value.personnels, ...arg },
		// 	});
		// }

		return { user, setUser, updateUser, updateAddress, updatePersonnels };
	},
	{ persist: true }
);

export type Credentials = {
	id: string;
	name: string;
	email: string;
};
export type LoginUser = Credentials & {
	accessToken: string;
	addressId?: string;
	personnelsId?: string;
};
export type User = Credentials & {
	accessToken: string;
	addressId?: string;
	personnelsId?: string;
	address?: TAddress | null;
	personnels?: TPersonnels | null;
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

// const storedUserState = localStorage.getItem('userStore');
// if (storedUserState) {
//   useUserStore.$restore(JSON.parse(storedUserState));
// }

// // Watch for changes in the store and update localStorage
// useUserStore.$subscribe((store) => {
//   localStorage.setItem('userStore', JSON.stringify(store));
// });
