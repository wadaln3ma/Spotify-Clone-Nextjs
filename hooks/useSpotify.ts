import { useEffect } from "react"
import { signIn, useSession } from "next-auth/react"
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
  clienId : process.env.NEXT_AUTH_CLIENT_ID,
  clientSecref : process.env.NEXT_AUTH_CLIENT_SECRET,
})

const useSpotify = ()=>{
  const { data: session, status } = useSession()

  useEffect(()=>{
    if(session){
      if(session.error === "RefreshAccessTokenError"){
        signIn()
      }
      spotifyApi.setAccessTokon(session.user.accessToken)
    }
  }, [session])
  return spotifyApi
}

export default useSpotify
