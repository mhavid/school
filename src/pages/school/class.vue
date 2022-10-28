<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { useViewWrapper } from '/@src/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Classes')

useHead({
  title: 'Class',
})

import { jobs } from '/@src/data/dashboards/jobs'
import { userList } from '/@src/data/widgets/list/userList'

export type Job = 'web-developer' | 'uiux-designer' | 'backend-developer'

const tagsValue = ref<Job[]>([])
const tagsOptions = [
  { value: 'web-developer', label: 'Frontend' },
  { value: 'uiux-designer', label: 'UI/UX' },
  { value: 'backend-developer', label: 'Backend' },
]

const dayOptions = [
    { value : 'MONDAY', label : 'Senin' },
    { value : 'TUESDAY', label : 'Selasa' },
    { value : 'WEDNESDAY', label : 'Rabu' },
    { value : 'THURSDAY', label : 'Kamis' },
    { value : 'FRIDAY', label : 'Jumat' },
    { value : 'SATURDAY', label : 'Sabtu' },
    { value : 'SUNDAY', label : 'Minggu' },
]

const jobType = ref(['job-type-2'])
const jobSeniority = ref(['job-seniority-3', 'job-seniority-4'])
const jobSalary = ref(['job-salary-5', 'job-salary-6'])
</script>

<template>
  <div class="jobs-dashboard">
    <div class="jobs-dashboard-wrapper">
      <!--Search toolbar -->
      <div class="search-menu">
        <div class="search-bar">
          <VField class="is-autocomplete-select is-curved-select">
            <VControl icon="feather:search">
              <Multiselect
                v-model="tagsValue"
                :searchable="true"
                :create-tag="false"
                :options="tagsOptions"
                placeholder=""
              />
            </VControl>
          </VField>
        </div>
        <div class="search-bar pl-5">
          <VField class="is-autocomplete-select is-curved-select">
            <VControl icon="feather:search">
              <Multiselect
                v-model="tagsValue"
                :searchable="true"
                :create-tag="false"
                :options="dayOptions"
                placeholder=""
              />
            </VControl>
          </VField>
        </div>
        <button class="search-button">Search</button>
      </div>

      <!--Dashboard content -->
      <div class="main-container">
        <!--Left Alert -->
        <div class="search-type">
          <!--Left filters block -->
          <div class="job-time pt-0">
            <div class="job-time-title mb-3">Wali Kelas</div>
            <div class="job-card">
                <div class="has-text-centered">
                    <img class="job-card-logo" src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" alt="" />
                </div>
                <div class="job-card-title mt-2 has-text-centered">Wali Kelas</div>
                <div class="job-card-subtitle has-text-centered">Mohammed John Doel Jr</div>
                <div class="job-card-buttons">
                    <VButtons>
                    <VButton color="info" raised>Detail</VButton>
                    <VButton color="info" raised>Messages</VButton>
                    </VButtons>
                </div>
              </div>
          </div>
          <div class="job-time">
            <div class="job-time-title">Mata Pelajaran</div>
            <div class="job-wrapper">
              <listWidgetUserList :users="userList" />
            </div>
          </div>

          <div class="alert mt-4">
            asas
          </div>
        </div>

        <!--Results-->
        <div class="searched-jobs">
          <!--Results toolbar-->

          <div class="searched-bar">
            <div class="searched-count">Showing 35 Students</div>
            <div class="searched-link">
                <VField>
                    <VControl icon="feather:search">
                        <VInput type="text" placeholder="Search Student" />
                    </VControl>
                </VField>
            </div>
          </div>

          <!--Results content-->
          <div class="job-cards">
            <!--Card-->
            <div v-for="(student, index) in 35" :key="index" class="job-card">
              <!-- <div class="job-card-header has-text-centered"> -->
              <div class="has-text-centered">
                <img class="job-card-logo" src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" alt="" />
              </div>
              <div class="job-card-title mt-2 has-text-centered">Bahasa Indonesia</div>
              <div class="job-card-subtitle has-text-centered">Mohammed John Doel Jr</div>
              <div class="job-detail-buttons">
                <!-- <VTags>
                  <VTag
                    v-for="(category, catIndex) in job.categories"
                    :key="catIndex"
                    color="solid"
                    :label="category.name"
                    curved
                  />
                </VTags> -->
              </div>
              <div class="job-card-buttons">
                <VButtons>
                  <VButton color="primary" raised>Detail</VButton>
                  <VButton color="primary" raised>Messages</VButton>
                </VButtons>
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

.jobs-dashboard {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  overflow: hidden;

  .jobs-dashboard-wrapper {
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

    .searched-jobs {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      padding-left: 2.5rem;
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

    .job-cards {
      padding-top: 20px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: 1.5rem;
      grid-row-gap: 1.5rem;

      @media screen and (max-width: 1212px) {
        grid-template-columns: repeat(2, 1fr);
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

      .job-card-header {
        display: flex;
        align-items: flex-start;
      }

      .job-card-logo {
        width: 80px;
        height: 80px;
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

      .job-card-buttons {
        margin-top: 1rem;

        .buttons {
          justify-content: space-between;

          .v-button {
            width: 48%;
          }
        }
      }
    }
  }
}

.is-dark {
  .jobs-dashboard {
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
  .job-cards {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media screen and (max-width: 730px) {
  .job-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 767px) {
  .jobs-dashboard {
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

      .searched-jobs {
        padding-left: 0;
      }
    }
  }
}
</style>