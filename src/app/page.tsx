'use client';
import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'


import { SideBar } from '@/components/SideBar'
import { Button } from '@/components/ui/button'
import { IconLayoutSidebar } from '@/components/ui/icons'
import { Chat } from '@/types/Chat';
import { ChatArea } from '@/components/ChatArea';
import { Footer } from '@/components/Footer';
import { SideBarChatButton } from '@/components/SideBarChatButton';
import { DeleteAlertDialog } from '@/components/AlertDialog';
import chatApi from '@/services/api';
import { toast } from '@/components/ui/use-toast';
import { ChatMessage } from '@/types/ChatMessage';

async function getChatHistoryByUser() {

  const response = await chatApi.get<Chat[]>('/chat')

  return response.data
}

export default function Home() {
  const [open, setOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [chatList, setChatList] = useState<Chat[]>([])
  const [activeChatId, setActiveChatId] = useState<string>('')
  const [activeChat, setActiveChat] = useState<Chat>()
  const [deleteChat, setDeleteChat] = useState({ open: false, isClearHistory: false })

  useEffect(() => {
    getChatHistoryByUser().then(data => {
      setChatList(data)
      setActiveChatId(data[0].id)
    })
  }, [])

  useEffect(() => {
    setActiveChat(chatList?.find(item => item.id === activeChatId))
  }, [activeChatId, chatList])

  useEffect(() => {
    if (isLoading) handleSubmitMessage()
  }, [isLoading])

  const handleSubmitMessage = async () => {
    let newChatList = [...chatList]
    let chatIndex = newChatList.findIndex(item => item.id === activeChatId)

    if (chatIndex > -1) {
      const response = await chatApi.post<ChatMessage>('/chat', newChatList[chatIndex])

      if (response.data) {
        newChatList[chatIndex].messages.push(response.data)

      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        })
      }
    }

    setChatList(newChatList)
    setIsLoading(false)
  }


  const handleClearHistory = async () => {
    if (isLoading) return

    await chatApi.delete(`/chat/${activeChatId}?deleteAll=true`)
    setActiveChatId('')
    setChatList([])
  }

  const handleNewChat = () => {
    if (isLoading) return
    setActiveChatId('')
  }

  const handleSendMessage = async (message: string) => {
    if (!activeChatId) {
      let newChatId = uuid();

      setChatList([{
        id: newChatId,
        title: message,
        messages: [
          { id: uuid(), body: message, author: 'me' }
        ]
      }, ...chatList])

      setActiveChatId(newChatId)
      setIsLoading(true)
    } else {
      let newChatList = [...chatList]
      let chatIndex = newChatList.findIndex(item => item.id === activeChatId)

      if (chatIndex > -1) {
        let formatedMessage = { message_id: uuid(), message_body: message, message_author: 'me' }
        const response = await chatApi.put(`/chat/${activeChatId}`, formatedMessage)

        if (response.data) {
          newChatList[chatIndex].messages.push({
            id: formatedMessage.message_id,
            body: formatedMessage.message_body,
            author: 'me'
          }, {
            id: response.data.id,
            body: response.data.body,
            author: response.data.author
          })
        }
      }
      setChatList(newChatList)
    }

  }

  const handleSelectChat = (chatId: string) => {
    if (isLoading) return

    let item = chatList.find(item => item.id === chatId)
    if (!item) return
    setActiveChatId(chatId)
  }

  const handleDeleteChat = async (chatId: string) => {
    if (isLoading) return
    setDeleteChat({ open: false, isClearHistory: false })

    if (deleteChat.isClearHistory) {
      handleClearHistory()
      return
    }

    await chatApi.delete(`/chat/${chatId}`)
    let newChatList = [...chatList]
    let chatIndex = newChatList.findIndex(item => item.id === chatId)

    newChatList.splice(chatIndex, 1)

    setChatList(newChatList)
    setActiveChatId('')
  }

  const handleRegerateResponse = () => {
    if (isLoading) return
    setIsLoading(true)
  }

  return (
    <div className='flex h-screen flex-col '>
      <header className='flex items-center justify-between w-full h-16 p-4 border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80'>
        <Button variant='ghost' size='icon' onClick={() => setOpen(!open)}>
          <IconLayoutSidebar className='h-5 w-5' />
        </Button>
      </header>
      <main className='flex h-full'>
        <SideBar open={open} onClose={() => setOpen(false)} onClearHistory={() => setDeleteChat({ open: true, isClearHistory: true })}>
          {chatList.map(message => (
            <SideBarChatButton
              key={message.id}
              chatItem={message}
              active={message.id === activeChatId}
              onClick={handleSelectChat}
              onDelete={() => setDeleteChat({ open: true, isClearHistory: false })}
            />
          ))}
        </SideBar>

        <section className='flex flex-col w-full'>
          <ChatArea
            chat={activeChat}
            loading={isLoading}
            onSelectShortCut={(shortcut) => handleSendMessage(shortcut)}
          />

          <Footer
            disabled={isLoading}
            onSendMessage={(message) => handleSendMessage(message)}
            onNewChat={handleNewChat}
            onRegenerateResponse={handleRegerateResponse}
          />
        </section>
      </main>
      {deleteChat && (
        <DeleteAlertDialog
          open={deleteChat.open}
          onCancel={() => setDeleteChat({ open: false, isClearHistory: false })}
          onDelete={() => handleDeleteChat(activeChatId)}
        />
      )}
    </div>
  )
}
