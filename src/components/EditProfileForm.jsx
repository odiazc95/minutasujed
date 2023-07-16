import { useEffect, useState } from "react";
import { Button, Title, TextInput, Subtitle } from "@tremor/react"
import { ArchiveBoxXMarkIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

export const EditProfileForm = ({ userData, setIsEditOpen }) => {

    const [ userFormData, setUserFormData ] = useState({
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        email: '',
        cargo: '',
        area: ''
    });

    useEffect(() => {
        setUserFormData({
            nombre: userData?.nombre,
            apellido_paterno: userData?.apellido_paterno,
            apellido_materno: userData?.apellido_materno,
            email: userData?.email,
            cargo: userData?.cargo,
            area: userData?.area
        })
    }, [ userData ])

    const onHanldeInputChange = (e) => {
        setUserFormData({
            ...userFormData,
            [e.target.name]: e.target.value
        })
    }

    const onSendForm = (e) => {
        e.preventDefault();
        setIsEditOpen(false);
    }

    return (

        <>
            <Title>Edita tu perfil</Title>
            <form className="flex flex-col gap-4 mt-5" onSubmit={onSendForm}>

                <div className="flex flex-col md:flex-row gap-3">
                    <div className="w-full">
                        <Subtitle> Nombre </Subtitle>
                        <TextInput
                            label='Nombre'
                            placeholder='Nombre'
                            name="nombre"
                            value={userFormData.nombre}
                            onChange={onHanldeInputChange}
                        />
                    </div>

                    <div className="w-full">
                        <Subtitle> Apellido Paterno </Subtitle>
                        <TextInput
                            label='Apellido Paterno'
                            placeholder='Apellido Paterno'
                            value={userFormData.apellido_paterno}
                            onChange={onHanldeInputChange}
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-3">
                    <div className="w-full">
                        <Subtitle> Apellido Materno </Subtitle>
                        <TextInput
                            label='Apellido Materno'
                            placeholder='Apellido Materno'
                            name="apellido_materno"
                            value={userFormData.apellido_materno}
                            onChange={onHanldeInputChange}
                        />

                    </div>

                    <div className="w-full">
                        <Subtitle> Email </Subtitle>
                        <TextInput
                            label='Email'
                            placeholder='Email'
                            type="email"
                            name="email"
                            value={userFormData.email}
                            onChange={onHanldeInputChange}
                        />
                    </div>


                </div>

                <div className="flex flex-col md:flex-row gap-3">
                    <TextInput
                        label='Cargo'
                        placeholder='Cargo'
                        name="cargo"
                        value={userFormData.cargo}
                        onChange={onHanldeInputChange}
                    />

                    <TextInput
                        label='Area'
                        placeholder='Area'
                        name="area"
                        value={userFormData.area}
                        onChange={onHanldeInputChange}
                    />
                </div>

                <div className="w-full flex flex-col items-center gap-3 mt-5">
                    <Button
                        color="red"
                        className="w-full"
                        onClick={() => setIsEditOpen(false)}
                        variant="secondary"
                        icon={ ArchiveBoxXMarkIcon }
                        iconPosition='right'
                    >
                        Cancelar
                    </Button>

                    <Button
                        variant='primary'
                        icon={ PaperAirplaneIcon }
                        iconPosition='right'
                        color="green"
                        className="w-full"
                        type="submit"
                    >
                        Guardar
                    </Button>
                </div>

            </form>
        </>
    )

}