<script setup lang="ts">
import { reactive } from "vue";
import { ILog } from "../interfaces/ILog";
import { logList } from "../mocks/logs";
import LogsByDate from "../components/LogsByDate.vue";

const logs = reactive(logList);

const newLog = reactive({
  description: "",
  value: "",
  dateOfTransaction: "",
});

function addLog() {
  if (Object.values(newLog).every((val) => val)) {
    const tempLog: ILog = {
      ...newLog,
      value: +newLog.value,
    };

    logs.push(tempLog);
    resetForm();
  }
}

function resetForm() {
  newLog.description = "";
  newLog.value = "";
  newLog.dateOfTransaction = "";
}
</script>

<template>
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

  <LogsByDate :logs="logs" />
</template>
