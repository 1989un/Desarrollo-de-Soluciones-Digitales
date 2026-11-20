
import { useState, useEffect } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  TextInput
} from 'flowbite-react'

import { Pencil } from 'lucide-react'

function App() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const[search, setSearch]=useState("");

  const[modal, setModal]=useState(false);
  const[editContact, setEditContact]=useState(null);

  const [formData, setFormData] = useState({
  firstname: '',
  lastname: '',
  email: '',
  company: '',
  phone: ''
})

  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/contacts'
        )

        if (!response.ok) {
          throw new Error('No se pudieron obtener los contactos')
        }

        const data = await response.json()
        setContacts(data.results)

      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    getContacts()
  }, [])

  const filteredContacts = contacts.filter((contact) => {
  const firstName = contact.properties.firstname || ''
  const lastName = contact.properties.lastname || ''
  const email = contact.properties.email || ''

  const fullName = `${firstName} ${lastName}`

  return (
    fullName.toLowerCase().includes(search.toLowerCase()) ||
    email.toLowerCase().includes(search.toLowerCase())
  )


})


const handleSave = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/contacts/${editContact.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }
    )

    if (!response.ok) {
      throw new Error('No se pudieron guardar los cambios')
    }

    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === editContact.id
          ? {
              ...contact,
              properties: {
                ...contact.properties,
                ...formData
              }
            }
          : contact
      )
    )



    setModal(false)

  } catch (error) {
    console.error(error.message)
  }
}


const openEditModal = (contact) => {
  setEditContact(contact)

  setFormData({
    firstname: contact.properties.firstname || '',
    lastname: contact.properties.lastname || '',
    email: contact.properties.email || '',
    company: contact.properties.company || '',
    phone: contact.properties.phone || ''
  })

  setModal(true)
}
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Encabezado */}
      <header className="bg-white border-b border-slate-200 px-8 py-6">
        <h1 className="text-2xl font-bold text-slate-800">
          HubSpot CRM Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Gestión de contactos empresariales
        </p>
      </header>

      {/* Contenido principal */}
      <main className="p-8">

        <h2 className="mb-6 text-xl font-semibold text-slate-800">
          Contactos
        </h2>

        {loading && (
          <p className="text-slate-500">Cargando contactos...</p>
        )}

        {error && (
          <p className="text-red-600">Error: {error}</p>
        )}

        {!loading && !error && (
          <section className="rounded-xl bg-white p-6 shadow-sm">

         

            <div className="mb-5 flex items-center justify-between gap-4">

            <input type="text" placeholder="" value={search} 
            onChange={(e)=>setSearch(e.target.value)}
            className='w-full max-w-sm rounded-lg border 
            border-slate-300 px-4 py-2 outline-none focus:border-blue-500'/>

            <p className="font-medium text-slate-600">
              Total de contactos: {filteredContacts.length}
            </p>
          </div>

            <div className="overflow-x-auto">

              <table className="w-full text-left text-sm">

                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Nombre</th>
                    <th className="px-5 py-4 font-semibold">Apellido</th>
                    <th className="px-5 py-4 font-semibold">Email</th>
                    <th className="px-5 py-4 font-semibold">Empresa</th>
                    <th className="px-5 py-4 font-semibold">Teléfono</th>
                    <th className="px-5 py-4 font-semibold">Acciones</th>
                    
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">

              
                  { filteredContacts.length > 0 ?(          
                    filteredContacts.map((contact) => (
                    <tr /*onClick={() => {setEditContact(contact)
                                        setModal(true)}  } */ /*onClick={() => openEditModal(contact)}
                      key={contact.id}
                      className="hover:bg-slate-50 transition-colors"*/
                    >
                      <td className="px-5 py-4">
                        {contact.properties.firstname}
                      </td>

                      <td className="px-5 py-4">
                        {contact.properties.lastname}
                      </td>

                      <td className="px-5 py-4">
                        {contact.properties.email}
                      </td>

                      <td className="px-5 py-4">
                        {contact.properties.company}
                      </td>

                      <td className="px-5 py-4">
                        {contact.properties.phone || '—'}
                      </td>
                      <td className="px-5 py-4">
                        <button
                        onClick={() => openEditModal(contact)}
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={18} /> Editar
                      </button>
                      </td>
                    </tr>
                    ))): (
                      <tr>
                        <td colSpan="5" className="py-6 text-center text-slate-500">
                          No se encontraron contactos.
                        </td>
                      </tr>
                    )

                    
                  }

                
                </tbody>
              </table>

            </div>

            <Modal show={modal} onClose={() => setModal(false)}>
              <ModalHeader>
                Editar contacto
              </ModalHeader>

              <ModalBody>
                {editContact && (
                  <div className="space-y-4">

                    <div>
                      <Label htmlFor="firstname">Nombre</Label>
                      <TextInput
                        id="firstname"
                        defaultValue={editContact.properties.firstname || ''}
                         onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstname: e.target.value
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="lastname">Apellido</Label>
                      <TextInput
                        id="lastname"
                        defaultValue={editContact.properties.lastname || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            lastname: e.target.value
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Correo electrónico</Label>
                      <TextInput
                        id="email"
                        defaultValue={editContact.properties.email || ''}
                         onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="company">Empresa</Label>
                      <TextInput
                        id="company"
                        defaultValue={editContact.properties.company || ''}
                         onChange={(e) =>
                        setFormData({
                          ...formData,
                          company: e.target.value
                        })
                      }
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Teléfono</Label>
                      <TextInput
                        id="phone"
                        defaultValue={editContact.properties.phone || ''}
                         onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value
                        })
                      }
                      />
                    </div>

                  </div>
                )}
              </ModalBody>

              <ModalFooter>
                <Button color="gray" onClick={() => setModal(false)}>
                  Cancelar
                </Button>

                <Button onClick={handleSave}>
                  Guardar cambios
                </Button>
              </ModalFooter>
            </Modal>
          </section>
        )}

      </main>
    </div>

  


  )
}

export default App
