import { Posts } from '@/types/post.type';
import { createContext } from 'react';

export const PostContext = createContext<Posts | undefined>(undefined);
