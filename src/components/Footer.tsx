export default function Footer() {
  return (
       <footer className="mt-12 text-center text-[10px] tracking-wider uppercase text-gray-400 dark:text-gray-600 navy:text-slate-600 font-medium select-none">
          <span>RAISE-UP</span>
          <span className="mx-2">•</span>
          <span>v {process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0"}</span>
        </footer>
  )
}