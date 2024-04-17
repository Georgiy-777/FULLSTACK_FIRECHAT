import { Flex, Heading, Avatar, Box } from '@chakra-ui/react';
import Image from 'next/image';

export default function Topbar({ avatar, name }) {
    return (
        <Box
            display={'flex'}
            bg={'gray.700'}
            h="81px"
            w="100%"
            alignItems="center"
            p={5}
        >
          {
              avatar && <Image
                src={avatar}
                style={{ borderRadius: '50%' }}
                width={40}
                height={40}
                alt="avatar"
            />
          }  
            <p style={{ marginLeft: '10px', color: 'white' }}>{name}</p>
        </Box>
    );
}
