<script setup lang="ts">
import { reactive, computed } from 'vue'
import day from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { ILog } from './interfaces/ILog'
import { logList } from './mocks/logs'

day.extend(customParseFormat)
day.extend(isSameOrBefore)

const logs = reactive(logList)

const logSegments = computed(() => {
  const dates = logs.reduce((acc, log) => {
    if (!acc.includes(log.dateOfTransaction)) acc.push(log.dateOfTransaction)
    return acc
  }, [] as string[])

  return dates
    .map(dateSegment => {
      const dateLogs = logs.filter(log => log.dateOfTransaction === dateSegment)
      return {
        dateSegment,
        dateLogs
      }
    })
    .sort((a, b) => {
      return day(a.dateSegment, "DD/MM/YYYY").isSameOrBefore(day(b.dateSegment, "DD/MM/YYYY")) ? 1 : -1
    })
})



const newLog = reactive({
  description: '',
  value: '',
  dateOfTransaction: '',
})

function addLog() {
  if (Object.values(newLog).every(val => val)) {

    const tempLog: ILog = {
      ...newLog,
      value: +newLog.value
    }

    logs.push(tempLog)
    resetForm()
  }
}

function resetForm() {
  newLog.description = ''
  newLog.value = ''
  newLog.dateOfTransaction = ''
}

</script>

<template>
  <h1>Monten</h1>

  <form @submit.prevent="addLog">
    <h4>New Log</h4>
    <label for="logDescription">
      <p>Description</p>
      <input id="logDescription" type="text" v-model="newLog.description" />
    </label>
    <br />
    <label for="logValue">
      <p>Value</p>
      <input id="logValue" type="text" v-model="newLog.value" />
    </label>
    <br />
    <label for="logDate">
      <p>Date</p>
      <input id="logDate" type="text" v-model="newLog.dateOfTransaction" />
    </label>
    <br />
    <input type="submit" value="add log" />
  </form>

  <ul>
    <li v-for="(segment, i) of logSegments" :key="i">
      <h4>{{ segment.dateSegment }}</h4>
      <ul>
        <li v-for="(log, i) of segment.dateLogs" :key="i">
          <span>{{ log.description + " " }}</span>
          <span>{{ log.value }}</span>
        </li>
      </ul>
    </li>
  </ul>
</template>

<style lang="scss">
  form {
    display: flex;
    flex-wrap: wrap;
    
    &>* {
      flex-grow: 1;
      
    }
  }
</style>
