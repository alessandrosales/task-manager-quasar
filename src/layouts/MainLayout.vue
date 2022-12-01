<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Task Manager </q-toolbar-title>

        <div>
          <q-btn
            :icon="q.dark.isActive ? 'brightness_7' : 'brightness_4'"
            @click="toggleDark"
            round
            flat
          />
          <q-btn icon="logout" @click="logout" class="q-ml-sm" round flat />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list separator dense>
        <q-item-label header> Menu Principal </q-item-label>
        <q-item :to="{ name: 'dashboard' }" clickable v-ripple>
          <q-item-section avatar>
            <q-avatar icon="insights" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item :to="{ name: 'tasks' }" clickable v-ripple>
          <q-item-section avatar>
            <q-avatar icon="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Tasks</q-item-label>
          </q-item-section>
        </q-item>
        <q-item :to="{ name: 'tags' }" clickable v-ripple>
          <q-item-section avatar>
            <q-avatar icon="label_important" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Tags</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { useException } from 'src/services/exception';
import { useTagsStore } from 'src/stores/tags';
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const q = useQuasar();
    const leftDrawerOpen = ref(false);

    const router = useRouter();

    const { handleException } = useException();

    const tagsStore = useTagsStore();

    function goToPage(name: string) {
      router.push({ name });
    }

    function toggleDark() {
      q.dark.toggle();
      localStorage.setItem('dark', `${q.dark.isActive}`);
    }

    function logout() {
      localStorage.removeItem('token');
      router.push({ name: 'login' });
      q.notify({
        message: 'Sua sessão foi encerrada',
        color: 'positive',
        position: 'top-right',
      });
    }

    onMounted(async () => {
      if (localStorage.getItem('dark')) {
        const isActive = localStorage.getItem('dark') === 'true';
        q.dark.set(isActive);
      }

      if (!localStorage.getItem('token')) {
        q.notify({
          message: 'Não autorizado',
          color: 'negative',
          position: 'top-right',
        });

        router.push({ name: 'login' });
      }

      try {
        await tagsStore.load();
      } catch (error) {
        handleException(error);
      }
    });

    return {
      q,
      toggleDark,
      logout,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      goToPage,
    };
  },
});
</script>
