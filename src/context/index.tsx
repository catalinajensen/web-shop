import { createContext } from 'react';
import { State } from '../types';

export const ctx = createContext<State | null>(null);
