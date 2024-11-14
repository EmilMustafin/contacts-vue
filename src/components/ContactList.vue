<script setup lang="ts">
import ContactItem from './ContactItem.vue';
import type { Contact } from './api/model/types';

interface ContactListProps {
    contacts: Contact[];
}

defineProps<ContactListProps>();

defineEmits<{
    (e: 'deleteContact', id: number): void;
    (e: 'editContact', contact: Contact): void;
}>();
</script>

<template>
    <transition-group name="list" tag="ul" class="space-y-3">
        <ContactItem
            v-for="contact in contacts"
            :key="contact.id"
            :contact="contact"
            @delete-contact="$emit('deleteContact', contact.id)"
            @edit-contact="$emit('editContact', contact)"
        />
    </transition-group>
</template>
