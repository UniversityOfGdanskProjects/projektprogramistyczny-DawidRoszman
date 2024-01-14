import { Ticket, User } from '@/types/types';
import React from 'react';

export const UserContext = React.createContext<User | null>(null);
export const TicketsContext = React.createContext<Ticket[] | null>(null);