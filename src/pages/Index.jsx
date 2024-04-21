import React, { useState } from "react";
import { Box, Button, Text, VStack, Image, useToast } from "@chakra-ui/react";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";

const choices = {
  rock: { name: "Rock", component: FaHandRock, beats: "scissors" },
  paper: { name: "Paper", component: FaHandPaper, beats: "rock" },
  scissors: { name: "Scissors", component: FaHandScissors, beats: "paper" },
};

const Index = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const toast = useToast();

  const handleChoice = (choice) => {
    const chosen = choices[choice];
    setUserChoice(chosen);
    const computerChoice = generateComputerChoice();
    setComputerChoice(computerChoice);
    determineWinner(chosen, computerChoice);
  };

  const generateComputerChoice = () => {
    const randomChoice = Object.keys(choices)[Math.floor(Math.random() * 3)];
    return choices[randomChoice];
  };

  const determineWinner = (user, computer) => {
    if (user.name === computer.name) {
      setResult("It's a draw!");
    } else if (user.beats === computer.name.toLowerCase()) {
      setResult("You win!");
    } else {
      setResult("You lose!");
    }
    toast({
      title: result,
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={4}>
      <Text fontSize="2xl" fontWeight="bold">
        Rock Paper Scissors
      </Text>
      <Box>
        {Object.keys(choices).map((key) => {
          const IconComponent = choices[key].component;
          return (
            <Button key={key} onClick={() => handleChoice(key)} leftIcon={<IconComponent />}>
              {choices[key].name}
            </Button>
          );
        })}
      </Box>
      <Box>
        {userChoice && <Text>You chose: {userChoice.name}</Text>}
        {computerChoice && <Text>Computer chose: {computerChoice.name}</Text>}
        <Text fontSize="xl">{result}</Text>
      </Box>
      <Image src="https://images.unsplash.com/photo-1522032662723-6649e699785f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxyb2NrJTIwcGFwZXIlMjBzY2lzc29ycyUyMGdhbWV8ZW58MHx8fHwxNzEzNjg4MTQ5fDA&ixlib=rb-4.0.3&q=80&w=1080" />
    </VStack>
  );
};

export default Index;
