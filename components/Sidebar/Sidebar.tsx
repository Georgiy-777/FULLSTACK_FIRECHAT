import { FC, useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
    collection,
    addDoc,
    QuerySnapshot,
    DocumentData,
    doc,
    updateDoc,
} from 'firebase/firestore';
import { Avatar, Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase.config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import Image from 'next/image';
import CustomBtn from '../UI/Buttons/CustomBtn';
import { v4 as uuidv4 } from "uuid";
import { chatRecipient } from '../../pages/api/api';
import ChatItem from '../ChatItem/ChatItem';

interface Chat {
    id: string;
    users: string[];
    // Другие необходимые поля
}

interface IRecipient {
    name: string;
    email: string;
    avatar: string;
    lastActivity: string;
}
const Sidebar = (
    {
        /* Передаваемые пропсы */
    },
) => {
    const [oponent , setOponent] = useState('');
    const [user] = useAuthState(auth);
    console.log("🚀 ~ user:", user)
    const [snapshotChats, loadingChats, errorChats] = useCollection(collection(db, 'chats'));

    const chats = snapshotChats?.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    })) as Chat[];
    
    const router = useRouter();



    const chatExists = (email: string): boolean =>
        !!chats?.find(
            chat =>
                chat.users.includes(user.email) && chat.users.includes(email),
        );

    const newChat = async () => {
        const input = prompt('Enter email of chat recipient');
        setOponent(input);
        if (input && !chatExists(input) && input !== user.email) {
            await addDoc(collection(db, 'chats'), {
                users: [user.email, input],
            });
        }
    };
const handleLogout = async () => {
    try {
        await  updateDoc(doc(db, "users", `${auth.currentUser?.email}`), {
      
            isOnline: false   
            
           
        }).then(()=>{
            signOut(auth);
        })

     
    } catch (error) {
        console.log(error);
    }
}
 
    const redirect = (id: string) => {
        router.push(`/chat/${id}`);
    };
    const getOtherEmail = (users, currentUser) => {
        return users?.filter(user => user !== currentUser.email)[0];
    };
    const chatList = () => {

        return (
          chats?.filter(chat => chat.users.includes(user.email))
          .map(chat => (
                <ChatItem chat={chat} key={chat.id} email={getOtherEmail(chat.users, user)} />
          )
           
          )
        )
      }
      
 
    return (
        <Box
            h="100%"
            w="400px"
            bgColor={'rgb(22, 31, 31)'}
            borderEnd="3px solid"
            borderColor="#2D9CDB"
            flexDirection="column"
            alignItems={'center'}
            display={'flex'}
            color={'white!important'}
        >
            <Box
            display={'flex'}

                h="81px"
                w="100%"
                alignItems="center"
                justifyContent="space-between"
               bg={'gray.700'}
                p={4}
                mb={4}
            >
                <Box display={'flex'} alignItems={'center'} gap={3}>
                    <Image
                        src={user.photoURL}
                        style={{ borderRadius: '50%' }}
                        width={40}
                        height={40}
                        alt="avatar"
                    />

                    <p>{user.displayName}</p>
                </Box>
                {/* <IconButton size="sm" isRound icon={<ArrowLeftIcon />}  /> */}
                <CustomBtn
                    text={'Sign out'}
                    padding={'5px 10px'}
                    onClick={handleLogout}
                />
            </Box>

            <CustomBtn
                text={'New Chat'}
                padding={'5px 70px'}
                onClick={() => newChat()}
            />

            <Box
            display={'flex'}
            pt={10}
            px={10}
w={'100%'}
                overflowX="scroll"
                flexDirection="column"
                sx={{ scrollbarWidth: 'none' }}
                flex={1}
            >
                {chatList()}
            </Box>
        </Box>
    );
};

export default Sidebar;
