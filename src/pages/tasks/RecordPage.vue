<template>
  <q-page padding>
    <task-form @submit="submit" />
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import TaskForm from 'src/components/tasks/TaskForm.vue';
import { Task } from 'src/interfaces/tasks';
import { useException } from 'src/services/exception';
import { useTasksStore } from 'src/stores/tasks';
import { computed, defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  components: { TaskForm },
  setup() {
    const q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const { handleException } = useException();

    const tasksStore = useTasksStore();

    const isNewRecord = computed(() => {
      return route.params.id === undefined;
    });

    async function submit(record: Task) {
      q.loading.show();
      try {
        if (record.id !== undefined) {
          await tasksStore.update(record);
        } else {
          await tasksStore.save(record);
        }

        router.push({ name: 'tasks' });
        q.notify({
          message: 'Operação realizada com sucesso',
          color: 'positive',
          position: 'top-right',
        });
      } catch (error) {
        handleException(error);
      }
      q.loading.hide();
    }

    return { isNewRecord, submit };
  },
});
</script>
