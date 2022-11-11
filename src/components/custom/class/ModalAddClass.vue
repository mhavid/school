<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { locale, t } = useI18n()
const props = withDefaults(defineProps<{
  open ?:boolean
  loading?:boolean
}>(), {
  open :false,
  loading :false
})

const emit = defineEmits(['close','save'])
const name = ref('')
const code = ref('')
const fnSave=()=>{
  const data = {
    name : name.value,
    code : code.value
  }
  emit('save', data)
}
const fnCheckInput=()=>{
  let nln = name.value.replace(/\s/g, '')
  let cln = code.value.replace(/\s/g, '')
  if(nln && cln) return false
  return true
}
</script>

<template>
  <VModal
    :open="props.open"
    :title="t('class.addclass')"
    size="small"
    actions="center"
    noscroll
    noclose
    @close="emit('close')"
  >
    <template #content>
      <VField>
        <VControl>
          <VInput v-model="name" class="is-primary-focus" :placeholder="t('class.modal.classname')" />
        </VControl>
      </VField>
      <VField>
        <VControl>
          <VInput v-model="code" class="is-primary-focus" :placeholder="t('class.modal.classcode')" />
        </VControl>
      </VField>
    </template>
    <template #action>
      <VButton v-if="props.loading" color="primary" loading raised>{{t('button.save')}}</VButton>
      <VButton v-else :disabled="fnCheckInput()" color="primary" @click="fnSave" raised>{{t('button.save')}}</VButton>
    </template>
  </VModal>
</template>