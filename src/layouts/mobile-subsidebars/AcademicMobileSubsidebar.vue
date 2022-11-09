<template>
  <div class="mobile-subsidebar">
    <div class="inner">
      <div class="sidebar-title">
        <h3>Dashboards</h3>
      </div>

      <ul class="submenu" data-simplebar>
        <VCollapseLinks>
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

        <li>
          <RouterLink to="/school/class">Class</RouterLink>
        </li>

        <li class="divider"></li>
      </ul>
    </div>
  </div>
</template>
