import { cn } from "~lib/utils"

const style = {
  danger: "p-1 bg-red-500 text-white outline-red-300 active:bg-red-600",
  default:
    "bg-yellow-400 justify-center text-white text-black outline-gray-300 active:bg-gray-100",
  ghost:
    "bg-transparent text-black hover:shadow-none outline-gray-300 active:bg-gray-100 p-0"
}

export function Button({ children, disabled, styleName, className, ...props }) {
  return (
    <button
      disabled={disabled}
      aria-disabled={disabled}
      className={cn(
        "text-left py-1 transition-all flex items-center hover:shadow-md transiti px-3 rounded-md w-full text-xs focus:outline outline-2 leading-3",
        {
          "opacity-20 pointer-events-none": disabled
        },
        style[styleName || "default"],
        className
      )}
      {...props}>
      {children}
    </button>
  )
}
