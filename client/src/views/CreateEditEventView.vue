<template>
	<div class="w-2/4">
		<form action="" class="flex flex-col">
			<table class="table-auto border-separate border-spacing-2">
				<tbody>
					<tr>
						<td>
							<label for="title">Title</label>
						</td>
						<td>
							<input
								type="text"
								name="title"
								id="title"
								placeholder="title"
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
								name="desc"
								id="desc"
								cols="30"
								rows="3"
								placeholder="description"
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
								type="text"
								name="location"
								placeholder="location"
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
								type="date"
								name="date"
								id="date"
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
								type="time"
								name="time"
								id="time"
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
									name="free"
									value="free"
									id="free"
									class="radio-xs checked:bg-blue-500"
									v-model="ticketType"
								/>
							</label>
							<label for="ticket" class="flex items-center gap-2">
								paid<input
									type="radio"
									name="paid"
									value="paid"
									id="paid"
									class="radio-xs checked:bg-blue-500"
									v-model="ticketType"
								/>
							</label>
						</td>
					</tr>
					<tr v-if="ticketType == 'paid'">
						<td>
							<label for="ticketPrice">Ticket price</label>
						</td>
						<td>
							<input
								type="text"
								name="ticketPrice"
								id="ticketPrice"
								class="p-2 border"
							/>
						</td>
					</tr>
				</tbody>
			</table>
			<input
				v-if="$route.path.includes('event/create')"
				type="submit"
				value="create"
				name="create"
				class="btn btn-sm btn-primary rounded-sm"
			/>
			<input
				v-else-if="$route.path.includes('event/edit')"
				type="submit"
				value="edit"
				name="edit"
				class="btn btn-sm btn-primary rounded-sm"
			/>
		</form>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const ticketType = ref("free");
</script>

<style scoped></style>
