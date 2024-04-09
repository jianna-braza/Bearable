export const metadata = {
    title: 'Psycare',
    description: 'Task Management web app created with Next.js.',
  }

export default function RootLayout({ children }) {
    return (  <html lang="en">
    <body>
      <div id="root">{children}</div>
    </body>
  </html>)
  }