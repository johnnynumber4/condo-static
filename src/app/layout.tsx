import ThemeRegistry from './components/ThemeRegistry/ThemeRegistry';
import Navigation from './components/Navigation/Navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Navigation />
          <main>{children}</main>
        </ThemeRegistry>
      </body>
    </html>
  );
}
