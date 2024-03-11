import { Spinner } from "@chakra-ui/react";


const Loading = ({ size = 50, style }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        ...style,
      }}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="sm"
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      />
    </div>
  );
};

export default Loading;