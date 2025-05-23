// import { useState } from "react";
// import { Dialog, Button, Input, CloseButton } from "@chakra-ui/react";

// export default function CreateAdressDialog({ isOpen, onClose, onSave }) {
//     const [formData, setFormData] = useState({
//         zipCode: "",
//         state: "",
//         city: "",
//         street: "",
//         district: "",
//         numberForget: ""
//     });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async () => {
//         const { zipCode, state, city, street, district, numberForget } = formData;
//         if
//             !zipCode.trim() ||
//             !state.trim() ||
//             !city.trim() ||
//             !street.trim() ||
//             !district.trim() ||
//             !numberForget.trim()
//         ) return;
//         await onSave(formData);
//         setFormData({
//             zipCode: "",
//             state: "",
//             city: "",
//             street: "",
//             district: "",
//             numberForget: ""
//         });
//         onClose();
//     };

//     return (
//         <Dialog isOpen={isOpen} onClose={onClose}>
//             <Dialog.Overlay />
//             <Dialog.Content>
//                 <Dialog.Header>
//                     <Dialog.Title>Novo Endereço</Dialog.Title>
//                 </Dialog.Header>
//                 <Dialog.Body>
//                     <Input
//                         name="zipCode"
//                         value={formData.zipCode}
//                         onChange={handleChange}
//                         focusBorderColor="#eb722b"
//                         placeholder="CEP"
//                         mb={2}
//                     />
//                     <Input
//                         name="state"
//                         value={formData.state}
//                         onChange={handleChange}
//                         focusBorderColor="#eb722b"
//                         placeholder="Estado"
//                         mb={2}
//                     />
//                     <Input
//                         name="city"
//                         value={formData.city}
//                         onChange={handleChange}
//                         focusBorderColor="#eb722b"
//                         placeholder="Cidade"
//                         mb={2}
//                     />
//                     <Input
//                         name="street"
//                         value={formData.street}
//                         onChange={handleChange}
//                         focusBorderColor="#eb722b"
//                         placeholder="Rua"
//                         mb={2}
//                     />
//                     <Input
//                         name="district"
//                         value={formData.district}
//                         onChange={handleChange}
//                         focusBorderColor="#eb722b"
//                         placeholder="Bairro"
//                         mb={2}
//                     />
//                     <Input
//                         name="numberForget"
//                         value={formData.numberForget}
//                         onChange={handleChange}
//                         focusBorderColor="#eb722b"
//                         placeholder="Número"
//                         mb={2}
//                     />
//                 </Dialog.Body>
//                 <Dialog.Footer>
//                     <Button variant="outline" mr={3} onClick={onClose}>
//                         Cancelar
//                     </Button>
//                     <Button colorScheme="orange" onClick={handleSubmit}>
//                         Salvar
//                     </Button>
//                 </Dialog.Footer>
//                 <CloseButton size="sm" onClick={onClose} position="absolute" top={2} right={2} />
//             </Dialog.Content>
//         </Dialog>
//     );
// }