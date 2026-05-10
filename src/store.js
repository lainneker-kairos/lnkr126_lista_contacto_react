export const initialStore = () => {
  return {
    contacts: [] 
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'set_contacts':
      return {
        ...store, 
        contacts: action.payload 
      };

    // 2. ELIMINAR//
    case 'delete_contact':
      return {
        ...store,
        contacts: store.contacts.filter((c) => c.id !== action.payload)
      };

    // 3. ACTUALIZAR//
    case 'update_contact':
      return {
        ...store,
        contacts: store.contacts.map((c) => 
          c.id === action.payload.id ? action.payload : c
        )
      };
    //AGREGAR CONTACTO
      case 'add_contact':
      return {
        ...store,
        contacts: [...store.contacts, action.payload]
      };

    default:
      throw Error('Unknown action: ' + action.type);
  }
}

