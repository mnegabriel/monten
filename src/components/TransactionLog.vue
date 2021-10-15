<script setup lang="ts">
import { ILog } from "../interfaces/ILog";

const { log } = defineProps<{ log: ILog }>()
</script>

<template>
    <article class="log">
        <h6 class="log__title">{{ log.description }}</h6>
        <p class="log__value">{{ log.value }}</p>
    </article>
</template>

<style lang="scss" scoped>
.log {
    padding: 1rem;
    border-radius: 5px;
    border: 1px solid gray;

    &__title {
        color: gray;
    }
}
</style>
