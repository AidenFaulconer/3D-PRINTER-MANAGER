import { useTheme } from '../context/ThemeContext'

const Logo = ({ className = "h-8 w-8" }) => {
  const { isDark } = useTheme()
  
  // Brand colors - invert for dark theme
  const primaryColor = isDark ? '#000064' : '#D4DDF6'  // dark blue : light blue
  const secondaryColor = isDark ? '#D4DDF6' : '#000064'  // light blue : dark blue

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="54" 
      height="61" 
      fill="none" 
      viewBox="0 0 56 61"
      className={className}
    >
      <defs/>
      <path fill={primaryColor} stroke={secondaryColor} strokeWidth=".769" d="M18.662 50.518l-9.626 2.588V25.924l9.626-1.737v26.331z"/>
      <path fill={secondaryColor} d="M16.627.808c8.771 0 11.163 3.2 11.163 3.2V15.21l-14.352-6.4L.744 13.726C.744.925 16.627.808 16.627.808z"/>
      <path fill={secondaryColor} d="M38.905.808c-8.771 0-11.163 3.2-11.163 3.2V15.21l14.352-6.4 12.694 4.917C54.788.925 38.905.808 38.905.808z"/>
      <path fill={secondaryColor} d="M36.67 17.893l10.191 1.042 1.23-.417V7.892H36.67v10.001zM36.671 34.77l9.968 2.5 1.66-1.042v-6.875l-11.42.208-.208 5.209zM8.652 53.608L.538 50.769v-36c0-12.801 12.898-12.362 12.898-12.362 14.353.8 14.353 9.6 14.353 14.4v44.001l-9.569-3.536V36.227c0-4.8-9.568-7.867-9.568-2.864v20.245zM36.462 23.102l15.576 2.5-15.576 3.334v-5.834z"/>
      <path fill={primaryColor} stroke={`#${primaryColor}064`} strokeWidth=".769" d="M8.651 15.208c0-4.8 9.569-3.2 9.569 1.6v11.2l-9.569-2.4v-10.4z"/>
      <path fill={primaryColor} stroke={primaryColor} strokeWidth=".769" d="M18.278 28.046L8.65 25.608v-10.4c0-4.685 9.627-3.645 9.627 1.214v11.624z"/>
      <path fill={primaryColor} stroke={secondaryColor} strokeWidth=".769" d="M8.359 25.433l-.022.751 10.175 2.5.477.117v-5.327l-.455.083L8.36 25.433zM36.972 27.477v.437l.434-.055 14.247-1.82v9.478l-4.63 1.25v-3.872a1.83 1.83 0 00-.504-1.291c-.315-.333-.747-.556-1.227-.691-.957-.269-2.192-.212-3.398.127-2.397.672-4.922 2.542-4.922 5.605V57.33l-8.799 2.943V40.607v-23.8c0-2.413.008-5.704 1.737-8.498 1.707-2.76 5.154-5.121 12.24-5.519h.023l.104.003c.093.003.23.008.404.018.35.021.852.063 1.454.145 1.208.166 2.81.495 4.402 1.146 1.594.652 3.162 1.618 4.325 3.05 1.157 1.424 1.93 3.33 1.906 5.9h0v3.901l-7.538 1.512v-3.489c0-1.17-.71-2.037-1.683-2.566-.969-.525-2.233-.743-3.478-.636-1.248.106-2.516.54-3.48 1.367-.974.834-1.617 2.052-1.617 3.666v10.67z"/>
      {/* Clean F horizontal bar - geometrically proportional */}
      <path fill={primaryColor} stroke={secondaryColor} strokeWidth=".769" d="M36.972 27.477h14.247v3.2H36.972v-3.2z"/>
    </svg>
  )
}

export default Logo
