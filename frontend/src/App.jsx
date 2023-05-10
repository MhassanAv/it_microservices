import {
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
  VStack,
  Input,
  Button,
  Text,
  ButtonGroup,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  chakra,
} from "@chakra-ui/react";
import { BsTranslate, BsFiletypePdf } from "react-icons/bs";
import { MdLanguage } from "react-icons/md";
import axios from "axios";
import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [lang, setLang] = useState("ar");
  const [isLoading, setIsLoading] = useState(false);

  const handle1 = () => {
    axios
      .post("http://localhost:3000/data", {
        text: text,
        lang: lang,
      })
      .then(function (response) {
        setTranslated(response.data.text);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handle2 = () => {
    axios
      .get("http://localhost:4000/pdf")
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Center
      w="full"
      h="100vh"
      bgImage={"bg.jpg"}
      bgPos={"center"}
      bgSize={"cover"}
    >
      <Center
        w="100%"
        h="100%"
        bgGradient={"linear(to-t, teal.500, blackAlpha.500)"}
      >
        <Card align={"center"} minW="30vw" rounded="2rem" justify={"center"}>
          <CardHeader>
            <Heading
              fontSize="1.5rem"
              fontWeight={"bold"}
              textTransform={"uppercase"}
              color={"teal"}
            >
              Translator
            </Heading>
          </CardHeader>
          <CardBody
            w="full"
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDir="column"
            gap="2rem"
          >
            <VStack>
              <Heading fontSize="1.2rem">Your Text Here</Heading>
              <HStack>
                <Input
                  w="full"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Your text here"
                  flex="3"
                />
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<MdLanguage />}
                    colorScheme="teal"
                  >
                    {lang}
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => {
                        setLang("ar");
                      }}
                    >
                      Arabic
                    </MenuItem>
                    <MenuItem onClick={() => setLang("de")}>German</MenuItem>
                    <MenuItem onClick={() => setLang("es")}>Spanish</MenuItem>
                    <MenuItem onClick={() => setLang("it")}>Italian</MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
            </VStack>
            <VStack>
              <Heading fontSize="1.2rem">Translation</Heading>
              <Text>{translated}</Text>
            </VStack>
            <ButtonGroup>
              <Button
                size={"lg"}
                rightIcon={<BsFiletypePdf />}
                colorScheme="teal"
                onClick={handle2}
              >
                PDF
              </Button>
              <chakra.div
                w="100%"
                onClick={() => text !== "" && setIsLoading(true)}
              >
                <Button
                  size={"lg"}
                  colorScheme="gray"
                  color="teal"
                  onClick={handle1}
                  rightIcon={<BsTranslate />}
                  isLoading={isLoading}
                  loadingText="Translating"
                >
                  Translate
                </Button>
              </chakra.div>
            </ButtonGroup>
          </CardBody>
        </Card>
      </Center>
    </Center>
  );
}

export default App;
