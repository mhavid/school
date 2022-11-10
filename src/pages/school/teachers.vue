<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale, t } = useI18n()

import { useViewWrapper } from '/@src/stores/viewWrapper'
import { useTeachers } from '/@src/stores/teachers'
const teachers = useTeachers()

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle(t('menu.teachers'))

useHead({
  title: t('menu.teachers'),
})

onMounted(()=>{
  Promise.all(
    [ teachers.fetchTeacher()]
  )
})

const search = ref('')

const filteredTeachers = computed(() => {
  if (!search.value) {
    if(teachers.data == undefined) return []
    return teachers.data
  } else {
    const filterRe = new RegExp(search.value, 'i')
    return teachers.data.filter((item:any) => {
      return (
        item.name.match(filterRe) //||
      )
    })
  }
})

const fnTagColor=(index:number = 0)=>{
  const color = ['purple', 'info', 'green', 'warning', 'danger', 'orange', 'blue', 'success', 'primary', 'white', 'light']
  return color[index]
}

</script>

<template>
  <div class="teachers-dashboard">
    <div class="teachers-dashboard-wrapper">

      <!--Dashboard content -->
      <div class="main-container">
        <!--Results-->
        <div class="searched-teachers">
          <!--Results toolbar-->

          <div class="searched-bar">
            <div class="searched-count">{{t('pagination.show')}} <strong>{{ filteredTeachers.length ?? 0 }}</strong> {{t('menu.teachers')}}</div>
            <div class="searched-link">
              <VField>
                <VControl icon="feather:search">
                  <VInput v-model="search" type="text" :placeholder="t('teacher.search')" />
                </VControl>
              </VField>
            </div>
          </div>

          <!--Results content-->
          <div class="job-cards-modified" v-if="teachers.loading">
            <LoaderClass v-for="a in 30" :key="a" />
          </div>
          <div v-if="!filteredTeachers.length">
            <VPlaceholderPage :title="t('notfound.data')" :subtitle="t('notfound.otherkeyword')">
              <template #image>
                <img class="light-image empty-image" src="/@src/assets/illustrations/placeholders/search-7.svg"/>
                <img class="dark-image empty-image" src="/@src/assets/illustrations/placeholders/search-7-dark.svg"/>
              </template>
            </VPlaceholderPage>
          </div>
          <div v-else class="job-cards-modified">
            <!--Card-->
            <div v-for="(teacher, index) in filteredTeachers" :key="index" class="job-card">
              <div class="has-text-centered">
                <VAvatar class="" :picture="teacher.foto" size="big" />
              </div>
              <div class="job-card-title mt-2 has-text-centered">{{ teacher.name }}</div>
              <div class="job-card-subtitle has-text-centered">
                <VTag class="mx-1" v-for="wali in teacher.class" :key="wali" color="solid" :label="wali.name"/>
              </div>
              <div class="job-card-buttons-modified">
                <VButtons>
                  <VButton color="primary" raised>{{t('button.detail')}}</VButton>
                  <VButton color="info" raised><i class="fa fa-pencil-alt"></i></VButton>
                  <VButton color="danger" raised><i class="fa fa-trash"></i></VButton>
                </VButtons>
              </div>
              <div class="is-divider"></div>
              <div class="job-card-title">{{t('menu.courses')}}</div>
              <div class="job-detail-buttons has-text-centered mt-2">
                <!-- <VTags> -->
                  <VTag
                    class="ml-1 mb-1"
                    v-for="(course, index) in teacher.courses"
                    :key="index"
                    :color="fnTagColor(index)"
                    :label="course.name"
                    curved
                  />
                <!-- </VTags> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '/@src/scss/abstracts/all';

:root {
  --header-bg-color: #fff;
  --search-border-color: #efefef;
  --subtitle-color: #83838e;
  --button-color: var(--white);
  --input-color: var(--subtitle-color);
}

.is-dark {
  --header-bg-color: var(--dark-sidebar-light-2);
  --search-border-color: var(--dark-sidebar-light-8);
  --input-color: var(--white);
}

.teachers-dashboard {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  overflow: hidden;

  .teachers-dashboard-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    scroll-behavior: smooth;
    overflow: auto;
  }

  .search-menu {
    height: 56px;
    white-space: nowrap;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    background-color: var(--header-bg-color);
    border-radius: 8px;
    width: 100%;
    padding-left: 0.75rem;

    > div:not(:last-of-type) {
      border-right: 1px solid var(--search-border-color);
    }

    .search-bar {
      height: 55px;
      width: 100%;
      position: relative;
      display: flex;
      align-items: center;
      padding-right: 1.5rem;

      .field {
        width: 100%;
      }

      .multiselect-tags {
        padding-left: 2.5rem;
      }
    }

    .search-location,
    .search-job,
    .search-salary {
      display: flex;
      align-items: center;
      width: 50%;
      font-size: 14px;
      font-weight: 500;
      padding: 0 25px;
      height: 100%;
      font-family: var(--font);

      input {
        width: 100%;
        height: 100%;
        display: block;
        font-family: var(--font);
        color: var(--input-color);
        background-color: transparent;
        border: none;
      }

      svg {
        margin-right: 0.5rem;
        width: 18px;
        color: var(--primary);
        flex-shrink: 0;
      }
    }

    .search-button {
      background-color: var(--primary);
      min-width: 120px;
      height: 55px;
      border: none;
      font-weight: 500;
      font-family: var(--font);
      padding: 0 1rem;
      border-radius: 0 0.75rem 0.75rem 0;
      color: var(--button-color);
      cursor: pointer;
      margin-left: auto;
    }
  }

  .main-container {
    display: flex;
    flex-grow: 1;
    padding-top: 2rem;

    .search-type {
      width: 270px;
      display: flex;
      flex-direction: column;
      height: 100%;
      flex-shrink: 0;
    }

    .alert {
      background-color: var(--widget-grey);
      padding: 1.75rem;
      border-radius: 8px;

      .alert-title {
        font-size: 1rem;
        font-family: var(--font-alt);
        font-weight: 600;
        color: var(--dark-text);
        margin-bottom: 0.75rem;
      }

      .alert-subtitle {
        font-size: 13px;
        font-family: var(--font);
        color: var(--subtitle-color);
        margin-bottom: 1.5rem;
      }

      input {
        border-radius: 6px;
      }
    }

    .job-time {
      padding-top: 1.75rem;

      .job-wrapper {
        padding-top: 1.75rem;
      }

      .job-time-title {
        font-size: 0.95rem;
        font-family: var(--font-alt);
        font-weight: 600;
        color: var(--dark-text);
      }

      .type-container {
        display: flex;
        align-items: center;
        color: var(--subtitle-color);
        font-size: 13px;

        label {
          margin-left: 2px;
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        + .type-container {
          margin-top: 10px;
        }

        .job-number {
          margin-left: auto;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 25px;
          min-width: 25px;
          background-color: var(--white);
          color: var(--subtitle-color);
          font-size: 0.8rem;
          font-family: var(--font);
          font-weight: 500;
          padding: 0 0.25rem;
          border-radius: 50rem;
        }
      }
    }

    .searched-teachers {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      // padding-left: 2.5rem;
    }

    .searched-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .searched-count {
        font-family: var(--font-alt);
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--dark-text);
      }
    }

    .job-cards-modified {
      padding-top: 20px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-column-gap: 1.5rem;
      grid-row-gap: 1.5rem;

      @media screen and (max-width: 1212px) {
        grid-template-columns: repeat(3, 1fr);
      }
      @media screen and (max-width: 930px) {
        grid-template-columns: repeat(1, 1fr);
      }
    }

    .job-card {
      @include vuero-l-card;

      cursor: pointer;
      transition: 0.2s;

      &:hover,
      &:focus {
        transform: translateY(-5px);
      }

      .job-card-title {
        font-family: var(--font-alt);
        font-weight: 600;
        color: var(--dark-text);
        margin-bottom: 0.75rem;
      }

      .job-card-subtitle {
        color: var(--subtitle-color);
        font-family: var(--font);
        font-size: 0.95rem;
        line-height: 1.6em;
        margin-bottom: 1rem;
      }

      .job-card-buttons-modified {
        margin-top: 1rem;

        .buttons {
          justify-content: space-between;

          .v-button {
            width: 31%;
          }
        }
      }
    }
  }
}

.is-dark {
  .teachers-dashboard {
    .job-card {
      @include vuero-card--dark;
    }

    .main-container {
      .alert {
        @include vuero-card--dark;
      }

      .job-time {
        .job-number {
          background: var(--dark-sidebar-light-2);
        }
      }
    }
  }
}

@media screen and (max-width: 620px) {
  .job-cards-modified {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media screen and (max-width: 730px) {
  .job-cards-modified {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 767px) {
  .teachers-dashboard {
    .search-menu {
      flex-direction: column;
      height: auto;
      padding: 1rem;

      > div:not(:last-of-type) {
        border-right: none;
      }

      .search-bar {
        padding: 0;
      }

      .search-location,
      .search-job,
      .search-salary {
        width: 100%;
        height: 44px;
        padding: 0;
      }

      .search-button {
        width: 100%;
        border-radius: 0.75rem;
      }
    }

    .main-container {
      .search-type {
        display: none;
      }

      .searched-teachers {
        padding-left: 0;
      }
    }
  }
}
.empty-image {
  width: 500px;
}
</style>