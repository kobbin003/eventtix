import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
	const initialUser = {} as User;
	const user = ref<User>(initialUser);

	const getUser = user.value;

	function setUser(arg: User) {
		Object.assign(user.value, arg);
	}

	function updateUser(arg: Partial<User>) {
		Object.assign(user.value, { ...user.value, ...arg });
	}

	function updateAddress(arg: Partial<Address>) {
		Object.assign(user, {
			...user,
			address: { ...user.value.address, ...arg },
		});
	}

	function updatePersonnels(arg: Partial<Personnels>) {
		Object.assign(user, {
			...user,
			personnels: { ...user.value.personnels, ...arg },
		});
	}

	return { getUser, setUser, updateUser, updateAddress, updatePersonnels };
});

export type LoginUser = Credentials & {
	accessToken: string;
	addressId?: string;
	personnelsId?: string;
};
type User = Credentials & {
	accessToken: string;
	address?: Address;
	personnels?: Personnels;
};
export type Credentials = {
	id: string;
	name: string;
	email: string;
};
export type Address = {
	addressLine1: string;
	addressLine2: string;
	state: string;
	pin: number;
};

export type Personnels = {
	principal: string;
	vicePrincipal: string;
	staffs: string[];
};
