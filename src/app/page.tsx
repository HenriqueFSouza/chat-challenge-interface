'use client';
import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'


import { SideBar } from '@/components/SideBar'
import { Chat } from '@/types/Chat';
import { ChatArea } from '@/components/ChatArea';
import { Footer } from '@/components/Footer';
import { SideBarChatButton } from '@/components/SideBarChatButton';
import { DeleteAlertDialog } from '@/components/AlertDialog';
import { Header } from '@/components/Header';


export default function Home() {
  const [open, setOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [chatList, setChatList] = useState<Chat[]>([])
  const [activeChatId, setActiveChatId] = useState<string>('')
  const [activeChat, setActiveChat] = useState<Chat>()
  const [deleteChat, setDeleteChat] = useState({ open: false, isClearHistory: false })


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

      newChatList[chatIndex].messages.push({
        id: uuid(),
        body: "Here is your generic response :)",
        author: 'ai'
      })
    }

    setChatList(newChatList)
    setIsLoading(false)
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
        newChatList[chatIndex].messages.push({
          id: uuid(),
          body: message,
          author: 'me'
        }, {
          id: uuid(),
          body: "Here is your generic response :)",
          author: 'ai'
        })
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

    let newChatList = [...chatList]
    let chatIndex = newChatList.findIndex(item => item.id === chatId)

    newChatList.splice(chatIndex, 1)

    setChatList(newChatList)
    setActiveChatId('')
  }

  const handleClearHistory = async () => {
    if (isLoading) return

    setActiveChatId('')
    setChatList([])
  }

  const handleRegerateResponse = () => {
    if (isLoading) return

    let newChatList = [...chatList]
    let chatIndex = newChatList.findIndex(item => item.id === activeChatId)

    if (chatIndex > -1) {
      handleSendMessage(newChatList[chatIndex].messages[newChatList[chatIndex].messages.length - 2].body)
    }
  }

  return (
    <div className='flex h-screen flex-col '>
      <Header onOpenSideBar={() => setOpen(!open)} />
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
