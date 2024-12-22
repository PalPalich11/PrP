<script setup>
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import BackIcon from '@/assets/Back.vue';
import { rootStore } from './stores/root';
import { ref } from 'vue';

const store = rootStore()
const modelClass = ref(null)
const emptyFields = ref([])
const errorMessage = ref('')
const form = ref({
  category: null,
  urgency: null,
  incident_lable: null,
  knowledge: null,
  priority_confirmation: null,
  active: null,
  type_contact: null,
})

const sendResponse = async () => {
  emptyFields.value = []
  const fieldToExclude = ['knowledge', 'priority_confirmation', 'active']

  let flagEmptyFields = false
  Object.keys(form.value).forEach(key => {
    if (form.value[key] === null && fieldToExclude.indexOf(key) === -1) {
      emptyFields.value.push(key)
      flagEmptyFields = true
    }
  })

  if (flagEmptyFields) {
    errorMessage.value = 'Заполните все поля'
    return;
  }

  try {
    modelClass.value = await store.request(form.value)
  }

  catch (e) {
  }
}




</script>

<template>
  <div class="continer">

    <div id="form">
      <template v-if="!modelClass">
        <h2>Введите данные</h2>

        <div class="input-group">
          <span>Категория <span class="stared">*</span></span>
          <InputNumber v-model="form.category" :invalid="emptyFields.includes('category')" inputId="integeronly" />
        </div>
        <div class="input-group">
          <span>Срочность<span class="stared">*</span></span>
          <InputNumber v-model="form.urgency" :invalid="emptyFields.includes('urgency')" inputId="integeronly" />
        </div>
        <div class="input-group">
          <span>Состояния происшествия<span class="stared">*</span></span>
          <InputText type="text" v-model="form.incident_lable" :invalid="emptyFields.includes('incident_lable')" />
        </div>
        <div class="input-group-ch">
          <Checkbox v-model="form.knowledge" :binary="true" />
          <span>Знания</span>
        </div>
        <div class="input-group-ch">
          <Checkbox v-model="form.priority_confirmation" :binary="true" />
          <span>Подтверждение приоритетности</span>
        </div>
        <div class="input-group-ch">
          <Checkbox v-model="form.active" :binary="true" />
          <span>Активность</span>
        </div>
        <div class="input-group">
          <span>Тип контакта<span class="stared">*</span></span>
          <InputText type="text" v-model="form.type_contact" :invalid="emptyFields.includes('type_contact')" />
        </div>

        <Button @click="sendResponse()" label="Отправит данные" text raised />

        <div v-if="errorMessage.length" class="result">
          {{ errorMessage }}
        </div>
      </template>

      <template v-else>
        <div class="model-result">
          <p>Сложившася ситуация опасна на {{ modelClass }} из 3</p>
          <p>Сообщите своему руководителю</p>
        </div>
        <div @click="modelClass = null" class="back-btn">
          <BackIcon style="height: 30px; width: 30px"/>
          Вернуться назад
        </div>
      </template>
    </div>

  </div>
</template>

<style scoped>
body {
  background-color: #f5faff;
}

.result {
  height: 50px;
  width: 100%;
  background: rgb(255, 234, 234);
  color: red;
  border-radius: 0 0 16px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.stared {
  color: red;
}

.continer {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

#form {
  position: relative;
  width: 700px;
  min-height: 500px;
  /* border: 2px solid rgb(171, 171, 171); */
  box-shadow: 2px 2px 5px 5px rgb(226, 226, 226);
  border-radius: 16px;
  background-color: white;

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  justify-content: space-evenly;
  align-items: center;
  overflow: hidden;
}

#form div.input-group,
#form div.input-group-ch {
  margin-bottom: 10px;
}


#form div.input-group:last-child,
#form div.input-group-ch:last-child {
  margin-bottom: 10px;
}

#form h2 {
  margin: 10px 0 20px 0;
}

#form button {
  margin-bottom: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  width: 300px;
}

.input-group-ch {
  display: flex;
  width: 300px;
}

.model-result {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}

.back-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  padding: 10px;
}

.back-btn:hover {
  background-color: rgb(240, 240, 240);
  border-radius: 20px;
}
</style>
