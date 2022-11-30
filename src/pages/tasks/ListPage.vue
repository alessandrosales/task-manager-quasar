<template>
  <q-page padding>
    <default-container title="Lista de Tasks">
      <table-skeleton v-if="loading" />
      <div v-else class="row q-col-gutter-md">
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
import { computed, defineComponent, onMounted, ref } from 'vue';
import { Task } from 'src/interfaces/tasks';
import { useTasksStore } from 'src/stores/tasks';
import { useQuasar } from 'quasar';
import TableSkeleton from 'src/components/shared/TableSkeleton.vue';

interface FiltrateParams {
  search?: string;
  status?: string;
}

export default defineComponent({
  components: { DefaultContainer, TaskTable, TaskFilter, TableSkeleton },
  setup() {
    const q = useQuasar();
    const tasksStore = useTasksStore();

    const records = computed(() => tasksStore.list);
    const filteredRecords = ref<Task[]>([]);
    const loading = ref(true);

    function filtrate(filter: FiltrateParams) {
      let tasks: Task[] = [...records.value];

      localStorage.setItem('tasks:filter', JSON.stringify(filter));

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
      q.loadingBar.start();

      setTimeout(() => {
        tasksStore.load();

        if (localStorage.getItem('tasks:filter')) {
          const filter = JSON.parse(
            localStorage.getItem('tasks:filter') as string
          ) as FiltrateParams;
          filtrate(filter);
        }

        q.loadingBar.stop();
        loading.value = false;
      }, 1500);
    });

    return { records, filteredRecords, filtrate, loading };
  },
});
</script>
