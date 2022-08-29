import './global.css'
import './styles.css'

import { useForm } from "react-hook-form"; 
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";

const schema = yup.object({
	customize_URL: yup.string().required("Esse campo é obrigatório").min(5, "Min de 10 caracteres").max(15, "Max de 15 caracteres"),
	title: yup.string().required("Esse campo é obrigatório").max(25, "Max de 25 caracteres").min(4, "Min de 4 caracteres "),
	description: yup.string().required("Esse campo é obrigatório").max(150, "Max de 150 caracteres").min(20, "Min de 20 caracteres"),
	content: yup.string().required("Esse campo é obrigatório").min(20, "Min de 20 caracteres")
	
}).required();

function App() {

	const { register, handleSubmit, formState:{ errors } } = useForm({
		resolver: yupResolver(schema)
	})

	const onSubmitForm = data => fetch('http://localhost:3000/posts',  {
		method: "POST",
		body: JSON.stringify({
			data
		}),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		}
	})
	.then((response) => response.json())
	.then((data) => console.log(data))
	.catch((err)  => console.log(err))


	return (
		<div className="app">
			<form  onSubmit={handleSubmit(onSubmitForm)}>
				<h1>Criar publicação</h1>

				<div className='field' >
					<label className='label'>Customize URL</label>
					<input type="text" {...register("customize_URL")}/>
					<p>{errors.customize_URL?.message}</p>
				</div>

				<div className='field' >
					<label className='label'>Título</label>
					<input type="text" {...register("title")}/>
					<p>{errors.title?.message}</p>
				</div>

				<div className='field' >
					<label>Descrição</label>
					<input type="text" {...register("description")}/>
					<p>{errors.description?.message}</p>
				</div>

				<div className='field' >
					<label>Conteúdo</label>
					<input type="text" {...register("content")}/>
					<p>{errors.content?.message}</p>
				</div>

				<button type='submit'>PUBLICAR</button>
			</form>
		</div>
	);
}

export default App;
