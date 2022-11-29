<template>
  <q-form @submit="submit">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-input
          label="Título"
          v-model="record.title"
          :rules="[required]"
          lazy-rules
          placeholder="Informe o título da task"
          outlined
        />
      </div>
      <div class="col-12 col-md-3">
        <q-select
          label="Prioridade"
          v-model="record.priority"
          :options="priorities"
          :rules="[required]"
          lazy-rules
          emit-value
          map-options
          outlined
        />
      </div>
      <div class="col-12 col-md-3">
        <q-select
          label="Status"
          v-model="record.status"
          :options="statuses"
          :rules="[required]"
          lazy-rules
          emit-value
          map-options
          outlined
        />
      </div>
      <div class="col-12">
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
        />
      </div>
      <div class="col-12">
        <q-editor label="Título" v-model="record.description" />
      </div>
      <div class="col-12 text-right">
        <q-btn label="Voltar" type="button" @click="goToList" flat />
        <q-btn label="Salvar" type="submit" color="primary" class="q-ml-sm" />
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
import { priorities } from 'src/constants/priorities';
import { statuses } from 'src/constants/statuses';

export default defineComponent({
  emits: ['submit'],
  setup(_, { emit }) {
    const route = useRoute();
    const router = useRouter();
    const record = ref<Task>({
      title: null,
      description: '',
      priority: 'PRIORIDADE_1',
      status: 'PENDENTE',
      tags: [],
      user: null,
    });

    const { required } = useValidation();

    const tasksStore = useTasksStore();
    const tagsStore = useTagsStore();

    const tagList = computed(() => tagsStore.list);

    const isNewRecord = computed(() => {
      return route.params.id === undefined;
    });

    function goToList() {
      router.push({ name: 'tasks' });
    }

    function submit() {
      emit('submit', record.value);
    }

    onMounted(() => {
      if (!isNewRecord.value) {
        //devemos consultar no banco de dados
        const currentRecord = tasksStore.list.find(
          (t: Task) => t.id == +route.params.id
        ) as Task;

        if (currentRecord) {
          record.value = currentRecord;
        }
      }
    });

    return {
      record,
      isNewRecord,
      tagList,
      priorities,
      statuses,
      required,
      submit,
      goToList,
    };
  },
});
</script>
