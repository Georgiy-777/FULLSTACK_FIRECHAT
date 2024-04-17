import '../styles/globals.css'
import { ChakraProvider, Spinner, Center } from "@chakra-ui/react";
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from "../components/Login/Login";
import { auth } from "../firebase.config"
import Sidebar from "../components/Sidebar/Sidebar";
import Loader from "../components/UI/Loader";
function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <ChakraProvider>
        <Center h="100vh">
          <Loader size="xl" />
        </Center>
      </ChakraProvider>
    )
  }

  if (!user) {
    return (
      <ChakraProvider>
        <Login /> 
      </ChakraProvider>
    )
  }

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp