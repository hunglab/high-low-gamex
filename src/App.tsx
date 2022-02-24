import { Box, Flex, Center, Heading, Button, Stack } from "@chakra-ui/react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

/*
## Requirements:
  - Complete the High-Low Game
    - Game flow
      1. Start a new game by pressing "Start Game" button, and then hide the button
      2. The "?" in the left card will become a randomly generated number A
      3. Two buttons: "Higher" and "Lower" will show underneath the right card for user to choose upon
      4. After user clicked the “Higher” or “Lower” button, the two buttons will disappear
      5. The "?" in the right card will become a randomly generated number B
      6. Show the game result and “Play Again” button under the cards after comparing the high or low of the two numbers (A & B) and user’s choice
      7. After user clicked the “Play Again” button, the number B in the right card will change back to "?"
      8. Number A in the left card will be regenerated, return to step 3 to continue a new game
    - Game rule
      - The number A and B are always randomly generated between 1~10
      - When B > A and user chose `Higher`，the game result is WIN
      - When B > A and user chose `Lower`，the game result is LOSE
      - When B < A and user chose `Higher`，the game result is LOSE
      - When B < A and user chose `Lower`，the game result is WIN
      - When B = A and user chose `Higher`，the game result is LOSE
      - When B = A and user chose `Lower`，the game result is LOSE

## Bonus:
  - Please refactor the component
  - Complete the code with XState
  - document：https://xstate.js.org/docs/
*/
const App = () => {
  return (
    <Box bgColor="#f3f3f3" h="100vh">
      <Center pt="120px">
        <Flex w="400px" px="64px" direction="column" align="center">
          <Flex mb="64px">
            <Heading mr="16px" fontSize="36px" color="twitter.500">
              High
            </Heading>
            <Heading fontSize="36px" color="facebook.500">
              Low
            </Heading>
          </Flex>
          <Flex w="full" justify="space-between">
            <Flex maxW="120px" flex={1}>
              <Center
                w="full"
                h="150px"
                px="24px"
                py="16px"
                bgColor="white"
                borderRadius="md"
                boxShadow="lg"
                flex={1}
              >
                <Heading fontSize="54px" color="gray.500">
                  ?
                </Heading>
              </Center>
            </Flex>
            <Flex maxW="120px" flex={1} direction="column">
              <Center
                w="full"
                h="150px"
                px="24px"
                py="16px"
                bgColor="white"
                borderRadius="md"
                boxShadow="lg"
              >
                <Heading fontSize="54px" color="blue.500">
                  ?
                </Heading>
              </Center>

              {/* `Higher` and `Lower` buttons UI */}
              {/* <Button
                mt="32px"
                colorScheme="twitter"
                leftIcon={<RiArrowUpSLine />}
                isFullWidth
              >
                Higher
              </Button>
              <Button
                mt="8px"
                colorScheme="facebook"
                leftIcon={<RiArrowDownSLine />}
                isFullWidth
              >
                Lower
              </Button> */}
            </Flex>
          </Flex>

          <Box mt="64px">
            <Button
              colorScheme="blue"
              onClick={() => {
                // TODO: Start a new game
              }}
            >
              Start Game
            </Button>
          </Box>

          {/* Game result UI */}
          {/* <Stack mt="24px" spacing="16px">
            <Heading color="twitter.300" align="center">
              WIN!
            </Heading>
            <Heading color="red.300" align="center">
              LOSE!
            </Heading>

            <Button
              colorScheme="blue"
              onClick={() => {
                // TODO: Clear game result and start a new game
              }}
            >
              Play Again
            </Button>
          </Stack> */}
        </Flex>
      </Center>
    </Box>
  );
};

export default App;
