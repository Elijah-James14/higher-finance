import { logoutAction } from '@/lib/actions/user.actions';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
  const router = useRouter();
  const handleLogout = async () => {
    const loggedOut = await logoutAction();

    if (loggedOut) router.push('/signin');
  };
  return (
    <footer className='footer'>
      <div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
        <p className='text-xl font-bold text-gray-700'>{user?.name[0]}</p>
      </div>
      <div
        className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}
      >
        <h1 className='text-14 truncate font-semibold text-gray-800'>
          {user?.name}
        </h1>
        <p className='text-14 truncate font-normal text-gray-600'>
          {user?.email}
        </p>
      </div>
      <div className='footer_image' onClick={handleLogout}>
        <Image src='icons/logout.svg' alt='Higher Finance' fill />
      </div>
    </footer>
  );
};

export default Footer;
