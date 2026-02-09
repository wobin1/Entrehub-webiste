import { z } from 'zod';

export const contactMessageSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
    email: z.string().email('Invalid email address'),
    phone: z.string().max(20, 'Phone number is too long').optional(),
    message: z.string().min(1, 'Message is required').max(5000, 'Message is too long'),
});

export const updateContactMessageSchema = z.object({
    status: z.enum(['UNREAD', 'READ', 'REPLIED', 'ARCHIVED']).optional(),
    notes: z.string().max(5000, 'Notes are too long').optional(),
});
