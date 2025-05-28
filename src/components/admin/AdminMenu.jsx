import { Button, Menu, Portal } from "@chakra-ui/react"
import { CgProfile } from "react-icons/cg";

export default function ProfileMenu() {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
         <Button
            bg="white"
            border="2px solid #eb722b"
            _hover={{ bg: "gray.100" }}
            _active={{ bg: "gray.200" }}
            borderRadius="full"
            w="50px"
            h="50px"
            p={0}
            >
          <CgProfile size={24} color="#eb722b" />
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content bg="white" >
            <Menu.Item 
            _hover={{ bg: "white" }} 
            color="#eb722b" 
            onClick={() => window.location.href = "/user/profile"}
            >
            Perfil
            </Menu.Item>

            <Menu.Item 
            _hover={{ bg: "white" }} 
            color="#eb722b" 
            onClick={() => window.location.href = "/admin/configuracoes"}
            >
            Configurações
            </Menu.Item>

            <Menu.Item 
            _hover={{ bg: "white" }} 
            color="#eb722b" 
            onClick={() => window.location.href = "/login"}
            >
            Sair
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}
