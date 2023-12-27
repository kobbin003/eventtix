<script setup lang="ts">
import { ref, type PropType, onMounted } from "vue";
import PersonnelEditForm from "./PersonnelEditForm.vue";
import { useFetch } from "@/hooks/useFetch";
import { storeToRefs } from "pinia";
import { useAlertStore } from "@/stores/alert";
import type { TPersonnels } from "@/stores/user";
import { baseUrl } from "@/utils/constants";
const { isLoading } = storeToRefs(useAlertStore());

const props = defineProps({
	orgId: { type: String, requried: true },
	principal: { type: String, required: true },
	vicePrincipal: { type: String, required: true },
	staffs: { type: Array as PropType<string[]>, required: true },
});

const heirarchyPath = ref([""]);

const findHeirarchyPath = (position: string, personnel: string) => {
	switch (position) {
		case "principal":
			heirarchyPath.value = [personnel];
			break;
		case "vicePrincipal":
			heirarchyPath.value = [props.principal, personnel];
			break;
		case "staff":
			heirarchyPath.value = [props.principal, props.vicePrincipal, personnel];
			break;

		default:
			break;
	}
};

// modal

const modalOpen = ref(false);

const showModal = () => {
	modalOpen.value = true;
};
const closeModal = () => {
	modalOpen.value = false;
};
</script>
<template>
	<div v-if="isLoading">
		<span class="loading loading-spinner loading-lg"></span>
	</div>

	<div v-else class="border-2 border-primary-content/50 p-2 mt-4 mb-2">
		<p class="text-info text-xl">School Heirarchy</p>
		<div class="flex flex-col items-center mb-4">
			<div class="flex flex-col items-center">
				<button
					@click="findHeirarchyPath('principal', principal)"
					class="text-sm font-medium"
				>
					{{ props.principal }}
				</button>
				<p class="text-xs italic">[&nbsp;Principal&nbsp;]</p>
			</div>
			<div class="border-l-2 border-txtColor h-6"></div>
			<div class="flex flex-col items-center">
				<button
					@click="findHeirarchyPath('vicePrincipal', vicePrincipal)"
					class="text-sm font-medium"
				>
					{{ props.vicePrincipal }}
				</button>
				<p class="text-xs italic">[&nbsp;Vice Principal&nbsp;]</p>
			</div>
			<div class="border-l-2 border-txtColor h-6"></div>
			<div class="flex flex-col items-center">
				<h6>Staffs</h6>
				<div class="border-l-2 border-txtColor h-4"></div>
				<ul
					v-if="props.staffs.length > 1"
					class="flex gap-3 border-t-2 border-txtColor"
				>
					<li v-for="(staff, index) in props.staffs">
						<div
							v-if="index == 0"
							class="flex flex-col items-center -translate-x-1/2"
						>
							<div class="border-l-2 h-4"></div>
							<div class="flex flex-col items-center">
								<button
									@click="findHeirarchyPath('staff', staff)"
									class="text-sm font-medium"
								>
									{{ staff }}
								</button>
								<p class="text-xs italic">
									[&nbsp;staff-{{ index + 1 }}&nbsp;]
								</p>
							</div>
						</div>
						<div
							v-else-if="index == staffs.length - 1"
							class="flex flex-col items-center translate-x-1/2"
						>
							<div class="border-l-2 h-4"></div>
							<div class="flex flex-col items-center">
								<button
									@click="findHeirarchyPath('staff', staff)"
									class="text-sm font-medium"
								>
									{{ staff }}
								</button>
								<p class="text-xs italic">
									[&nbsp;staff-{{ index + 1 }}&nbsp;]
								</p>
							</div>
						</div>
						<div v-else class="flex flex-col items-center">
							<div class="border-l-2 h-4"></div>
							<div class="flex flex-col items-center">
								<button
									@click="findHeirarchyPath('staff', staff)"
									class="text-sm font-medium"
								>
									{{ staff }}
								</button>
								<p class="text-xs italic">
									[&nbsp;staff-{{ index + 1 }}&nbsp;]
								</p>
							</div>
						</div>
					</li>
				</ul>
				<ul v-else class="flex gap-3 border-txtColor">
					<li v-for="(staff, index) in props.staffs">
						<div class="flex flex-col items-center">
							<div class="border-l-2 h-4"></div>
							<div class="flex flex-col items-center">
								<button
									@click="findHeirarchyPath('staff', staff)"
									class="text-sm font-medium"
								>
									{{ staff }}
								</button>
								<p class="text-xs italic">
									[&nbsp;staff-{{ index + 1 }}&nbsp;]
								</p>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div
				v-if="$route.path.includes('event')"
				class="flex items-center gap-2 text-sm breadcrumbs pl-2 md:mx-auto"
			>
				<span class="text-xs">Heirarchy-path :</span>
				<ul>
					<li v-for="item in heirarchyPath">
						<span class="text-xs">{{ item }}</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="flex text-sm breadcrumbs pl-2 justify-center">
			Heirarchy-path&nbsp;:&nbsp;
			<ul>
				<li v-for="item in heirarchyPath">
					{{ item }}
				</li>
			</ul>
		</div>
		<div v-if="$route.path.includes('user/profile')">
			<button class="btn btn-sm btn-primary rounded-sm mt-4" @click="showModal">
				Edit Personnels
			</button>
			<dialog
				id="personnel_edit_modal"
				class="modal"
				:class="{ 'modal-open': modalOpen }"
			>
				<div class="flex flex-col items-end">
					<button
						class="btn-xs btn-circle bg-white border-2 border-gray-400 shadow-lg relative top-3 left-1"
						@click="closeModal"
					>
						x
					</button>
					<PersonnelEditForm :close-modal="closeModal" />
				</div>
			</dialog>
		</div>
	</div>
</template>

<style scoped></style>
