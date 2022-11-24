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
import { Tag } from 'src/interfaces/tags';
import { useValidation } from 'src/services/validation';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  emits: ['submit'],
  setup(_, { emit }) {
    const route = useRoute();
    const router = useRouter();
    const record = ref<Tag>({ name: null, color: null });

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

    onMounted(() => {
      if (!isNewRecord.value) {
        console.log('Carregar informação do registro:', route.params.id);
      }
    });

    return { record, isNewRecord, required, submit, goToList };
  },
});
</script>
