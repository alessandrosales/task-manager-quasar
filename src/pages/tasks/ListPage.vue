<template>
  <q-page padding>
    <default-container title="Lista de Tasks">
      <table-skeleton v-if="loading" />
      <div v-else class="row q-col-gutter-md">
        <div class="col-12">
          <task-filter @filtrate="filtrate" />
        </div>
        <div class="col-12">
          <task-table :records="records" />
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
import { useTasksStore } from 'src/stores/tasks';
import { useQuasar } from 'quasar';
import TableSkeleton from 'src/components/shared/TableSkeleton.vue';
import { useException } from 'src/services/exception';

interface FiltrateParams {
  search?: string;
  status?: string;
}

export default defineComponent({
  components: { DefaultContainer, TaskTable, TaskFilter, TableSkeleton },
  setup() {
    const q = useQuasar();
    const tasksStore = useTasksStore();

    const { handleException } = useException();

    const records = computed(() => tasksStore.list);
    const loading = ref(true);

    async function filtrate(filter: FiltrateParams = {}) {
      q.loading.show();
      try {
        const list = await tasksStore.findAll(filter);
        tasksStore.setList(list);
        loading.value = false;
      } catch (error) {
        handleException('Não foi possível carregar os dados');
      }
      q.loading.hide();
    }

    onMounted(async () => {
      await filtrate();
    });

    return { records, filtrate, loading };
  },
});
</script>
