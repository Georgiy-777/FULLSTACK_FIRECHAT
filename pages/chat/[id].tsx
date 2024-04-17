import { Box } from '@chakra-ui/layout';
import { collection, doc, orderBy, query } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
    useCollection,
    useCollectionData,
    useDocument
} from 'react-firebase-hooks/firestore';
import Sidebar from '../../components/Sidebar/Sidebar';
import Topbar from '../../components/Topbar/Topbar';
import ChatForm from '../../components/UI/Buttons/ChatForm';
import { auth, db } from '../../firebase.config';
const getOtherEmail = (users, currentUser) => {
    return users?.filter(user => user !== currentUser.email)[0];
};
interface IChat {
    id: string;
    messages: any;
    users: string[];
    // Другие необходимые поля
}
interface IRecipient {
    name: string;
    email: string;
    avatar: string;
    lastActivity: string;
}
export default function Chat() {
    const router = useRouter();
    const { id } = router.query;
    const [user] = useAuthState(auth);

    const [snapshotChats, loadingChats, errorChats] = useCollection(
        collection(db, 'chats'),
    );
    const chats = snapshotChats?.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    })) as IChat[];
    const [value, loading, error] = useDocument(doc(db, 'chats', `${id}`));
    const filteredUsers = value
        ?.data()
        ?.users?.find(item => item !== user.email);
    const [oponent, loadingOponent, errorOponent] = useDocument(
        doc(db, 'users', `${filteredUsers}`),
    );

    const q = query(
        collection(db, `chats/${id}/messages`),
        orderBy('timestamp'),
    );
    const [messages] = useCollectionData(q);
    const bottomOfChat = useRef();

    const getMessages = () =>
        messages?.map(msg => {
            const sender = msg.sender === user.email;
            return (
                <Box
                    key={Math.random()}
                    alignSelf={sender ? 'flex-start' : 'flex-end'}
                    bg={sender ? 'blue.100' : 'green.100'}
                    w="fit-content"
                    minWidth="100px"
                    borderRadius="lg"
                    p={3}
                    m={1}
                >
                    <p>{msg.text}</p>
                </Box>
            );
        });

    return (
        <Box h="100vh" display={'flex'}>
            <Sidebar />

            <Box flex={1} flexDirection="column" display={'flex'}>
                <Topbar
                    avatar={oponent?.data()?.avatar}
                    name={oponent?.data()?.name}
                />

                <Box
                    display={'flex'}
                    flex={1}
                    flexDirection="column"
                    pt={4}
                    mx={5}
                    overflowX="scroll"
                    sx={{ scrollbarWidth: 'none' }}
                >
                    {getMessages()}
                    <div ref={bottomOfChat}></div>
                </Box>

                <ChatForm id={id} user={user} />
            </Box>
        </Box>
    );
}
