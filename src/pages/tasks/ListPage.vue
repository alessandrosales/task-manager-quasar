<template>
  <q-page padding>
    <default-container title="Lista de Tasks">
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <task-filter @filtrate="filtrate" />
        </div>
        <div class="col-12">
          <task-table :records="filteredRecords" />
        </div>
      </div>
    </default-container>
  </q-page>
</template>

<script lang="ts">
import DefaultContainer from 'src/components/shared/DefaultContainer.vue';
import TaskTable from 'src/components/tasks/TaskTable.vue';
import TaskFilter from 'src/components/tasks/TaskFilter.vue';
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { Task } from 'src/interfaces/tasks';
import { useTasksStore } from 'src/stores/tasks';

export default defineComponent({
  components: { DefaultContainer, TaskTable, TaskFilter },
  setup() {
    const tasksStore = useTasksStore();

    const records = computed(() => tasksStore.list);
    const filteredRecords = ref<Task[]>([]);

    function filtrate(search: string) {
      if (typeof search === 'string') {
        const tasks = records.value.filter((r: Task) => {
          const str = `${r.title}-${r.description}`.toLowerCase();
          const index = str.indexOf(search.toLowerCase()) as number;
          return index > -1;
        });

        filteredRecords.value = [...tasks];
      } else {
        filteredRecords.value = [...records.value];
      }
    }

    onMounted(() => {
      filteredRecords.value = [...records.value];
    });

    watch(records, (newValue) => {
      filteredRecords.value = newValue;
    });

    return { records, filteredRecords, filtrate };
  },
});
</script>
