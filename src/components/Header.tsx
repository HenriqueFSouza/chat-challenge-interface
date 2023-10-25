import { Button } from '@/components/ui/button'
import { IconLayoutSidebar, IconSlash } from '@/components/ui/icons'

type Props = {
  onOpenSideBar: () => void
}
export const Header = ({ onOpenSideBar }: Props) => {

  return (
    <header className='flex items-center justify-between w-full h-16 p-4 border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80'>
      <div className='flex items-center justify-center space-x-2 '>
        <Button variant='ghost' size='icon' onClick={onOpenSideBar}>
          <IconLayoutSidebar className='h-5 w-5' />
        </Button>
      </div>
    </header>
  )

}