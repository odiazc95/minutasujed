import { UserIcon } from "@heroicons/react/24/outline";
import { Card, Flex, Icon, Title, Text } from "@tremor/react";

const User = (props) =>{
    return(
        // <div className="usuario">
        //     <p className="text_usuarios"><strong>Nombre</strong>: {props.User.nombre}</p>
        //     <p className="text_usuarios"><strong>Cargo</strong>: {props.User.cargo}</p>
        //     <p className="text_usuarios"><strong>Email</strong>: {props.User.email}</p>
        // </div>
        <div className="w-full relative group">
            <div className="absolute inset-0.5 bg-indigo-500 rounded-lg blur opacity-0 group-hover:opacity-75 transition-opacity"></div>
            <Card className="w-full">
                <Flex className="space-x-4 flex-col lg:flex-row relative">
                    <Icon 
                        icon={ UserIcon }
                        size="xl"
                        variant="light"
                        color="indigo"
                    />
                    <div className="w-full">
                        <div className="flex justify-start items-center gap-2 mt-2">
                            <Title>Nombre:</Title>
                            <Text>{ props.User.nombre }</Text>
                        </div>
                        <div className="flex justify-start items-center gap-2 mt-2">
                            <Title>Cargo:</Title>
                            <Text>{ props.User.cargo }</Text>
                        </div>
                        <div className="flex justify-start items-center gap-2 mt-2">
                            <Title>Email:</Title>
                            <Text>{ props.User.email }</Text>
                        </div>
                    </div>
                </Flex>
            </Card>
        </div>
    )
}

export default User;