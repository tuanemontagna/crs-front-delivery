// import { Dialog, Input, Button } from "@chakra-ui/react";
// import { useState, useEffect } from "react";

// export default function EditarAdressDialog({ endereco, onClose, onSave }) {
//     const [form, setForm] = useState({
//         zipCode: '',
//         state: '',
//         // city: '',
//         district: '',
//         street: '',
//         numberForget: ''
//     });

//     useEffect(() => {
//         if (endereco) {
//             setForm({
//                 zipCode: endereco.zipCode || '',
//                 state: endereco.state || '',
//                 city: endereco.city || '',
//                 district: endereco.district || '',
//                 street: endereco.street || '',
//                 numberForget: endereco.numberForget || ''
//             });
//         }
//     }, [endereco]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setForm((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async () => {
//         const { zipCode, state, city, district, street, numberForget } = form;
//         if (
//             !zipCode.trim() ||
//             !state.trim() ||
//             !city.trim() ||
//             !district.trim() ||
//             !street.trim() ||
//             !numberForget.trim()
//         ) return;

//         await onSave(form);
//         onClose();
//     };

//     if (!endereco) return null;

//     return (
//         <Dialog isOpen={!!endereco} onClose={onClose}>
//             <Dialog.Content>
//                 <Dialog.Header>Editar Endereço</Dialog.Header>
//                 <Dialog.Body display="flex" flexDirection="column" gap={2}>
//                     <Input placeholder="CEP" name="zipCode" value={form.zipCode} onChange={handleChange} />
//                     <Input placeholder="Estado" name="state" value={form.state} onChange={handleChange} />
//                     <Input placeholder="Cidade" name="city" value={form.city} onChange={handleChange} />
//                     <Input placeholder="Bairro" name="district" value={form.district} onChange={handleChange} />
//                     <Input placeholder="Rua" name="street" value={form.street} onChange={handleChange} />
//                     <Input placeholder="Número" name="numberForget" value={form.numberForget} onChange={handleChange} />
//                 </Dialog.Body>
//                 <Dialog.Footer display="flex" gap={2}>
//                     <Button variant="outline" onClick={onClose}>Cancelar</Button>
//                     <Button colorScheme="orange" onClick={handleSubmit}>Salvar</Button>
//                 </Dialog.Footer>
//             </Dialog.Content>
//         </Dialog>
//     );
// }