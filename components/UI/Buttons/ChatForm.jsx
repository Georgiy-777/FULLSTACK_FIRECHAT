import { useState } from 'react';
import { FormControl, Input, Button, Box } from '@chakra-ui/react';
import { serverTimestamp, addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebase.config';
import CustomBtn from './CustomBtn';
import { useForm, Controller } from 'react-hook-form';
export default function ChatForm({ id, user }) {

    const {
        control,
        reset,
        handleSubmit,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            message: '',
        },
    });
 
    const onSubmit = async (data) => {
        await addDoc(collection(db, `chats/${id}/messages`), {
            text: data.message,
            sender: user.email,
            timestamp: serverTimestamp(),
        });
        reset();
    };
    return (
        <Box
            p={3}
            as="form"
            display={'flex'}
            gap={13}
            mb={'30px'}
            w={'100%'}
            justifyContent={'center'}
            alignItems={'center'}
            flexWrap={'nowrap'}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Controller
                name="message"
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        className='input'
                        id="message"
                        placeholder="Type a message..."
                        type="text"
                    />
                )}
            />
            <CustomBtn
                type="submit"
                text={'SEND'}
                padding={'5px 30px'}
                onClick={() => { }}
            />
        </Box>
    );
}
