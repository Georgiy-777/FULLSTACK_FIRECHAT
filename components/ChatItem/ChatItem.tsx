import { Box, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { chatRecipient } from '../../pages/api/api';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase.config';
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
interface IRecipient {
    name: string;
    email: string;
    avatar: string;
    lastActivity: string;
    isOnline: boolean;
}
const ChatItem = ({ chat,  email }) => {
    const [user] = useAuthState(auth);

    const router = useRouter();
    const redirect = (id: string) => {
        router.push(`/chat/${id}`);
    };


    const [value, loading, error] = useDocument(doc(db, 'users', `${email}`));

    console.log('🚀 ~ ChatItem ~ value:', value?.data());

    return (
        <Box
            display={'flex'}
            justifyContent={'space-between'}
            mb={'20px'}
            bg={'#2D9CDB'}
            borderRadius={'10px'}
            w={'100%'}
            
            p={6}
            gap={'20px'}
            alignItems={'center'}
            _hover={{ cursor: 'pointer' }}
            onClick={() => redirect(chat.id)}
        >
            <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                w={'70%'}
            >
               {value?.data()?.avatar &&
               <Image
                    src={value?.data()?.avatar}
                    style={{ borderRadius: '50%' }}
                    width={40}
                    height={40}
                    alt="avatar"
                />} 
                <p>{value?.data()?.name}</p>
            </Box>

            <Box
                w={'10px'}
                h={'10px'}
                bg={value?.data()?.isOnline ? 'green' : 'red'}
                borderRadius={'50%'}
            ></Box>
        </Box>
    );
};

export default ChatItem;
