<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { ILog } from '../interfaces/ILog';
import TransactionLog from './TransactionLog.vue';

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);

const { logs } = defineProps<{ logs: ILog[] }>()

const logSegments = computed(() => {
    return logs
        .reduce((acc, { dateOfTransaction }) => {
            if (!acc.includes(dateOfTransaction)) acc.push(dateOfTransaction);
            return acc;
        }, [] as string[])

        .map((dateSegment) => {
            const dateLogs = logs.filter(
                ({ dateOfTransaction }) => dateOfTransaction === dateSegment
            );
            return { dateSegment, dateLogs };
        })

        .sort((a, b) => {
            return dayjs(a.dateSegment, "DD/MM/YYYY")
                .isSameOrBefore(dayjs(b.dateSegment, "DD/MM/YYYY"))
                ? 1
                : -1;
        });
});
</script>

<template>
    <ul>
        <li v-for="(segment, i) of logSegments" :key="i">
            <h5>{{ segment.dateSegment }}</h5>
            <ul>
                <li v-for="(log, i) of segment.dateLogs" :key="i">
                    <TransactionLog :log="log" />
                </li>
            </ul>
        </li>
    </ul>
</template>