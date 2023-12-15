<script setup lang="ts">
import { ref } from "vue";

const exposedValue = ref("kobin-exposed");
defineExpose({ exposedValue });
</script>
<template>
	<div>Expose child</div>
</template>

<style scoped></style>
