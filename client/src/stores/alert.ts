import { defineStore } from "pinia";
import { ref } from "vue";

export const useAlertStore = defineStore("alert", () => {
	const successMsg = ref<string>();
	const errorMsgs = ref<string[]>([]);
	const isLoading = ref(false);

	function setSuccessMsg(msg: string) {
		successMsg.value = msg;
		setTimeout(() => {
			successMsg.value = "";
		}, 2000);
	}

	function setErrorMsg(msg: string) {
		// errorMsgs.value.push(msg);
		errorMsgs.value = [...errorMsgs.value, msg];
	}
	function resetErrorMsg() {
		// errorMsgs.value.push(msg);
		errorMsgs.value = [];
	}
	function setErrorMsgArray(msgs: string[]) {
		// msgs.map((msg) => errorMsgs.value.push(msg));
		errorMsgs.value = msgs;
	}

	function setIsLoading(val: boolean) {
		isLoading.value = val;
	}

	return {
		successMsg,
		errorMsgs,
		isLoading,
		setSuccessMsg,
		setErrorMsgArray,
		setErrorMsg,
		setIsLoading,
		resetErrorMsg,
	};
});
