<template>
  <div class="row q-col-gutter-md">
    <div class="col-12 col-sm-6 col-md-6">
      <q-input
        label="Pesquisa"
        v-model="search"
        @keyup.enter="filtrate()"
        clearable
        placeholder="Pesquise por descrição"
        outlined
        :dense="q.screen.lt.md"
      />
    </div>
    <div class="col-12 col-sm-6 col-md-6">
      <q-select
        label="Status"
        v-model="status"
        :options="statuses"
        emit-value
        map-options
        @keyup.enter="filtrate()"
        clearable
        outlined
        :dense="q.screen.lt.md"
      />
    </div>
    <div class="col-12 text-right">
      <q-btn
        icon="add"
        label="Adicionar"
        @click="goToRecord()"
        color="primary"
        :dense="q.screen.lt.md"
      />
      <q-btn
        icon="search"
        label="Filtrar"
        @click="filtrate()"
        color="primary"
        class="q-ml-sm"
        :dense="q.screen.lt.md"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { statuses } from 'src/constants/statuses';
import { useQuasar } from 'quasar';

export default defineComponent({
  emits: ['filtrate'],
  setup(_, { emit }) {
    const q = useQuasar();
    const search = ref();
    const status = ref();

    const router = useRouter();

    function goToRecord() {
      router.push({ name: 'task' });
    }

    function filtrate() {
      emit('filtrate', {
        search: search.value,
        status: status.value,
      });
    }

    onMounted(() => {
      if (localStorage.getItem('tasks:filter')) {
        const filter = JSON.parse(
          localStorage.getItem('tasks:filter') as string
        );
        search.value = filter.search;
        status.value = filter.status;
      }
    });

    return { q, search, status, statuses, goToRecord, filtrate };
  },
});
</script>
