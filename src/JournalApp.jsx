import { AppRouter } from "./router/AppRouter"
import { AppTheme } from "./theme"

export const JournalApp = () => {
  console.log('Hournal')
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  )
}
