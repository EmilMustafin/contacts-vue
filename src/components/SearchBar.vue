<script setup lang="ts">
import { Search } from 'lucide-vue-next';
import { ref } from 'vue';

defineEmits<{
    (e: 'search', query: string): void;
}>();

const searchQuery = ref('');
</script>

<template>
    <div class="relative flex-1">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search class="h-5 w-5 text-gray-400" />
        </div>
        <input
            v-model="searchQuery"
            type="text"
            placeholder="Поиск по имени"
            class="w-full rounded-lg border border-gray-300 bg-white/80 py-2.5 pl-10 pr-4 text-gray-900 shadow-sm backdrop-blur-sm transition-all placeholder:text-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            @input="$emit('search', searchQuery)"
        />
    </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
    transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: scale(0.95);
}

.list-enter-active,
.list-leave-active {
    transition: all 0.3s ease;
}

.list-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

.list-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}
</style>
