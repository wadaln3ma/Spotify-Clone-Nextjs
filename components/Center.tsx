import { useState, useEffect } from "react"
import {ChevronDownIcon} from "@heroicons/react/outline"
import {useSession} from "next-auth/react"
import { shuffle } from 'lodash'
import { useRecoilState, useRecoilValue } from "recoil"
import { playlistIdState, playlistState } from "../atoms/playlistAtom"
import useSpotify from "../hooks/useSpotify"

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
]

const Center = ()=>{

  const { data: session } = useSession()
  const [color, setColor] = useState(null)
  const playlistId = useRecoilValue(playlistIdState)
  const spotifyApi = useSpotify()
  const [playlist, setPlaylist] = useRecoilState(playlistState)

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistId])

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        console.log("data", data)
        setPlaylist(data.body)
      })
      .catch((err) => console.log("error", err))
  }, [spotifyApi, playlistId])


  return (
    <div className="flex-grow text-white">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-black opacity-90 hover:opacity-80 space-x-3 p-1 pr-2 cursor-pointer rounded-full">
          <img alt="" src={session?.user.image} className="h-10 rounded-full" />
          <p>{session?.user.name}</p>
          <ChevronDownIcon className="h-6" />
        </div>
      </header>

      <section className={`flex items-end h-80 bg-gradient-to-b ${color} to-black space-x-7 p-8`}>
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0]?.url}
          alt=""
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>

    </div>
)}

export default Center
