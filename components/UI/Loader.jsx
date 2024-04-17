import { Flex, Spinner } from "@chakra-ui/react";

export default function Loader({
  w = "100%",
  h = "100vh",
  spinnerW = "80px",
  spinnerH = "80px",
  
  ...props
}) {
  return (
    <Flex
      align="center"
      justify="center"
      w={w }
      h={ h}
      {...props}
    >
      <Spinner
        color="#2E3083"
        style={{ width: spinnerW , height: spinnerH}}
      />
    </Flex>
  );
}
