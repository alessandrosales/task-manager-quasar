<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 col-md-3">
        <q-card>
          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <q-input label="Login" v-model="data.login" outlined />
              </div>
              <div class="col-12">
                <q-input label="Senha" v-model="data.password" outlined />
              </div>
              <div class="col-12 text-center">
                <q-btn
                  label="Acessar o Sistema"
                  color="primary"
                  @click="submit"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  setup() {
    const data = ref({
      login: null,
      password: null,
    });

    const router = useRouter();

    function submit() {
      localStorage.setItem('token', 'çaklsdçasdf açdfj açdjfaçsjdf asd');

      router.push({ name: 'tasks' });
    }

    return { data, submit };
  },
});
</script>
