import {
  Box,
  Flex,
  Center,
  Heading,
  Button,
  Stack,
  Text,
} from "@chakra-ui/react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { useMachine } from "@xstate/react";
import { createMachine, interpret, assign } from "xstate";

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

type Context = {
  count: number;
  text_a?: any;
  text_b?: any;
  win?: any;
  chosen_number?: number;
};

const gameMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5RQIYFswDoCWA7FAxgC7YBuYAxAMoAqAggEo2KgAOA9rNie7iyAA9EARgAcAFkwBOCQGYA7ADZlAJmGzRAGhABPEVMXSpx44oWKArAAYVAX1vbUGTIRLlMsImFbCKAYQAJAHkgqgBRAIBJAHEA-g4uHj4kQURxUStpOXlhHNFhKXkLRW09BHE1IxNFFSVRRSl7R3QsVzIsT29fQJDwgBkggHV4zm5sXn4hcoys8QVcsQKikt1EWWEVTCttndrxeQPippAnVuJ2jy9WFQo6aLpIgDkRxPHk0CmLFU2LdZVZRRWKQA8TCFZlMFSKqmbYqIHCdL2BwgXDsCBwfinHD4c7kF5jCYpKYVUqIb7CaEyMz5eTrY5YtruTo+fFJSZrWSSGRzIoqUT8hQWUkIcmU+oaXKyKwWektFy4jpXFSst7shCWWSYHniAxSCwbYQFYWyWRQnUmKS1X7bcSy5yMsAqwkfNbCTLcwV8gVFYUGMXbN3iCzyW3I05O96pBBiYUqUP2IA */
  createMachine<Context>(
    {
      context: {
        count: 0,
        text_a: 0,
        text_b: 0,
        win: 0,
        chosen_number: 0,
      },
      id: "game",
      initial: "inactive",
      states: {
        inactive: {
          on: {
            START: {
              actions: "start",
              target: "#game.active.step1",
            },
          },
        },
        active: {
          initial: "step1",
          states: {
            step1: {
              on: {
                CHOOSEHIGH: {
                  actions: ["choose_high", "win"],
                  target: "#game.active.step2",
                },
                CHOOSELOW: {
                  actions: ["choose_low", "win"],
                  target: "#game.active.step2",
                },
              },
            },
            step2: {
              on: {
                AGAIN: {
                  actions: ["random", "reset"],
                  target: "#game.active.step1",
                },
              },
            },
          },
        },
      },
    },
    {
      actions: {
        start: assign({
          text_a: (context) => Math.floor(Math.random() * (10 - 1 + 1)) + 1,
          text_b: (context) => Math.floor(Math.random() * (10 - 1 + 1)) + 1,
        }),
        choose_high: assign({
          chosen_number: (context) => 1,
        }),
        choose_low: assign({
          chosen_number: (context) => 0,
        }),
        reset: assign({
          text_a: (context) => Math.floor(Math.random() * (10 - 1 + 1)) + 1,
          text_b: (context) => Math.floor(Math.random() * (10 - 1 + 1)) + 1,
          chosen_number: (context) => 0,
          win: (context) => 0,
        }),
        win: assign({
          // - When B > A and user chose `Higher`，the game result is WIN
          // - When B > A and user chose `Lower`，the game result is LOSE
          // - When B < A and user chose `Higher`，the game result is LOSE
          // - When B < A and user chose `Lower`，the game result is WIN
          // - When B = A and user chose `Higher`，the game result is LOSE
          // - When B = A and user chose `Lower`，the game result is LOSE

          win: (context) => {
            if (
              context.text_b - context.text_a > 0 &&
              context.chosen_number == 1
            ) {
              return 1;
            } else if (
              context.text_b - context.text_a > 0 &&
              context.chosen_number == 0
            ) {
              return 0;
            } else if (
              context.text_b - context.text_a < 0 &&
              context.chosen_number == 1
            ) {
              return 0;
            } else if (
              context.text_b - context.text_a < 0 &&
              context.chosen_number == 0
            ) {
              return 1;
            } else if (context.text_b - context.text_a == 0) {
              return 0;
            }
          },
        }),
      },
    }
  );

const counterService = interpret(gameMachine)
  .onTransition((state) => console.log(state.context.text_a))
  .start();

const ChooseValueButton = () => {
  return (
    <>
      <Flex>
        <Button
          mt="32px"
          colorScheme="twitter"
          leftIcon={<RiArrowUpSLine />}
          isFullWidth>
          Higher
        </Button>
        <Button
          mt="8px"
          colorScheme="facebook"
          leftIcon={<RiArrowDownSLine />}
          isFullWidth>
          Lower
        </Button>
      </Flex>
    </>
  );
};

const App = () => {
  const [current, send] = useMachine(gameMachine);
  const active = current.matches("active");
  const inactive = current.matches("inactive");
  const step1 = current.matches("active.step1");
  const step2 = current.matches("active.step2");
  const { count } = current.context;
  const { text_a } = current.context;
  const { text_b } = current.context;
  const { chosen_number } = current.context;
  const { win } = current.context;

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
                flex={1}>
                <Heading fontSize="54px" color="gray.500">
                  {inactive ? "?" : text_a}
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
                boxShadow="lg">
                <Heading fontSize="54px" color="blue.500">
                  {inactive ? "?" : step2 ? text_b : "?"}
                </Heading>
              </Center>
              <Button
                mt="32px"
                colorScheme="twitter"
                display={step1 ? "flex" : "none"}
                leftIcon={<RiArrowUpSLine />}
                onClick={() => {
                  send("CHOOSEHIGH");
                }}
                isFullWidth>
                Higher
              </Button>
              <Button
                mt="8px"
                colorScheme="facebook"
                display={step1 ? "flex" : "none"}
                leftIcon={<RiArrowDownSLine />}
                onClick={() => {
                  send("CHOOSELOW");
                }}
                isFullWidth>
                Lower
              </Button>
            </Flex>
          </Flex>

          <Box mt="64px">
            <Button
              colorScheme="blue"
              onClick={() => {
                send("START");
              }}
              display={active ? "none" : "flex"}>
              Start Game
            </Button>
          </Box>

          {/* Game result UI */}
          <Stack mt="24px" spacing="16px" display={step2 ? "flex" : "none"}>
            <Heading
              color="twitter.300"
              align="center"
              display={win > 0 ? "flex" : "none"}>
              WIN!
            </Heading>
            <Heading
              color="red.300"
              align="center"
              display={win <= 0 ? "flex" : "none"}>
              LOSE!
            </Heading>

            <Button
              colorScheme="blue"
              onClick={() => {
                send("AGAIN");
              }}>
              Play Again
            </Button>
          </Stack>
        </Flex>
      </Center>
    </Box>
  );
};

export default App;
