<template>
  <q-page padding>
    <task-form @submit="submit" />
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import TaskForm from 'src/components/tasks/TaskForm.vue';
import { Task } from 'src/interfaces/tasks';
import { useTasksStore } from 'src/stores/tasks';
import { computed, defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  components: { TaskForm },
  setup() {
    const q = useQuasar();
    const route = useRoute();
    const router = useRouter();

    const tasksStore = useTasksStore();
    const countTasks = computed(() => tasksStore.countTasks);
    const tagList = computed(() => tasksStore.list);

    const isNewRecord = computed(() => {
      return route.params.id === undefined;
    });

    function submit(record: Task) {
      if (record.id !== undefined) {
        const newList = tagList.value.map((task) => {
          if (task.id === record.id) {
            return {
              ...task,
              ...record,
            };
          }
          return task;
        });
        tasksStore.setList(newList);
      } else {
        const id = countTasks.value + 1;
        tasksStore.append({ ...record, id });
      }

      router.push({ name: 'tasks' });
      q.notify({
        message: 'Operação realizada com sucesso',
        color: 'positive',
        position: 'top-right',
      });
    }

    return { isNewRecord, submit };
  },
});
</script>
