<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { useViewWrapper } from '/@src/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('VCardMedia')

useHead({
  title: 'VCardMedia - Components - Vuero',
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
          label: 'Cards',
        },
        {
          label: 'VCardMedia',
          to: { name: '/components/card/media' },
        },
      ]"
    />

    <div class="columns is-multiline">
      <div class="column is-12">
        <!--VCardMedia-->
        <VCardMediaDocumentation />
      </div>

      <div class="column is-4">
        <VCardMedia
          image="https://jubi.co.id/wp-content/uploads/2020/06/Buah-jeruk-Tempo.co_.jpgphotos/apps/1.jpg"
          avatar="https://jubi.co.id/wp-content/uploads/2020/06/Buah-jeruk-Tempo.co_.jpg19.jpg"
          badge="/images/icons/flags/germany.svg"
          title="Greta K."
          subtitle="Sales Manager"
        >
          <p class="pb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ego vero isti,
            inquam, permitto. Id Sextilius factum negabat. Apparet statim, quae sint
            officia, quae actiones. Sed hoc sane concedamus...
          </p>

          <a class="action-link" tabindex="0">Read More</a>
        </VCardMedia>
      </div>

      <div class="column is-4">
        <VCardMedia
          image="https://jubi.co.id/wp-content/uploads/2020/06/Buah-jeruk-Tempo.co_.jpgphotos/apps/2.png"
          avatar="https://jubi.co.id/wp-content/uploads/2020/06/Buah-jeruk-Tempo.co_.jpg23.jpg"
          badge="/images/icons/flags/united-states-of-america.svg"
          title="Irina V."
          subtitle="Project Manager"
        >
          <p class="pb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ego vero isti,
            inquam, permitto. Id Sextilius factum negabat. Apparet statim, quae sint
            officia, quae actiones. Sed hoc sane concedamus...
          </p>

          <a class="action-link" tabindex="0">Read More</a>
        </VCardMedia>
      </div>

      <div class="column is-4">
        <VCardMedia
          image="https://jubi.co.id/wp-content/uploads/2020/06/Buah-jeruk-Tempo.co_.jpgphotos/apps/3.png"
          avatar="https://jubi.co.id/wp-content/uploads/2020/06/Buah-jeruk-Tempo.co_.jpg12.jpg"
          badge="/images/icons/flags/united-states-of-america.svg"
          title="Joshua S."
          subtitle="Backend Developer"
        >
          <p class="pb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ego vero isti,
            inquam, permitto. Id Sextilius factum negabat. Apparet statim, quae sint
            officia, quae actiones. Sed hoc sane concedamus...
          </p>

          <a class="action-link" tabindex="0">Read More</a>
        </VCardMedia>
      </div>

      <div class="column is-12 mt-5">
        <!--Props-->
        <VCardMediaPropsDocumentation />

        <!--Slots-->
        <VCardMediaSlotsDocumentation />
      </div>
    </div>
  </div>
</template>
