<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useCourses } from '/@src/stores/courses'
import { useViewWrapper } from '/@src/stores/viewWrapper'
const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Courses')
useHead({
  title: 'Course',
})
const courses = useCourses()
const search = ref('')
const filteredData = computed(() => {
  if (!search.value) {
    if(courses.data == undefined) return []
    return courses.data
  } else {
    const filterRe = new RegExp(search.value, 'i')
    return courses.data.filter((item:any) => {
      return (
        item.code.match(filterRe) || item.course.match(filterRe)
      )
    })
  }
})

onMounted(()=>{
  Promise.all(
    [ courses.fetchSources(), courses.fetchTeacher()]
  )
})

const tagTeacher = ref([45])
const selectedCourse = ref(0)
const modalTeacher = ref(false)

const fnShowModalTeacher=(id:number, teachers:[])=>{
    selectedCourse.value = id
    tagTeacher.value = teachers
    modalTeacher.value = true
}
</script>

<template>
  <div>
        <VModal noscroll title="Edit Teacher in Course" :open="modalTeacher" actions="center" @close="modalTeacher = false">
            <template #content>
                <div style="height:160px">
                    <VField v-slot="{ id }">
                        <VControl>
                        <Multiselect
                            v-model="tagTeacher"
                            :attrs="{ id }"
                            mode="tags"
                            :searchable="true"
                            :create-tag="false"
                            :options="courses?.teachers"
                            placeholder="Add Teacher"
                        />
                        </VControl>
                    </VField>
                </div>
            </template>
            <template #action>
                <VButton color="primary" raised>Update</VButton>
            </template>
        </VModal>
    <div class="tile-grid-toolbar">
      <VControl icon="feather:search">
        <input v-model="search" class="input custom-text-filter" placeholder="Search..." />
      </VControl>

      <div class="buttons">
        <VButton color="primary" raised>
          <span class="icon">
            <i aria-hidden="true" class="fas fa-plus"></i>
          </span>
          <span>Add Course</span>
        </VButton>
      </div>
    </div>

    <div class="tile-grid tile-grid-v1">
      <div class="job-cards" v-if="courses.loading">
        <LoaderCourse />
      </div>
      <VPlaceholderPage v-else-if="!filteredData.length" title="Maaf, data tidak ditemukan" subtitle="Silahkan mencari dengan kata kunci yang lain">
        <template #image>
            <img class="light-image empty-image" src="/@src/assets/illustrations/placeholders/search-7.svg"/>
            <img class="dark-image empty-image" src="/@src/assets/illustrations/placeholders/search-7-dark.svg"/>
        </template>
      </VPlaceholderPage>
      <TransitionGroup v-else name="list" tag="div" class="columns is-multiline">
        <div v-for="(item, key) in filteredData" :key="key" class="column is-4">
          <div class="tile-grid-item">
            <div class="tile-grid-item-inner">
              <VAvatar :picture="item.picture" :badge="item.badge" :color="item.color" :initials="item.code" size="medium" />
              <div class="meta">
                <span class="dark-inverted">{{ item.course }}</span>
                <span class="mt-2 is-clickable" @click="fnShowModalTeacher(item.id, item.teachers)">{{item.total_teacher}} Teacher</span>
              </div>
              <CourseCardDropdown />
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style lang="scss">
@import '/@src/scss/abstracts/all';

.tile-grid {
  .columns {
    margin-left: -0.5rem !important;
    margin-right: -0.5rem !important;
    margin-top: -0.5rem !important;
  }

  .column {
    padding: 0.5rem !important;
  }
}

.is-dark {
  .tile-grid {
    .tile-grid-item {
      @include vuero-card--dark;
    }
  }
}

.tile-grid-v1 {
  .tile-grid-item {
    @include vuero-s-card;

    border-radius: 14px;
    padding: 16px;

    .tile-grid-item-inner {
      display: flex;
      align-items: center;

      .meta {
        margin-left: 10px;
        line-height: 1.2;

        span {
          display: block;
          font-family: var(--font);

          &:first-child {
            color: var(--dark-text);
            font-family: var(--font-alt);
            font-weight: 600;
            font-size: 1rem;
          }

          &:nth-child(2) {
            color: var(--light-text);
            font-size: 0.9rem;
          }
        }
      }

      .dropdown {
        position: relative;
        margin-left: auto;
      }
    }
  }
}
</style>
