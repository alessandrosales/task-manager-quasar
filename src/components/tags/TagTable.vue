<template>
  <q-markup-table :dense="q.screen.lt.md" flat bordered>
    <thead>
      <tr>
        <th class="text-center" width="1%">Opções</th>
        <th class="text-center">Nome</th>
        <th class="text-center">Cor</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(record, key) in records" :key="key">
        <td class="text-center">
          <q-btn
            icon="edit"
            @click="goToRecord(record.id)"
            color="primary"
            class="q-mr-sm"
            size="10px"
            round
            outline
            :dense="q.screen.lt.md"
          />
          <q-btn
            icon="delete"
            @click="remove(record.id)"
            color="red"
            size="10px"
            round
            outline
            :dense="q.screen.lt.md"
          />
        </td>
        <td class="text-center">{{ record.name }}</td>
        <td class="text-center">
          <q-chip
            :label="record.color"
            class="text-white shadow-4"
            :style="`background-color: ${record.color};`"
          />
        </td>
      </tr>
      <tr v-if="records.length == 0">
        <td colspan="3">
          <q-banner :dense="q.screen.lt.md" class="bg-grey-3" rounded>
            <template v-slot:avatar>
              <q-icon name="info" color="primary" />
            </template>
            Nenhum registro para exibir no momento.
          </q-banner>
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { useException } from 'src/services/exception';
import { useTagsStore } from 'src/stores/tags';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  props: ['records'],
  setup() {
    const q = useQuasar();
    const router = useRouter();
    const { handleException } = useException();

    const tagsStore = useTagsStore();

    function goToRecord(id?: number) {
      router.push({ name: 'tag', params: { id } });
    }

    function remove(id: number) {
      q.dialog({
        title: 'Excluir Registro',
        message: 'Tem certeza que você quer prosseguir?',
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        try {
          await tagsStore.delete(id);
          await tagsStore.load();
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

    return { q, goToRecord, remove };
  },
});
</script>
