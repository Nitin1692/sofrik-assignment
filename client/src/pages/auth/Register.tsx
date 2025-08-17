import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import API from '../../utils/api'
import { useNavigate, Link } from 'react-router-dom'

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  name: yup.string().required(),
})

export default function Register() {
  const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) })
  const navigate = useNavigate()

  const onSubmit = async (data: any) => {
    try {
      await API.post('/auth/register', data)
      navigate('/login')
    } catch (err: any) {
      alert(err.response?.data?.message || 'Register failed')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4">Register</h2>
        <input {...register('name')} placeholder="Name" className="border p-2 w-full mb-3" />
        <input {...register('email')} placeholder="Email" className="border p-2 w-full mb-3" />
        <input {...register('password')} type="password" placeholder="Password" className="border p-2 w-full mb-3" />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Register</button>
        <p className="mt-2 text-sm">Have account? <Link to="/login" className="text-blue-600">Login</Link></p>
      </form>
    </div>
  )
}