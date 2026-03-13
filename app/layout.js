import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
import Chatbot from "@/components/chatbot";


const inter= Inter({subsets:["latin"]});


export const metadata = {
  title: "Mentora- Ai Career Coach",
  description: "This app is developed by Ishan and Ishani ",
};

export default function RootLayout({ children }) {
  return (
      // <ClerkProvider appearance={{
      //   baseTheme:dark,
      // }}>
      <ClerkProvider
  appearance={{
    baseTheme: dark,
    variables: {
      colorPrimary: "#ec4899",   // pink
      colorBackground: "#1a0015", 
      colorText: "#ffffff",
      borderRadius: "8px",
    },
  }}
>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} `}
        >
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
            >
            {/* header */}
            <Header/>
            <main className="min-h-screen">

            {children}
            </main>
            <Chatbot/>
            <Toaster richColors />
            {/* footer */}
            {/* <footer className="bg-muted/50 py-12"> */}
            
             
           <footer className="bg-gradient-to-r from-pink-300 via-fuchsia-300 to-purple-400 py-12">
  <div className="container mx-auto px-4 text-center text-black">
    <p className="font-medium">
      Made with 💖 by <span className="text-purple-800">ISHAN & ISHANI</span>
    </p>
  </div>
</footer>
          </ThemeProvider>
        
      </body>
    </html>

</ClerkProvider>
  );
}

