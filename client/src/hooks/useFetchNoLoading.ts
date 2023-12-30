import { useAlertStore } from "@/stores/alert";
// import { ref, watchEffect, type Ref, toValue, onMounted } from "vue";

export const useFetchNoLoading = async (url: string, opts: any) => {
	console.log("usefetchnoloadin");
	let data = null;
	let error = null;
	const alertStore = useAlertStore();
	const { setErrorMsg, resetErrorMsg } = alertStore;
	resetErrorMsg();
	try {
		const res = await fetch(url, opts);
		if (!res.ok) {
			throw new Error("error: could not fetch");
		}
		const val = await res.json();
		data = val;
		// console.log("val", val);
		// setSuccessMsg("successful");
	} catch (err: any) {
		error = err.message;
		setErrorMsg(err.message);
		console.log("useFetch error", err.message);
	} finally {
	}

	return { data, error };
};
