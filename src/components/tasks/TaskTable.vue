<template>
  <q-markup-table flat bordered>
    <thead>
      <tr>
        <th class="text-left" width="1%">Opções</th>
        <th class="text-left">Prioridade</th>
        <th class="text-left">Dificuldade</th>
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
          <q-rating
            :model-value="task.level || 0"
            color="red"
            size="30px"
            icon="local_fire_department"
            readonly
          />
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
            v-for="(tag, key) in task.tags"
            :key="key"
            :label="tag.name"
            class="shadow-4 text-white"
            :style="`background-color: ${tag.color}`"
          />
        </td>
        <td class="text-left">
          <span v-if="task.user">
            <q-chip square>
              <q-avatar>
                <img :src="task.user.avatar" />
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
import { useTasksStore } from 'src/stores/tasks';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

import { useException } from 'src/services/exception';

export default defineComponent({
  props: ['records'],
  setup() {
    const q = useQuasar();
    const router = useRouter();
    const { handleException } = useException();

    const tasksStore = useTasksStore();

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

    function goToRecord(id?: number) {
      router.push({ name: 'task', params: { id } });
    }

    function remove(id: number) {
      q.dialog({
        title: 'Excluir Registro',
        message: 'Tem certeza que você quer prosseguir?',
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        try {
          await tasksStore.delete(id);
          await tasksStore.load();
          q.notify({
            message: 'Operação realizada com sucesso',
            color: 'positive',
            position: 'top-right',
          });
        } catch (error) {
          handleException(error);
        }
      });
    }

    function showDescription(message: string) {
      q.dialog({
        title: 'Descrição',
        message,
        html: true,
      });
    }

    return {
      showDescription,
      goToRecord,
      remove,
      getPriorityLabel,
      getStatusLabel,
      priorityClass,
    };
  },
});
</script>
