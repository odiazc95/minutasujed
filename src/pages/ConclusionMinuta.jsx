import { ArrowUturnLeftIcon, DocumentIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { Button, Divider, Icon, Title } from "@tremor/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditText from "../components/rich_text";
import Swal from "sweetalert2";
import axios from "axios";


const ConclusionMinuta = () => {

    const [ conclusion, setConclusion ] = useState('');
    const { idA } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/minutes/${idA}`);
                setConclusion(response?.data?.conclusion);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, []);

    const handleSubmit = async() => {
        if ( conclusion === '' ) return;

        try {
            const response = await axios.put(`http://localhost:3001/minutes/${idA}`, {
                conclusion
            })

            if (response.status !== 200) {
                Swal.fire({
                    title: "Error!",
                    text: response.data.message,
                    icon: "error",
                    confirmButtonText: "Cool"
                  });
                return;
            }

            Swal.fire({
                title: "Minuta Guardada",
                text: "Los datos se han guardado",
                icon: "success",
                confirmButtonText: "Cool"
              }).then(() => {
                navigate(-1)
              });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error!",
                text: "Error al guardar los datos",
                icon: "error",
                confirmButtonText: "Cool"
              });
        }
    }


    return (
        <>
            <div className="flex justify-between">
                <Icon className='w-10 h-10 cursor-pointer' 
                    icon={ ArrowUturnLeftIcon } 
                    onClick={ () => navigate(-1) } 
                    variant='solid' 
                    color='red'
                    tooltip='Regresar'
                />

                <Button 
                    variant='primary'
                    color='red'
                    icon={ DocumentIcon }
                    iconPosition='right'
                    className="w-40"
                    tooltip="Subir PDF"
                >
                    PDF
                </Button>
            </div>

            <Title className="mt-4">Conclusiones de la reunion</Title>
            <Divider className="mt-2"/>
            {/* <textarea
                className='w-full mt-1 border-[1px] border-tremor-border rounded-tremor-default px-4 py-1 bg-white hover:bg-tremor-background-muted focus:ring-2 focus:ring-tremor-brand-muted focus:border-tremor-brand-subtle focus:outline-none
                shadow-tremor-input placeholder:text-tremor-content text-tremor-content-emphasis'
                label='Descripcion'
                name='descripcion'
                rows='7'
                placeholder='Descripcion'
                value={textAreaDescription}
                onChange={ (e) => setTextAreaDescription(e.target.value) }
            /> */}
            <EditText value={ conclusion } setValue={ setConclusion }/>

            <Button
                className='w-full mt-4'
                type='submit'
                color='green'
                icon={ PaperAirplaneIcon }
                iconPosition='right'
                onClick={ handleSubmit }
            >
                Guardar
            </Button>

        </>
    )

}

export default ConclusionMinuta;