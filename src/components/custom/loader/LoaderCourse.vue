<template>
    <div class="tile-grid tile-grid-v1">
      <!--Tile Grid v1-->
      <div class="columns is-multiline">
        <!--Grid item-->
        <div v-for="key in 30" :key="key" class="column is-4">
          <div class="tile-grid-item">
            <div class="tile-grid-item-inner placeload-wrap is-flex">
              <VPlaceloadAvatar size="medium" />
              <VPlaceloadText width="80%" last-line-width="60%" class="mx-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
</template>