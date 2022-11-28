<template>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <q-input
        label="Pesquisa"
        v-model="search"
        @keyup.enter="filtrate()"
        clearable
        placeholder="Pesquise por descrição"
        outlined
      />
    </div>
    <div class="col-12 text-right">
      <q-btn
        icon="add"
        label="Adicionar"
        @click="goToRecord()"
        color="primary"
      />
      <q-btn
        icon="search"
        label="Filtrar"
        @click="filtrate()"
        color="primary"
        class="q-ml-sm"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  emits: ['filtrate'],
  setup(_, { emit }) {
    const search = ref();

    const router = useRouter();

    function goToRecord() {
      router.push({ name: 'task' });
    }

    function filtrate() {
      emit('filtrate', search.value);
    }

    return { search, goToRecord, filtrate };
  },
});
</script>
