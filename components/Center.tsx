import { useState, useEffect } from "react"
import {ChevronDownIcon} from "@heroicons/react/outline"
import {useSession} from "next-auth/react"
import { shuffle } from 'lodash'

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
  const [color, setColor] = useState(null);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [])

  return (
    <div className="flex-grow text-white">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-black opacity-90 hover:opacity-80 space-x-3 p-1 pr-2 cursor-pointer rounded-full">
          <img alt="" src={session?.user.image} className="h-10 rounded-full" />
          <p>{session?.user.name}</p>
          <ChevronDownIcon className="h-6" />
        </div>
      </header>

      <section className={`flex items-end h-80 bg-gradient-to-b ${color} to-black space-x-7 p-8`}></section>

    </div>
)}

export default Center
