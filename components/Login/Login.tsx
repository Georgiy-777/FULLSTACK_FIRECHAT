import Head from 'next/head';
import { ChatIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Center, Flex, Stack } from '@chakra-ui/react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase.config';
import CustomBtn from '../UI/Buttons/CustomBtn';
import { addDoc, collection, doc, getDoc, query, serverTimestamp, setDoc } from 'firebase/firestore';
export default function Login() {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    const handleSignInWithGoogle = async () => {
        try {
            await signInWithGoogle().then(() => {
                 setDoc(doc(db, "users", `${auth.currentUser?.email}`), {
                    name: auth.currentUser?.displayName,
                    email: auth.currentUser?.email,
                    lastActivity: serverTimestamp(),                   
                    avatar:  auth?.currentUser?.photoURL,  
                    isOnline: true   
                });
            })
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    return (
        <Center h="100vh">
            <Box
                display={'flex'}
                alignItems={'center'}
                bgColor={'rgb(22, 31, 31)'}
                p={6}
                flexDir={'column'}
                gap={'20px'}
                w={'100%'}
                maxW={'500px'}
                h={'300px'}
                borderRadius={'10px'}
                justifyContent={"space-around"}
            >
                <Box
                    display={'flex'}
                    gap={'20px'}
                    fontSize={'35px'}
                    alignItems={'center'}
                    color={'#2D9CDB'}
                >
                    <ChatIcon w="30px" h="30px" color="#2D9CDB" />
                    <h1>FIRECHAT</h1>
                </Box>         
                <CustomBtn text={'Sign in with Email'} padding={'10px 20px'} onClick={handleSignInWithGoogle} />
               
            </Box>
        </Center>
    );
}
