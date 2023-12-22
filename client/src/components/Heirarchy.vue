<template>
	<div class="flex flex-col items-center bg-yellow-300">
		<div>
			<button @click="findHeirarchyPath('principal', principal)">
				{{ principal }}
			</button>
			<p>(Principal)</p>
		</div>
		<div class="border-l-2 border-txtColor h-6"></div>
		<div>
			<button @click="findHeirarchyPath('vicePrincipal', vicePrincipal)">
				{{ vicePrincipal }}
			</button>
			<p>(Vice Principal)</p>
		</div>
		<div class="border-l-2 border-txtColor h-6"></div>
		<div class="flex flex-col items-center">
			<h6>Staffs</h6>
			<div class="border-l-2 border-txtColor h-4"></div>
			<ul class="flex gap-3 border-t-2 border-txtColor">
				<li v-for="(staff, index) in staffs">
					<div
						v-if="index == 0"
						class="flex flex-col items-center -translate-x-1/2"
					>
						<div class="border-l-2 h-4"></div>
						<div>
							<button @click="findHeirarchyPath('staff', staff)">
								{{ staff }}
							</button>
							<p>staff-{{ index + 1 }}</p>
						</div>
					</div>
					<div
						v-else-if="index == staffs.length - 1"
						class="flex flex-col items-center translate-x-1/2"
					>
						<div class="border-l-2 h-4"></div>
						<div>
							<button @click="findHeirarchyPath('staff', staff)">
								{{ staff }}
							</button>
							<p>staff-{{ index + 1 }}</p>
						</div>
					</div>
					<div v-else class="flex flex-col items-center">
						<div class="border-l-2 h-4"></div>
						<div>
							<button @click="findHeirarchyPath('staff', staff)">
								{{ staff }}
							</button>
							<p>staff-{{ index + 1 }}</p>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div
			v-if="$route.path.includes('event')"
			class="flex text-sm breadcrumbs pl-2 md:mx-auto"
		>
			Heirarchy-path:
			<ul>
				<li v-for="item in heirarchyPath">
					{{ item }}
				</li>
			</ul>
		</div>
	</div>
	<div
		v-if="$route.path.includes('dashboard')"
		class="flex text-sm breadcrumbs pl-2 md:mx-auto"
	>
		Heirarchy-path:
		<ul>
			<li v-for="item in heirarchyPath">
				{{ item }}
			</li>
		</ul>
	</div>
	<div v-if="$route.path.includes('user/profile')">
		<button class="btn btn-sm btn-primary rounded-sm" @click="showModal">
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
				<PersonnelEditForm />
			</div>
		</dialog>
	</div>
</template>

<script setup lang="ts">
import { ref, type PropType } from "vue";
import PersonnelEditForm from "./PersonnelEditForm.vue";

const props = defineProps({
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

<style scoped></style>
