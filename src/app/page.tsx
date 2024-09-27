import TodoApp from '@/components/TodoApp'
import OfflineAlert from '@/components/OfflineAlert'

export default function Home() {
  return (
    <main>
      <OfflineAlert />
      <TodoApp />
    </main>
  )
}