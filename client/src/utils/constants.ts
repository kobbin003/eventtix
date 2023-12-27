import { useAlertStore } from "@/stores/alert";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

export const baseUrl = import.meta.env.VITE_BASE_URL;

export const { setUser, updateUser, updateAddress, updatePersonnels } =
	useUserStore();
export const { user } = storeToRefs(useUserStore());
export const { setSuccessMsg } = useAlertStore();
export const { isLoading } = storeToRefs(useAlertStore());

export const accessToken = localStorage.getItem("accessToken");
