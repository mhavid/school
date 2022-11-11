<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { ref, onMounted } from 'vue'
import { useNotyf } from '/@src/composable/useNotyf'
const notif:any = useNotyf()
import { useI18n } from 'vue-i18n'
const { locale, t } = useI18n()

import { useViewWrapper } from '/@src/stores/viewWrapper'
import { useClasses } from '/@src/stores/classes'
const classes = useClasses()

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle(t('menu.classes'))

useHead({
  title: t('menu.classes'),
})

import { userList } from '/@src/data/widgets/list/userList'

const selectedClass = ref(null)
const selectedDay = ref()
const selectedWali = ref('')
const search = ref('')
const openModalAdd = ref(false)
const openModalWali = ref(false)
const dayOptions = [
    { value : 'MONDAY', label : t('days.monday') },
    { value : 'TUESDAY', label : t('days.tuesday') },
    { value : 'WEDNESDAY', label : t('days.wednesday') },
    { value : 'THURSDAY', label : t('days.thursday') },
    { value : 'FRIDAY', label : t('days.friday') },
    { value : 'SATURDAY', label : t('days.saturday') },
    { value : 'SUNDAY', label : t('days.sunday') },
]

onMounted(()=>{
  Promise.all(
    [
      classes.fetchDataClass({}),
      classes.fetchClass(),
      classes.fetchWali()
    ]
  )
})

const filterClass = ()=>{
  classes.fetchDataClass({
    id_class : selectedClass.value,
    date  : selectedDay.value
  })
}

const filteredStudent = computed(() => {
  if (!search.value) {
    if(classes.students == undefined) return []
    return classes.students
  } else {
    const filterRe = new RegExp(search.value, 'i')
    return classes.students.filter((item:any) => {
      return (
        item.name.match(filterRe) //||
      )
    })
  }
})

const fnAddclass=(data:any)=>{
  classes.addClass(data).then((res)=>{
    if(res?.meta.status == 0) notif.error(t('notif.failedadd') +', '+ res.meta.message)
    else{
      if(res?.meta.status == 1) notif.success(t('notif.successadd'))
      openModalAdd.value = false
    }
  })
}

const fnShowModalWali=()=>{
  selectedWali.value = ''
  openModalWali.value = true
}

const fnChangeWali=()=>{
  classes.teachers.forEach((wali:{
    id_wali:any
  }) => {
    if(wali.id_wali != null ) selectedWali.value = wali.id_wali
  });

  openModalWali.value = true
}

const fnUpdateWali=()=>{
  classes.editWali({
    id_class : selectedClass.value,
    id_wali : selectedWali.value
  }).then((res)=>{
    if(res?.meta.status == 0) notif.error(t('notif.failedupdate'))
    else notif.success(t('notif.successadd'))
  })
  openModalWali.value = false
}

watch(
  ()=> selectedClass.value,
  ()=> filterClass()
)

</script>

<template>
  <div class="class-dashboard">
    <div class="class-dashboard-wrapper">
      <!--Search toolbar -->
      <div class="search-menu">
        <div class="search-bar">
          <VField class="is-autocomplete-select is-curved-select">
            <VControl icon="feather:users">
              <Multiselect
                v-model="selectedClass"
                :searchable="true"
                :create-tag="false"
                :options="classes.classes"
                placeholder=""
              />
            </VControl>
          </VField>
        </div>
        <div class="search-bar pl-5">
          <VField class="is-autocomplete-select is-curved-select">
            <VControl icon="feather:search">
              <Multiselect
                v-model="selectedDay"
                :searchable="true"
                :create-tag="false"
                :options="dayOptions"
                placeholder=""
              />
            </VControl>
          </VField>
        </div>
        <!-- <button class="search-button" @click="filterClass">{{t('button.filter')}}</button> -->
      </div>

      <!--Dashboard content -->
      <div class="main-container">
        <!--Left Alert -->
        <div class="search-type">
          <div class="alert has-text-centered">
            <VButton @click="openModalAdd = true" raised color="primary">
              <i class="fa fa-plus-circle"></i> {{t('class.addclass')}}
            </VButton>
            <ModalAddClass :loading="classes.loading_add" :open="openModalAdd" @save="fnAddclass" @close="openModalAdd=false" />
          </div>
          <!--Left filters block -->
          <ModalAddClass :loading="classes.loading_add" :open="openModalAdd" @save="fnAddclass" @close="openModalAdd=false" />
          <div class="job-time pt-0" v-for="wali, index in classes.teachers" :key="index">
            <div class="alert has-text-centered mt-2" v-if="wali.foto == null || wali.name == null">
              <VButton @click="fnShowModalWali" raised color="primary">
                <i class="fa fa-plus-circle"></i> {{t('class.addwali')}}
              </VButton>
            </div>
            <template v-else>
              <div class="job-time-title mb-3"></div>
              <div class="job-card">
                <div class="has-text-centered">
                    <img class="job-card-logo" :src="wali.foto" alt="" />
                </div>
                <div class="job-card-title mt-2 has-text-centered">{{wali.wali}}</div>
                <div class="job-card-subtitle has-text-centered">({{t('class.wali')}})</div>
                <div class="job-card-buttons">
                    <VButtons>
                      <VButton color="info" @click="fnChangeWali" raised>{{t('button.change')}}</VButton>
                      <VButton color="info" raised>{{wali.name}}</VButton>
                    </VButtons>
                </div>
              </div>
            </template>
          </div>
          <div class="job-time">
            <div class="job-time-title">{{t('menu.courses')}}</div>
            <div class="job-wrapper">
              <listWidgetUserList :users="userList" />
            </div>
          </div>

          <div class="alert mt-4">
            XXX
          </div>
        </div>

        <!--Results-->
        <div class="searched-class">
          <!--Results toolbar-->

          <div class="searched-bar">
            <div class="searched-count">{{t('pagination.show')}} {{ filteredStudent.length ?? 0 }} {{t('menu.student')}}</div>
            <div class="is-flex">
              <VButton v-if="selectedClass != null" class="mr-2" color="primary"> {{t('class.addstudent')}} </VButton>
              <div class="searched-link">
                <VField>
                  <VControl icon="feather:search">
                      <VInput v-model="search" type="text" :placeholder="t('class.search')" />
                  </VControl>
                </VField>
              </div>
            </div>
          </div>

          <!--Results content-->
          <div class="job-cards" v-if="classes.loading">
            <LoaderClass v-for="a in 30" :key="a" />
          </div>
          <div v-if="!filteredStudent.length">
            <VPlaceholderPage :title="t('notfound.data')" :subtitle="t('notfound.otherfilter')">
              <template #image>
                <img class="light-image empty-image" src="/@src/assets/illustrations/placeholders/search-7.svg"/>
                <img class="dark-image empty-image" src="/@src/assets/illustrations/placeholders/search-7-dark.svg"/>
              </template>
            </VPlaceholderPage>
          </div>
          <div v-else class="job-cards">
            <!--Card-->
            <div v-for="(student, index) in filteredStudent" :key="index" class="job-card">
              <!-- <div class="job-card-header has-text-centered"> -->
              <div class="has-text-centered">
                <img class="job-card-logo" :src="student.foto" alt="" />
              </div>
              <div class="job-card-title mt-2 has-text-centered">{{ student.name }}</div>
              <div class="job-card-subtitle has-text-centered">{{ student.email }}</div>
              <div class="job-detail-buttons"></div>
              <div class="job-card-buttons">
                <VButtons>
                  <VButton color="primary" raised></VButton>
                  <VButton color="primary" raised></VButton>
                </VButtons>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <VModal noscroll :title="t('class.modal.changewali')" :open="openModalWali" actions="center" @close="openModalWali = false">
      <template #content>
        <div style="height:160px">
          <VField>
            <VControl>
              <Multiselect
                v-model="selectedWali"
                :placeholder="t('class.addwali')"
                label="name"
                :options="classes.wali"
                :searchable="true"
                track-by="name"
                :max-height="145"
              >
                <template #singlelabel="{ value }">
                  <div class="multiselect-single-label">
                    <img class="select-label-icon mr-2" style="width:30px" :src="value.icon" alt="" />
                    {{ value.name }}
                  </div>
                </template>
                <template #option="{ option }">
                  <img class="select-option-icon mr-2" style="width:30px" :src="option.icon" alt="" />
                  {{ option.name }}
                </template>
              </Multiselect>
            </VControl>
          </VField>
        </div>
      </template>
      <template #action>
          <VButton v-if="classes.loading_update" color="primary" loading raised>{{t('button.update')}}</VButton>
          <VButton v-else color="primary" raised @click="fnUpdateWali">{{t('button.update')}}</VButton>
      </template>
    </VModal>
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

.class-dashboard {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  overflow: hidden;

  .class-dashboard-wrapper {
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

    .searched-class {
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
  .class-dashboard {
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
  .class-dashboard {
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

      .searched-class {
        padding-left: 0;
      }
    }
  }
}
.empty-image {
  width: 500px;
}
</style>