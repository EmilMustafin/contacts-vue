<script setup lang="ts">
import { User, Phone, Mail, Save, X } from 'lucide-vue-next';
import { ref, computed } from 'vue';
import type { Contact } from './api/model/types';

interface ContactFormProps {
    existingContact: Contact | null;
}

const props = defineProps<ContactFormProps>();

const emit = defineEmits<{
    (e: 'addContact', contact: Contact): void;
    (e: 'updateContact', contact: Contact): void;
    (e: 'cancel'): void;
}>();

const contact = ref<Contact>(
    props.existingContact ? { ...props.existingContact } : { id: Date.now(), name: '', phone: '', email: '' },
);

const errors = ref<{ [key: string]: string }>({
    name: '',
    phone: '',
    email: '',
});

const isEdit = computed(() => !!props.existingContact);

const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    let formatted = '';

    if (cleaned.length > 0) {
        formatted = '+' + cleaned.substring(0, 1);
        if (cleaned.length > 1) {
            formatted += ' (' + cleaned.substring(1, 4);
            if (cleaned.length > 4) {
                formatted += ') ' + cleaned.substring(4, 7);
                if (cleaned.length > 7) {
                    formatted += '-' + cleaned.substring(7, 9);
                    if (cleaned.length > 9) {
                        formatted += '-' + cleaned.substring(9, 11);
                    }
                }
            }
        }
    }
    return formatted;
};

const handlePhoneInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const formatted = formatPhoneNumber(input.value);
    contact.value.phone = formatted;
    clearError('phone');
};

const onSubmit = () => {
    let isValid = true;

    errors.value = {
        name: '',
        phone: '',
        email: '',
    };

    if (!contact.value.name.trim()) {
        errors.value.name = 'Имя обязательно для заполнения';
        isValid = false;
    } else if (contact.value.name.length < 2) {
        errors.value.name = 'Имя должно содержать минимум 2 символа';
        isValid = false;
    }

    if (!contact.value.phone.trim()) {
        errors.value.phone = 'Телефон обязателен для заполнения';
        isValid = false;
    } else {
        const onlyNumbers = contact.value.phone.replace(/\D+/g, '');
        if (onlyNumbers.length !== 11) {
            errors.value.phone = 'Номер телефона должен содержать 11 цифр';
            isValid = false;
        }
    }

    if (!contact.value.email.trim()) {
        errors.value.email = 'Email обязателен для заполнения';
        isValid = false;
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(contact.value.email)) {
        errors.value.email = 'Введите корректный email адрес';
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    if (isEdit.value) {
        emit('updateContact', contact.value);
    } else {
        emit('addContact', contact.value);
    }
};

const clearError = (field: string) => {
    errors.value[field] = '';
};
</script>

<template>
    <form class="space-y-6" @submit.prevent="onSubmit">
        <div class="space-y-4">
            <div>
                <label class="mb-1 block text-sm font-medium text-gray-700">Имя</label>
                <div class="relative">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <User class="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        v-model="contact.name"
                        name="name"
                        type="text"
                        placeholder="Введите имя"
                        :class="[
                            'w-full rounded-lg border py-2.5 pl-10 pr-4 transition-colors',
                            'focus:outline-none focus:ring-2',
                            errors.name
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                : 'border-gray-300 focus:border-purple-500 focus:ring-purple-200',
                        ]"
                        @focus="clearError('name')"
                    />
                </div>
                <p v-if="errors.name" class="mt-1 flex items-center text-sm text-red-500">
                    <i class="ri-error-warning-line mr-1"></i>
                    {{ errors.name }}
                </p>
            </div>
            <div>
                <label class="mb-1 block text-sm font-medium text-gray-700">Телефон</label>
                <div class="relative">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Phone class="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        v-model="contact.phone"
                        name="phone"
                        type="tel"
                        placeholder="+7 (999) 999-99-99"
                        :class="[
                            'w-full rounded-lg border py-2.5 pl-10 pr-4 transition-colors',
                            'focus:outline-none focus:ring-2',
                            errors.phone
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                : 'border-gray-300 focus:border-purple-500 focus:ring-purple-200',
                        ]"
                        @input="handlePhoneInput"
                    />
                </div>
                <p v-if="errors.phone" class="mt-1 flex items-center text-sm text-red-500">
                    <i class="ri-error-warning-line mr-1"></i>
                    {{ errors.phone }}
                </p>
            </div>
            <div>
                <label class="mb-1 block text-sm font-medium text-gray-700">Email</label>
                <div class="relative">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Mail class="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        v-model="contact.email"
                        name="email"
                        type="email"
                        placeholder="example@email.com"
                        :class="[
                            'w-full rounded-lg border py-2.5 pl-10 pr-4 transition-colors',
                            'focus:outline-none focus:ring-2',
                            errors.email
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                : 'border-gray-300 focus:border-purple-500 focus:ring-purple-200',
                        ]"
                        @focus="clearError('email')"
                    />
                </div>
                <p v-if="errors.email" class="mt-1 flex items-center text-sm text-red-500">
                    <i class="ri-error-warning-line mr-1"></i>
                    {{ errors.email }}
                </p>
            </div>
        </div>
        <div class="flex justify-end gap-3">
            <button
                type="button"
                class="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                @click="$emit('cancel')"
            >
                <X class="mr-2 h-5 w-5" />
                Отмена
            </button>
            <button
                type="submit"
                class="inline-flex items-center rounded-lg bg-purple-600 px-4 py-2.5 text-white shadow-sm transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
                <Save class="mr-2 h-5 w-5" />
                {{ isEdit ? 'Сохранить' : 'Добавить' }}
            </button>
        </div>
    </form>
</template>
