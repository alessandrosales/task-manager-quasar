<template>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <q-input
        label="Pesquisa"
        v-model="search"
        @keyup.enter="filtrate()"
        clearable
        placeholder="Pesquise por nome"
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
import { useQuasar } from 'quasar';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  emits: ['filtrate'],
  setup(_, { emit }) {
    const q = useQuasar();
    const search = ref();

    const router = useRouter();

    function goToRecord() {
      router.push({ name: 'tag' });
    }

    function filtrate() {
      emit('filtrate', search.value);
    }

    return { q, search, goToRecord, filtrate };
  },
});
</script>
