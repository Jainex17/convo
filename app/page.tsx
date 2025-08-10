'use client'

import { Chat } from '@/components/Chat'
import MessageInput from '@/components/MessageInput'

export default function Page() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Chat />      
      <MessageInput />
    </div>
  )
}