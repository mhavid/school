<template>
  <div class="projects-toolbar">
    <VField raw>
      <VControl icon="feather:search">
        <VInput placeholder="Search again..." />
      </VControl>
    </VField>

    <VAvatarStack>
      <VAvatar size="small" picture="https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg" />
      <VAvatar size="small" picture="https://jubi.co.id/wp-content/uploads/2020/06/Buah-jeruk-Tempo.co_.jpg9.jpg" />
      <VAvatar size="small" picture="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Napa_cabbages.png/640px-Napa_cabbages.png" />
      <VAvatar size="small" picture="/images/avatars/svg/vuero-1.svg" />
      <VAvatar size="small" picture="https://cdn.britannica.com/45/126445-050-4C0FA9F6/Kiwi-fruit.jpg" />
      <VAvatar size="small" picture="https://upload.wikimedia.org/wikipedia/commons/3/3a/Capsicum_annuum_fruits_IMGP0044.jpg" />
    </VAvatarStack>

    <a class="button v-button is-primary is-raised is-bold">
      <span>New Project</span>
    </a>
  </div>
</template>

<style lang="scss">
/* ==========================================================================
1. Projects Toolbar
========================================================================== */
.projects-toolbar {
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  .avatar-stack {
    margin-left: 16px;
  }

  .button {
    margin-left: auto;
    min-width: 140px;
  }
}

.is-dark {
  .projects-toolbar {
    .avatar-stack {
      .avatar {
        border-color: var(--dark-sidebar-light-3);
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .projects-toolbar {
    .avatar-stack {
      display: none;
    }

    .v-button {
      min-width: 110px;
    }
  }
}
</style>
