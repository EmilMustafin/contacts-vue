<script setup lang="ts">
import { Pencil, Trash2, Phone, Mail } from 'lucide-vue-next';
import type { Contact } from './api/model/types';

interface ContactItemProps {
    contact: Contact;
}

defineProps<ContactItemProps>();

defineEmits<{
    (e: 'editContact', contact: Contact): void;
    (e: 'deleteContact', id: number): void;
}>();
</script>

<template>
    <li class="transform rounded-xl bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h3 class="text-lg font-medium text-gray-900">{{ contact.name }}</h3>
                <div class="mt-2 space-y-2">
                    <p class="flex items-center text-sm text-gray-600">
                        <Phone class="mr-2 h-4 w-4 text-purple-600" />
                        {{ contact.phone }}
                    </p>
                    <p class="flex items-center text-sm text-gray-600">
                        <Mail class="mr-2 h-4 w-4 text-purple-600" />
                        {{ contact.email }}
                    </p>
                </div>
            </div>
            <div class="flex space-x-2">
                <button
                    class="rounded-lg p-2 text-amber-600 transition-colors hover:bg-amber-50"
                    @click="$emit('editContact', contact)"
                >
                    <Pencil class="h-5 w-5" />
                </button>
                <button
                    class="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
                    @click="$emit('deleteContact', contact.id)"
                >
                    <Trash2 class="h-5 w-5" />
                </button>
            </div>
        </div>
    </li>
</template>
