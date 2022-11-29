<template>
  <q-markup-table flat bordered>
    <thead>
      <tr>
        <th class="text-left" width="1%">Opções</th>
        <th class="text-left">Prioridade</th>
        <th class="text-left">Status</th>
        <th class="text-left">Título</th>
        <th class="text-left">Descrição</th>
        <th class="text-left">Tag(s)</th>
        <th class="text-left">Atributido Para</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(task, key) in records" :key="key">
        <td class="text-center">
          <q-btn icon="list" size="sm" round>
            <q-menu>
              <q-list separator dense>
                <q-item @click="goToRecord(task.id)" clickable v-close-popup>
                  <q-item-section>Editar</q-item-section>
                </q-item>
                <q-item
                  @click="remove(task.id)"
                  class="bg-red-8 text-white"
                  clickable
                  v-close-popup
                >
                  <q-item-section>Excluir</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </td>
        <td class="text-left">
          <q-btn :class="priorityClass(task.priority)" push>{{
            getPriorityLabel(task.priority)
          }}</q-btn>
        </td>
        <td class="text-left">
          {{ getStatusLabel(task.status) }}
        </td>
        <td class="text-left">
          {{ task.title }}
        </td>
        <td class="text-left">
          <q-btn
            @click="showDescription(task.description)"
            icon="article"
            round
            flat
          />
        </td>
        <td class="text-left">
          <q-chip
            v-for="(tag, key) in filteredTags(task.tags)"
            :key="key"
            :label="tag.name"
            class="shadow-4 text-white"
            :style="`background-color: ${tag.color}`"
          />
        </td>
        <td class="text-left">
          <span v-if="task.user !== null">
            <q-chip square>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
              Pedro
            </q-chip>
          </span>
          <span v-else>Usuário não definido</span>
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { priorities } from 'src/constants/priorities';
import { statuses } from 'src/constants/statuses';
import { Tag } from 'src/interfaces/tags';
import { useTagsStore } from 'src/stores/tags';
import { useTasksStore } from 'src/stores/tasks';
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  props: ['records'],
  setup() {
    const q = useQuasar();
    const router = useRouter();

    const tasksStore = useTasksStore();
    const tagsStore = useTagsStore();

    const taskList = computed(() => tasksStore.list);
    const tagList = computed(() => tagsStore.list);

    function priorityClass(priority: string) {
      if (priority === 'PRIORIDADE_1') {
        return 'bg-red text-white';
      }
      if (priority === 'PRIORIDADE_2') {
        return 'bg-orange text-white';
      }
      if (priority === 'PRIORIDADE_3') {
        return 'bg-blue-5 text-white';
      }
    }

    function getPriorityLabel(val: string) {
      if (typeof val === 'string') {
        const priority = priorities.find((p) => p.value == val);
        return priority?.label;
      }

      return val;
    }

    function getStatusLabel(val: string) {
      if (typeof val === 'string') {
        const status = statuses.find((p) => p.value == val);
        return status?.label;
      }

      return val;
    }

    function filteredTags(list: number[]) {
      return tagList.value.filter(
        (t: Tag) => list.indexOf(t.id as number) > -1
      );
    }

    function goToRecord(id?: number) {
      router.push({ name: 'task', params: { id } });
    }

    function remove(id: number) {
      q.dialog({
        title: 'Excluir Registro',
        message: 'Tem certeza que você quer prosseguir?',
        cancel: true,
        persistent: true,
      }).onOk(() => {
        const newList = taskList.value.filter((task) => task.id !== id);
        tasksStore.setList(newList);

        q.notify({
          message: 'Operação realizada com sucesso',
          color: 'positive',
          position: 'top-right',
        });
      });
    }

    function showDescription(message: string) {
      q.dialog({
        title: 'Descrição',
        message,
      });
    }

    return {
      showDescription,
      goToRecord,
      remove,
      getPriorityLabel,
      getStatusLabel,
      filteredTags,
      priorityClass,
    };
  },
});
</script>
