<template>
  <div class="language-switcher select-none">
    <!-- Mobile version: Shows only code (EN/ES) -->
    <div class="relative inline-block md:hidden">
      <select
        :value="locale"
        @change="switchLanguage($event.target.value)"
        class="appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-7 py-1.5 text-sm font-medium text-gray-700 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 cursor-pointer hover:shadow-md w-[70px]"
      >
        <option
          v-for="loc in localesList"
          :key="loc.code"
          :value="loc.code"
        >
          {{ loc.code.toUpperCase() }}
        </option>
      </select>

      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    <!-- Desktop version: Shows flag and full name -->
    <div class="relative hidden md:inline-block">
      <select
        :value="locale"
        @change="switchLanguage($event.target.value)"
        class="appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-8 py-1.5 text-sm font-medium text-gray-700 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 cursor-pointer hover:shadow-md min-w-[140px]"
      >
        <option
          v-for="loc in localesList"
          :key="loc.code"
          :value="loc.code"
        >
          {{ loc.flag }} {{ loc.name }}
        </option>
      </select>

      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
const { locale, setLocale } = useI18n();

// Locale configuration with flags
const localesList = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

const switchLanguage = (newLocale) => {
  setLocale(newLocale);
  // Save to localStorage for persistence
  if (process.client) {
    localStorage.setItem('user-locale', newLocale);
  }
};

// Load saved locale on mount
onMounted(() => {
  if (process.client) {
    const savedLocale = localStorage.getItem('user-locale');
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'es')) {
      setLocale(savedLocale);
    }
  }
});
</script>
