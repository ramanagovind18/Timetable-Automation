import axios from 'axios';
import { useForm } from 'react-hook-form';

const UserLoginForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post('/login/', data);
      console.log('Login data sent successfully!');
    } catch (error) {
      console.error('Error sending login data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Username" {...register('username')} />
      <input type="password" placeholder="Password" {...register('password')} />
      <button type="submit">Login</button>
    </form>
  );
};

export default UserLoginForm;
