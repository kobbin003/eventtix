import { useAlertStore } from "@/stores/alert";
import { ref, watchEffect, type Ref, toValue, onMounted } from "vue";

export const useFetch = async (url: string, opts: any) => {
	console.log("yseFetch");
	let data = null;
	let error = null;
	const alertStore = useAlertStore();
	const { setSuccessMsg, setErrorMsg, resetErrorMsg, setIsLoading } =
		alertStore;
	resetErrorMsg();
	setIsLoading(true);
	try {
		const res = await fetch(url, opts);
		if (!res.ok) {
			throw new ErrorEvent("error: could not fetch");
		}
		const val = await res.json();
		data = val;
		// console.log("val", val);
		// setSuccessMsg("successful");
	} catch (err: any) {
		error = err.message;
		setErrorMsg(err.message);
	} finally {
		setIsLoading(false);
	}

	return { data, error };
};
// export const useFetch = async (url: string, opts: any) => {
// 	console.log("yseFetch");
// 	const data = ref(null);
// 	const error = ref(null);
// 	const alertStore = useAlertStore();
// 	const { setSuccessMsg, setErrorMsg, resetErrorMsg, setIsLoading } =
// 		alertStore;
// 	resetErrorMsg();
// 	setIsLoading(true);
// 	data.value = null;
// 	error.value = null;
// 	try {
// 		const res = await fetch(url, opts);
// 		if (!res.ok) {
// 			throw new ErrorEvent("error: could not fetch");
// 		}
// 		const val = await res.json();
// 		data.value = val;
// 		// console.log("val", val);
// 		// setSuccessMsg("successful");
// 	} catch (err: any) {
// 		error.value = err.message;
// 		setErrorMsg(err.message);
// 	} finally {
// 		setIsLoading(false);
// 	}

// 	return { data: data.value, error: error.value };
// };
