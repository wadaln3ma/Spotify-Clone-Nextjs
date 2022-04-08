import { getProviders, signIn } from 'next-auth/react'
import Image from 'next/image';
import spotifyLogo from '../assets/spotify-logo.webp'

const Login = ({ providers }) => {
  return (
    <div
      className="flex flex-col w-full min-h-screen items-center justify-center bg-black text-white"
    >
      <div className="relative w-52 mb-5">
        <Image alt="logo" src={spotifyLogo} objectFit="cover" className="absolute"/>
      </div>
      {Object.values(providers).map(provider =>(
        <div key={provider.id}>
          <button className="bg-[#18D860] text-white rounded-full p-5"
            onClick={()=> signIn(provider.id, { callbackUrl: '/' })}>
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Login

export const getServerSideProps = async ()=> {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  };
}
