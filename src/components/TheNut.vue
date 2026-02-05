<script setup lang="ts">
const props = defineProps(['torusArgs', 'position'])
defineEmits(['click'])

const outboundRef = defineModel()
</script>

<template>
    <TresMesh ref="outboundRef" :position="props.position" @click="$emit('click')">
        <TresTorusGeometry :args="props.torusArgs" />
        <TresMeshBasicMaterial color="#ff6b35" />
    </TresMesh>
</template>