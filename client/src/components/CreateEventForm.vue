<script setup lang="ts">
import { isBefore, isSameDay } from "date-fns";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAlertStore } from "@/stores/alert";

const { setSuccessMsg, setErrorMsg, setIsLoading, resetErrorMsg } =
	useAlertStore();

const { isLoading } = storeToRefs(useAlertStore());

const router = useRouter();
const baseUrl = import.meta.env.VITE_BASE_URL;

const dateString = ref<string>();
const timeString = ref<string>();

export type TEvent = {
	title: string;
	desc: string;
	imageUrl: string;
	location: string;
	time: string; //"2023-12-14T10:34:37.712Z"
	ticketPrice?: number;
	ticketType: "paid" | "free";
	priceId?: string; // new
	productId?: string; // new
};
export type TFetchEvent = TEvent & {
	id: string;
	orgId: string;
	org: {
		name: string;
		payment: { connectedAccId: string; detailsSubmitted: boolean };
	};
};
const eventData = ref<TEvent>({
	title: "",
	desc: "",
	imageUrl: "",
	location: "",
	time: "",
	ticketType: "paid",
});

const validateTicketPriceInput = (e: Event) => {
	// !! move this to submit event instead of change event.
	const input = e.target as HTMLInputElement;
	const inputPattern = /^\d+$/;

	const isValidInput = inputPattern.test(input.value);
	if (!isValidInput) {
		input.setCustomValidity("please enter digits only");
	} else {
		input.setCustomValidity("");
	}
};
// console.log("date", new Date("2023-12-14T10:34"));
async function submitEvent(e: Event) {
	resetErrorMsg();
	setIsLoading(true);
	// console.log("date string", timeString, dateString);
	// console.log("eventData", eventData.value);
	const formEl = e.target as HTMLFormElement;
	const fileInputEl = formEl.querySelector(
		'input[type="file"]'
	) as HTMLInputElement;
	const file = fileInputEl.files;
	if (file) {
		const imageUrl = await uploadImage(file);
		// const imageUrl = "z";
		if (imageUrl) {
			// console.log("url", imageUrl);
			eventData.value.imageUrl = imageUrl;
			// console.log("eventData-in", eventData.value);

			// create event
			try {
				const url = `${baseUrl}/event/create`;
				const accessToken = localStorage.getItem("accessToken");
				const { title, desc, imageUrl, location, time, ticketType } =
					eventData.value;
				const createEventData = eventData.value.ticketPrice
					? {
							title,
							desc,
							imageUrl,
							location,
							time,
							ticketType,
							ticketPrice: Number(eventData.value.ticketPrice),
					  }
					: { title, desc, imageUrl, location, time, ticketType };
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
					//convert string to number, only if there is ticketPrice
					body: JSON.stringify(createEventData),
				};
				const res = await fetch(url, opts);
				if (!res.ok) {
					setErrorMsg("could not create event. Please retry!");
				}
				const data = await res.json();
				// console.log("data", data);
				if (data.id) {
					setSuccessMsg("event created!");
					router.push({ path: "/user/profile/events" });
				}
				// console.log("data", data);
			} catch (error) {
				setErrorMsg("could not create event. Please retry!");
				console.log("error", error);
			} finally {
				setIsLoading(false);
			}
		}
	}
}

function validateDate(e: Event) {
	const inputEl = e.target as HTMLInputElement;
	const chosenDate = inputEl.value;
	const outdated =
		isBefore(new Date(chosenDate), new Date()) ||
		isSameDay(new Date(chosenDate), new Date());
	if (outdated) {
		// console.log("outdated", chosenDate);
		inputEl.setCustomValidity("Please select a date from tommorrow onwards!");
	} else {
		inputEl.setCustomValidity("");
		// console.log("not-outdated", chosenDate);
	}
}

async function uploadImage(file: FileList) {
	resetErrorMsg();
	const formData = new FormData();
	if (file && file?.length > 0) {
		// console.log("file", file[0]);
		formData.append("file", file[0]);
	}
	try {
		const url = `${baseUrl}/cloudinary/upload`;
		const opts = {
			method: "POST",
			body: formData,
		};
		const res = await fetch(url, opts);
		const data = await res.json();
		const { secure_url } = data;
		return secure_url;
	} catch (error) {
		setErrorMsg("could not upload image. Please retry!");
	}
	/**
	 * data:{api_key:}
	 */
}
watch([dateString, timeString], () => {
	eventData.value.time = `${dateString.value}T${timeString.value}`;
});
</script>
<template>
	<div class="py-4">
		<h2 class="text-xl text-info">Create a new event</h2>
	</div>
	<div class="w-2/4">
		<form action="" class="flex flex-col gap-2" @submit.prevent="submitEvent">
			<table class="table-auto border-separate border-spacing-2">
				<tbody>
					<tr>
						<td>
							<label for="title">Title</label>
						</td>
						<td>
							<input
								v-model="eventData.title"
								type="text"
								name="title"
								id="title"
								placeholder="title"
								required
								class="input input-sm input-bordered rounded-sm"
							/>
						</td>
					</tr>
					<tr>
						<td>
							<label for="desc">Description</label>
						</td>
						<td>
							<textarea
								v-model="eventData.desc"
								name="desc"
								id="desc"
								cols="30"
								rows="3"
								placeholder="description"
								required
								class="textarea textarea-bordered rounded-sm p-2"
							></textarea>
						</td>
					</tr>
					<tr>
						<td>
							<label for="img">Choose pic for your event</label>
						</td>
						<td>
							<input
								type="file"
								name="img"
								id="img"
								class="file-input file-input-sm file-input-bordered rounded-sm"
							/>
						</td>
					</tr>
					<tr>
						<td>
							<label for="location">Location</label>
						</td>
						<td>
							<input
								v-model="eventData.location"
								type="text"
								name="location"
								placeholder="location"
								required
								class="input input-sm input-bordered rounded-sm p-2"
							/>
						</td>
					</tr>
					<tr>
						<td>
							<label for="date">Date</label>
						</td>
						<td>
							<input
								v-model="dateString"
								@input="validateDate"
								type="date"
								name="date"
								id="date"
								required
								class="input input-sm input-bordered p-2 rounded-sm"
							/>
						</td>
					</tr>
					<tr>
						<td>
							<label for="time">Time</label>
						</td>
						<td>
							<input
								v-model="timeString"
								type="time"
								name="time"
								id="time"
								required
								class="input input-sm input-bordered p-2 rounded-sm"
							/>
						</td>
					</tr>
					<tr>
						<td><p>Tickets</p></td>
						<td class="flex gap-2">
							<label for="ticket" class="flex items-center gap-2">
								free<input
									type="radio"
									name="ticketType"
									value="free"
									id="free"
									class="radio-xs checked:bg-blue-500"
									v-model="eventData.ticketType"
								/>
							</label>
							<label for="ticket" class="flex items-center gap-2">
								paid<input
									type="radio"
									name="ticketType"
									value="paid"
									id="paid"
									class="radio-xs checked:bg-blue-500"
									v-model="eventData.ticketType"
								/>
							</label>
						</td>
					</tr>
					<tr v-if="eventData.ticketType == 'paid'">
						<td>
							<label for="ticketPrice">Ticket price</label>
						</td>
						<td>
							<input
								v-model="eventData.ticketPrice"
								type="text"
								name="ticketPrice"
								id="ticketPrice"
								class="p-2 border"
								required
								@input="validateTicketPriceInput"
							/>
						</td>
					</tr>
				</tbody>
			</table>

			<button type="submit" class="btn btn-sm btn-primary rounded-sm">
				<span
					v-if="isLoading"
					class="loading loading-spinner loading-xs"
				></span>
				<span v-else>create</span>
			</button>
		</form>
	</div>
</template>

<style scoped></style>
