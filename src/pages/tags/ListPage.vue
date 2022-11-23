<template>
  <q-page padding>
    <default-container title="Lista de Tags">
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <q-input
            label="Pesquisa"
            v-model="search"
            placeholder="Pesquise por nome"
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
        </div>
        <div class="col-12">
          <q-markup-table flat bordered>
            <thead>
              <tr>
                <th class="text-center" width="1%">Opções</th>
                <th class="text-center">Nome</th>
                <th class="text-center">Cor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-center">
                  <q-btn
                    icon="edit"
                    @click="goToRecord(1)"
                    color="primary"
                    class="q-mr-sm"
                    size="10px"
                    round
                    outline
                  />
                  <q-btn
                    icon="delete"
                    @click="remove(1)"
                    color="red"
                    size="10px"
                    round
                    outline
                  />
                </td>
                <td class="text-center">Nome da tag</td>
                <td class="text-center">
                  <q-chip icon="tag" label="red" color="red" />
                </td>
              </tr>
              <tr>
                <td class="text-center">
                  <q-btn
                    icon="edit"
                    @click="goToRecord(2)"
                    color="primary"
                    class="q-mr-sm"
                    size="10px"
                    round
                    outline
                  />
                  <q-btn
                    icon="delete"
                    @click="remove(2)"
                    color="red"
                    size="10px"
                    round
                    outline
                  />
                </td>
                <td class="text-center">Nome da tag</td>
                <td class="text-center">
                  <q-chip icon="tag" label="blue" color="blue" />
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </default-container>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';

import { useRouter } from 'vue-router';

import DefaultContainer from 'src/components/shared/DefaultContainer.vue';

export default defineComponent({
  components: { DefaultContainer },
  setup() {
    const q = useQuasar();
    const search = ref();

    const router = useRouter();

    function goToRecord(id?: number) {
      if (id) {
        router.push({ name: 'tag', params: { id } });
        return;
      }
      router.push({ name: 'tag' });
    }

    function remove(id: number) {
      q.dialog({
        title: 'Excluir Registro',
        message: 'Tem certeza que você quer prosseguir?',
        cancel: true,
        persistent: true,
      }).onOk(() => {
        console.log('Ok, vamos excluir este registro:', id);
      });
    }

    return { search, goToRecord, remove };
  },
});
</script>
