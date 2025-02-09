import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import ListaNoticias from "./ListaNoticias";
import { useForm } from 'react-hook-form';


const Formulario = () => {

    const [news, setNews] = useState([]);

    const  {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm ();

    const onSubmit = async(datos) => {
        console.log(datos.category);
        try {
            const response = await fetch(`https://newsapi.org/v2/top-headlines?country=ar&category=${datos.category}&apiKey=bc8a03b7e36246cda0d84435c3c7a263`);
            const data = await response.json();
            setNews(data.articles);
        } catch (error) {
            console.log(error);
        }
    }
    
  return (
    <>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className='mb-3' controlId='formCategory'>
                <Form.Label>Buscar por categoria</Form.Label>
                <Form.Select aria-label="Seleccione una categoria:" {...register('category',{required:'Debe seleccionar una categoria', })}>
                <option value=''>Seleccione una opcion:</option>
                <option value="science">Ciencia</option>
                <option value="sports">Deportes</option>
                <option value="entertainment">Entretenimiento</option>
                <option value="general">General</option>
                <option value="business">Negocios</option>
                <option value="health">Salud</option>
                <option value="technology">Tecnologia</option>
                </Form.Select>
                <Form.Text className="text-danger">
                    {errors.category?.message}
            </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                Enviar
            </Button>
        </Form>
        <ListaNoticias news={news}></ListaNoticias>
    </>
  )
}

export default Formulario