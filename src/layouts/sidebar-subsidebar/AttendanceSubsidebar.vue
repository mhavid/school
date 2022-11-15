<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const openSubsidebarLinks = ref('')
const emit = defineEmits(['close'])
</script>

<template>
  <div class="sidebar-panel is-generic">
    <div class="subpanel-header">
      <h3 class="no-mb">{{ t('menu.attendance.attendance') }}</h3>
    </div>
    <div class="inner" data-simplebar>
      <ul>
        <li><RouterLink to="/attendance/attendance">{{ t('menu.attendance.attendance') }}</RouterLink></li>
        <li><RouterLink to="/attendance/data">{{ t('menu.attendance.data') }}</RouterLink></li>
        <li><RouterLink to="/attendance/permit">{{ t('menu.attendance.permit') }}</RouterLink></li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import '/@src/scss/layout/sidebar-panel';
</style>
