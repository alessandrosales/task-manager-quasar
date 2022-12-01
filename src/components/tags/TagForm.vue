<template>
  <q-form @submit="submit">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-input
          label="Nome"
          v-model="record.name"
          :rules="[required]"
          lazy-rules
          placeholder="Informe o nome da tag"
          outlined
        />
      </div>
      <div class="col-12 col-md-6">
        <q-input outlined v-model="record.color" :rules="[required]" lazy-rules>
          <template v-slot:append>
            <q-icon name="colorize" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-color v-model="record.color" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-12 text-right">
        <q-btn label="Voltar" type="button" @click="goToList" flat />
        <q-btn label="Salvar" type="submit" color="primary" class="q-ml-sm" />
      </div>
    </div>
  </q-form>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { Tag } from 'src/interfaces/tags';
import { useException } from 'src/services/exception';
import { useValidation } from 'src/services/validation';
import { useTagsStore } from 'src/stores/tags';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  emits: ['submit'],
  setup(_, { emit }) {
    const q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const record = ref<Tag>({ name: null, color: null });
    const { handleException } = useException();

    const tagsStore = useTagsStore();

    const { required } = useValidation();

    const isNewRecord = computed(() => {
      return route.params.id === undefined;
    });

    function goToList() {
      router.push({ name: 'tags' });
    }

    function submit() {
      emit('submit', record.value);
    }

    onMounted(async () => {
      q.loading.show();
      if (!isNewRecord.value) {
        try {
          record.value = await tagsStore.find(+route.params.id);
        } catch (error) {
          handleException(error);
        }
      }
      q.loading.hide();
    });

    return { record, isNewRecord, required, submit, goToList };
  },
});
</script>
