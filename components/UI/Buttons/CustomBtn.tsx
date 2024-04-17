import { Box } from '@chakra-ui/react';
import React from 'react';
interface CustomBtnProps {
    text: string;
    padding: string;
    type?: any;
    onClick: () => void;
}
const CustomBtn = ({ text, padding,type , onClick }: CustomBtnProps) => {
    return (
        <Box
            as="button"
            w={'fit-content'}
            _hover={{ bg: '#2D9CDB', color: 'white' }}
            border={'2px solid #2D9CDB'}
            fontWeight={'700'}
            p={padding}
            h={'40px'}
            color={'white'}
            borderRadius={'7px'}
            onClick={onClick}
            type={type}
           
        >
            {text}
        </Box>
    );
};

export default CustomBtn;
