<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="./../assets/logo.png" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Войти в свой аккаунт</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="loginUser">
        <div class="flex justify-between flex-col">
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Имя пользователя</label>
          <div class="mt-2">
            <input v-model="username" id="username" name="username" type="text" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 bg-inherit ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div class="flex justify-between flex-col">
          <div>
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Пароль</label>
          </div>
          <div class="mt-2">
            <input v-model="password" id="password" name="password" type="password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 bg-inherit ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">Войти</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Нет аккаунта?
        {{ ' ' }}
        <router-link to="/register" class="font-semibold leading-6 text-emerald-600 hover:text-emerald-500">Создай новый аккаунт</router-link>
      </p>

      <p class="mt-2 text-center text-red-500" v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

if (!localStorage.getItem('role')) {
  localStorage.setItem('role', 'notauth');
}

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const loginUser = async () => {
  try {
    const response = await axios.post('http://92.39.213.116:8092/login', {
      username: username.value,
      password: password.value
    });

    if (response.status === 200) {
      localStorage.setItem('role', 'auth');
      router.push('/Profile');
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      errorMessage.value = 'Неправильное имя пользователя или пароль';
    } else {
      errorMessage.value = 'Ошибка авторизации';
    }
  }
}
</script>
