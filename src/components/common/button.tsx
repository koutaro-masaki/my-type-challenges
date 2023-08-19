import { cva } from '@styled-system/css'
import { RecipeRuntimeFn } from '@styled-system/types/recipe'

const THEME_COLOR = '#4265af'

const style = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '120px',
    height: '40px',
    padding: '8px 24px',
    fontFamily: 'sans-serif',
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign: 'center',
    overflowWrap: 'anywhere',
    backgroundColor: 'transparent',
    borderRadius: '20px',
    cursor: 'pointer',
  },
  variants: {
    color: {
      primary: {
        color: 'white',
        bgColor: THEME_COLOR,
        border: '2px solid',
        borderColor: THEME_COLOR,
      },
      secondary: {
        color: THEME_COLOR,
        border: '2px solid',
        borderColor: THEME_COLOR,
      },
    },
  },
})

type A<T> = T extends RecipeRuntimeFn<infer R> ? R : never
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: keyof A<typeof style>['color']
}
export const Button: React.FC<Props> = ({ children, variant, ...props }) => {
  return (
    <button className={style({ color: variant })} {...props}>
      {children}
    </button>
  )
}
