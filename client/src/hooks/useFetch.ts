import { useAlertStore } from "@/stores/alert";

export const useFetch = async (url: string, opts: any) => {
	const alertStore = useAlertStore();
	const { resetErrorMsg, setIsLoading, setErrorMsg } = alertStore;
	// console.log("useFetch");
	let data = null;
	let error = null;
	resetErrorMsg();
	setIsLoading(true);
	try {
		const res = await fetch(url, opts);
		if (!res.ok) {
			throw new Error("error: could not fetch");
		}
		const val = await res.json();
		data = val;
	} catch (err: any) {
		error = err.message;
		setErrorMsg(err.message);
		console.log("useFetch error", err.message);
	} finally {
		setIsLoading(false);
	}

	return { data, error };
};
