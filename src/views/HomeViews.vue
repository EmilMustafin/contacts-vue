<script setup lang="ts">
import { UsersIcon } from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';
import type { Contact } from '@/components/api/model/types';
import { apiContacts } from '@/components/api/contacts-api';
import ContactForm from '@/components/ContactForm.vue';
import ContactList from '@/components/ContactList.vue';
import SearchBar from '@/components/SearchBar.vue';

const contacts = ref<Contact[]>([]);
const searchQuery = ref('');
const contactToEdit = ref<Contact | null>(null);
const isModalOpen = ref(false);

const loadContacts = () => {
    localStorage.setItem('contacts', JSON.stringify(contacts.value));
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
        contacts.value = JSON.parse(savedContacts);
    }
};
onMounted(() => {
    apiContacts()
        .then((data) => {
            if (data) {
                contacts.value = data;
            }
        })
        .then(() => {
            loadContacts();
        });
});
const filteredContacts = computed(() =>
    contacts.value.filter((contact) => contact.name.toLowerCase().includes(searchQuery.value.toLowerCase())),
);
const isEditMode = computed(() => contactToEdit.value !== null);

const saveContacts = () => localStorage.setItem('contacts', JSON.stringify(contacts.value));

const addContact = (contact: Contact) => {
    contacts.value.push(contact);
    saveContacts();
    closeModal();
};

const updateContact = (updatedContact: Contact) => {
    const index = contacts.value.findIndex((contact) => contact.id === updatedContact.id);
    if (index !== -1) {
        contacts.value[index] = updatedContact;
        saveContacts();
    }
    closeModal();
};

const deleteContact = (id: number) => {
    contacts.value = contacts.value.filter((contact) => contact.id !== id);
    saveContacts();
};

const startEditing = (contact: Contact) => {
    contactToEdit.value = contact;
    isModalOpen.value = true;
};

const openAddModal = () => {
    contactToEdit.value = null;
    isModalOpen.value = true;
};

const handleSearch = (query: string) => {
    searchQuery.value = query;
};

const closeModal = () => {
    contactToEdit.value = null;
    isModalOpen.value = false;
};

const handleOutsideClick = (event: MouseEvent) => {
    const modalContent = document.querySelector('.modal-content');
    if (modalContent && !modalContent.contains(event.target as Node)) {
        closeModal();
    }
};
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div class="mb-8 flex items-center justify-center gap-3">
                <UsersIcon class="h-8 w-8 text-purple-600" />
                <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl">Управление контактами</h1>
            </div>
            <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                <SearchBar @search="handleSearch" />
                <button
                    class="flex w-full items-center justify-center rounded-lg bg-purple-600 px-4 py-2.5 font-medium text-white shadow-sm transition-all hover:bg-purple-700 hover:shadow-md sm:w-auto"
                    @click="openAddModal"
                >
                    <span class="mr-2">Добавить контакт</span>
                    <i class="ri-add-line text-xl"></i>
                </button>
            </div>
            <transition name="fade" mode="out-in">
                <ContactList
                    v-if="filteredContacts.length > 0"
                    :contacts="filteredContacts"
                    @delete-contact="deleteContact"
                    @edit-contact="startEditing"
                />
                <div v-else class="mt-8 rounded-lg bg-white/80 p-8 text-center shadow-sm backdrop-blur-sm">
                    <p class="text-xl text-gray-600">
                        {{ searchQuery ? 'Контакты не найдены' : 'Контакты отсутствуют' }}
                    </p>
                </div>
            </transition>
        </div>
        <Transition name="modal">
            <div
                v-if="isModalOpen"
                class="fixed inset-0 z-50 overflow-y-auto"
                role="dialog"
                @click="handleOutsideClick"
            >
                <div class="flex min-h-screen items-center justify-center px-4">
                    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"></div>
                    <div
                        class="modal-content relative w-full max-w-md transform rounded-xl bg-white p-6 shadow-xl transition-all"
                    >
                        <button
                            class="absolute right-4 top-4 text-gray-400 transition-colors hover:text-gray-500"
                            @click="closeModal"
                        >
                            <i class="ri-close-line text-2xl"></i>
                        </button>

                        <h2 class="mb-4 text-xl font-semibold text-gray-900">
                            {{ isEditMode ? 'Редактировать контакт' : 'Добавить контакт' }}
                        </h2>
                        <ContactForm
                            :existing-contact="contactToEdit"
                            @add-contact="addContact"
                            @update-contact="updateContact"
                            @cancel="closeModal"
                        />
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>
