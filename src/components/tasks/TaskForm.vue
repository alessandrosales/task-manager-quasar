<template>
  <q-form @submit="submit">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-sm-6 col-md-6">
        <q-input
          label="Título"
          v-model="record.title"
          :rules="[required]"
          hint="Informe um título da task"
          lazy-rules
          placeholder="Informe o título da task"
          outlined
          :dense="q.screen.lt.md"
        />
      </div>
      <div class="col-6 col-sm-6 col-md-3">
        <q-select
          label="Prioridade"
          v-model="record.priority"
          :options="priorities"
          :rules="[required]"
          lazy-rules
          emit-value
          map-options
          outlined
          :dense="q.screen.lt.md"
        />
      </div>
      <div class="col-6 col-sm-6 col-md-3">
        <q-select
          label="Status"
          v-model="record.status"
          :options="statuses"
          :rules="[required]"
          lazy-rules
          emit-value
          map-options
          outlined
          :dense="q.screen.lt.md"
        />
      </div>
      <div class="col-12 col-sm-6 col-md-6">
        <q-select
          label="Usuário"
          v-model="record.user_id"
          :options="userList"
          option-value="id"
          option-label="name"
          emit-value
          map-options
          outlined
          :dense="q.screen.lt.md"
        />
      </div>
      <div class="col-12 col-sm-6 col-md-6">
        <q-select
          label="Tags"
          v-model="record.tags"
          :options="tagList"
          option-value="id"
          option-label="name"
          emit-value
          map-options
          use-chips
          multiple
          outlined
          :dense="q.screen.lt.md"
        />
      </div>
      <div class="col-12 col-sm-6">
        <div class="q-mb-sm">Nível de dificuldade</div>
        <q-rating
          v-model="record.level"
          color="red"
          size="40px"
          icon="local_fire_department"
        />
      </div>
      <div class="col-12">
        <q-editor
          label="Título"
          v-model="record.description"
          :dense="q.screen.lt.md"
        />
      </div>
      <div class="col-12 text-right">
        <q-btn
          label="Voltar"
          type="button"
          @click="goToList"
          :dense="q.screen.lt.md"
          flat
        />
        <q-btn
          label="Salvar"
          type="submit"
          color="primary"
          :dense="q.screen.lt.md"
          class="q-ml-sm"
        />
      </div>
    </div>
  </q-form>
</template>

<script lang="ts">
import { Task } from 'src/interfaces/tasks';
import { useValidation } from 'src/services/validation';
import { useTasksStore } from 'src/stores/tasks';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTagsStore } from 'src/stores/tags';
import { useUsersStore } from 'src/stores/users';
import { priorities } from 'src/constants/priorities';
import { statuses } from 'src/constants/statuses';

import { useException } from 'src/services/exception';
import { useQuasar } from 'quasar';
import { Tag } from 'src/interfaces/tags';

export default defineComponent({
  emits: ['submit'],
  setup(_, { emit }) {
    const q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const record = ref<Task>({
      title: null,
      description: '',
      priority: 'PRIORIDADE_1',
      status: 'PENDENTE',
      tags: [],
      level: 0,
      user_id: null,
      user: null,
    });

    const { handleException } = useException();

    const { required } = useValidation();

    const tasksStore = useTasksStore();
    const tagsStore = useTagsStore();
    const usersStore = useUsersStore();

    const tagList = computed(() => tagsStore.list);
    const userList = computed(() => usersStore.list);

    const isNewRecord = computed(() => {
      return route.params.id === undefined;
    });

    function goToList() {
      router.push({ name: 'tasks' });
    }

    function submit() {
      emit('submit', record.value);
    }

    async function findRecord() {
      const currentRecord = await tasksStore.find(+route.params.id);
      const tags = currentRecord.tags.map((t: Tag) => t.id);
      record.value = {
        ...currentRecord,
        tags,
      };
    }

    onMounted(async () => {
      q.loading.show();
      if (!isNewRecord.value) {
        try {
          await usersStore.load();
          await findRecord();
        } catch (error) {
          handleException(error);
        }
      }
      q.loading.hide();
    });

    return {
      q,
      record,
      isNewRecord,
      tagList,
      userList,
      priorities,
      statuses,
      required,
      submit,
      goToList,
    };
  },
});
</script>
