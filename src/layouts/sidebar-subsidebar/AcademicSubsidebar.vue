<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const openSubsidebarLinks = ref('')
const emit = defineEmits(['close'])
</script>

<template>
  <div class="sidebar-panel is-generic">
    <div class="subpanel-header">
      <!-- <ProjectsQuickDropdown   /> -->

      <h3 class="no-mb">{{ t('menu.academic') }}</h3>
      <div
        class="panel-close"
        tabindex="0"
        @keydown.space.prevent="emit('close')"
        @click="emit('close')"
      >
        <i aria-hidden="true" class="iconify" data-icon="feather:x"></i>
      </div>
    </div>
    <div class="inner" data-simplebar>
      <ul>
        <VCollapseLinks v-model:open="openSubsidebarLinks" collapse-id="personal">
          <template #header>
            Personal
            <i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
          </template>

          <RouterLink to="/sidebar/dashboards" class="is-submenu">
            <i aria-hidden="true" class="lnil lnil-analytics-alt-1"></i>
            <span>Personal V1</span>
          </RouterLink>
          <RouterLink to="/sidebar/dashboards/personal-2" class="is-submenu">
            <i aria-hidden="true" class="lnil lnil-pie-chart"></i>
            <span>Personal V2</span>
          </RouterLink>
          <RouterLink to="/sidebar/dashboards/personal-3" class="is-submenu">
            <i aria-hidden="true" class="lnil lnil-stats-up"></i>
            <span>Personal V3</span>
          </RouterLink>
        </VCollapseLinks>

        <li class="divider"></li>

        <li><RouterLink to="/school/teachers">{{ t('menu.teachers') }}</RouterLink></li>
        <li><RouterLink to="/school/class">{{ t('menu.classes') }}</RouterLink></li>
        <li><RouterLink to="/school/courses">{{ t('menu.courses') }}</RouterLink></li>

      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import '/@src/scss/layout/sidebar-panel';
</style>
