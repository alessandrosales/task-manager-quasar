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

interface FiltrateParams {
  search?: string;
  status?: string;
}

export default defineComponent({
  components: { DefaultContainer, TaskTable, TaskFilter },
  setup() {
    const tasksStore = useTasksStore();

    const records = computed(() => tasksStore.list);
    const filteredRecords = ref<Task[]>([]);

    function filtrate(filter: FiltrateParams) {
      let tasks: Task[] = [...records.value];

      if (typeof filter.search === 'string') {
        const filterBySearch = records.value.filter((r: Task) => {
          const str = `${r.title}-${r.description}`.toLowerCase();
          const src = filter.search as string;
          const index = str.indexOf(src.toLowerCase()) as number;
          return index > -1;
        });
        tasks = filterBySearch;
      }

      if (typeof filter.status === 'string') {
        const sts = filter.status as string;
        const filterByStatus = tasks.filter((t: Task) => {
          return t.status == sts;
        });
        tasks = filterByStatus;
      }

      filteredRecords.value = [...tasks];
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
