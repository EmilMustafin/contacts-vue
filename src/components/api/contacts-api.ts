import type { Contact } from './model/types';

export const apiContacts = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        const data: Contact[] = await response.json();
        const updatedData = data.map((user) => ({
            id: user.id,
            name: user.name,
            phone: user.phone.split(' ')[0],
            email: user.email,
        }));

        return updatedData;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to load contacts:', error);
    }
};
