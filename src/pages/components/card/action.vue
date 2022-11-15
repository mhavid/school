<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { useMarkdownToc } from '/@src/composable/useMarkdownToc'
import { useViewWrapper } from '/@src/stores/viewWrapper'

const markdownContainer = ref<HTMLElement>()
const toc = useMarkdownToc(markdownContainer)

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('VCardAction')

useHead({
  title: 'VCardAction - Components - Vuero',
})
</script>

<template>
  <div class="page-content-inner">
    <VBreadcrumb
      with-icons
      separator="bullet"
      :items="[
        {
          label: 'Vuero',
          hideLabel: true,
          icon: 'feather:home',
          to: { name: '/' },
        },
        {
          label: 'Components',
          to: { name: '/components/' },
        },
        {
          label: 'VCardAction',
          to: { name: '/components/card/action' },
        },
      ]"
    />

    <div class="columns is-multiline">
      <div
        ref="markdownContainer"
        :class="[toc.length > 0 ? 'is-9' : 'is-12']"
        class="column doc-column"
      >
        <VCardActionDocumentation />

        <div class="columns is-multiline mb-6">
          <div class="column is-4">
            <VCardAction
              avatar="https://jubi.co.id/wp-content/uploads/2020/06/Buah-jeruk-Tempo.co_.jpg19.jpg"
              badge="/images/icons/flags/germany.svg"
              title="Greta K."
              subtitle="Sales Manager"
            >
              <template #action>
                <VTag color="green" label="trending" rounded />
              </template>
            </VCardAction>
          </div>
          <div class="column is-4">
            <VCardAction
              avatar="https://upload.wikimedia.org/wikipedia/commons/9/90/Hapus_Mango.jpg"
              badge="/images/icons/flags/united-states-of-america.svg"
              title="George W."
              subtitle="Software Engineer"
            >
              <template #action>
                <VIconButton icon="feather:heart" circle />
              </template>
            </VCardAction>
          </div>
          <div class="column is-4">
            <VCardAction
              avatar="https://upload.wikimedia.org/wikipedia/commons/3/3a/Capsicum_annuum_fruits_IMGP0044.jpg"
              badge="/images/icons/flags/france.svg"
              title="Sandrine C."
              subtitle="HR Manager"
              radius="rounded"
            >
              <template #action>
                <WidgetDropdown />
              </template>
            </VCardAction>
          </div>
        </div>

        <VCardActionContentDocumentation />

        <div class="columns is-multiline mb-6">
          <div class="column is-4">
            <VCardAction
              avatar="https://jubi.co.id/wp-content/uploads/2020/06/Buah-jeruk-Tempo.co_.jpg19.jpg"
              badge="/images/icons/flags/germany.svg"
              title="Greta K."
              subtitle="Sales Manager"
            >
              <template #action>
                <VTag color="green" label="trending" rounded />
              </template>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quibusnam
                praeteritis? At multis se probavit. Quoniam, si dis placet, ab Epicuro
                loqui discimus. Et ille ridens.
              </p>
            </VCardAction>
          </div>
          <div class="column is-4">
            <VCardAction
              avatar="https://upload.wikimedia.org/wikipedia/commons/9/90/Hapus_Mango.jpg"
              badge="/images/icons/flags/united-states-of-america.svg"
              title="George W."
              subtitle="Software Engineer"
            >
              <template #action>
                <VAction>View</VAction>
              </template>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quibusnam
                praeteritis? At multis se probavit. Quoniam, si dis placet, ab Epicuro
                loqui discimus. Et ille ridens.
              </p>
            </VCardAction>
          </div>
          <div class="column is-4">
            <VCardAction
              avatar="https://upload.wikimedia.org/wikipedia/commons/3/3a/Capsicum_annuum_fruits_IMGP0044.jpg"
              badge="/images/icons/flags/france.svg"
              title="Sandrine C."
              subtitle="HR Manager"
              radius="rounded"
            >
              <template #action>
                <WidgetDropdown />
              </template>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quibusnam
                praeteritis? At multis se probavit. Quoniam, si dis placet, ab Epicuro
                loqui discimus. Et ille ridens.
              </p>
            </VCardAction>
          </div>
        </div>
        <!--Props-->
        <VCardActionPropsDocumentation />
        <!--Slots-->
        <VCardActionSlotsDocumentation />
      </div>
      <div v-if="toc.length" class="column is-3 toc-column">
        <DocumentationToc :toc="toc" />
      </div>
    </div>
  </div>
</template>
