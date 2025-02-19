<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton v-if="CurrentNamePage === 'Tables'" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Открыть главное меню</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <router-link to="/profile">
            <div class="flex flex-shrink-0 items-center">
              <img class="h-8 w-auto" src="./../assets/logo.png" alt="Your Company" />
            </div>
          </router-link>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <a v-for="item in navigation" :key="item.name" @click="handleNavigation(item)" 
                 :class="{'bg-gray-900 text-white': item.current, 'text-gray-300 hover:bg-gray-700 hover:text-white': !item.current, 'rounded-md px-3 py-2 text-sm font-medium cursor-pointer': true}" 
                 :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3">
            <div>
              <MenuButton class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span class="absolute -inset-1.5" />
                <span class="sr-only">Открыть меню профиля</span>
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem v-slot="{ active }">
                  <router-link to="/profile" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Профиль</router-link>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a @click="logout" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Выйти</a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2">
          <a v-for="item in navigation" :key="item.name" @click="handleNavigation(item)" 
             :class="{'bg-gray-900 text-white': item.current, 'text-gray-300 hover:bg-gray-700 hover:text-white': !item.current, 'block rounded-md px-3 py-2 text-base font-medium cursor-pointer': true}"
             :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
        </div>
      </DisclosurePanel>
  </Disclosure>
</template>


<script setup>
import { defineProps, defineEmits } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router';

const router = useRouter();
const CurrentNamePage = router.currentRoute.value.name;

const nameMapping = {
  'задачи': 'tasks',
  'пользователи': 'TableWorkers',
  // Добавьте сюда другие соответствия, если необходимо
};

const getEnglishName = (currentTable) => {
  return nameMapping[currentTable] || currentTable.toLowerCase();
};

const props = defineProps({
  navigation: Array,
  currentTable: String
})

const emits = defineEmits(['navigate']) // определяем событие для передачи в родительский компонент

const handleNavigation = (item) => {
  emits('navigate', item) // передаем объект item вместо его имени
}

const logout = () => {
  localStorage.clear();
  router.push('/');
}
</script>
