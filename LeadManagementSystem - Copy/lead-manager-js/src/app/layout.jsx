import '@mantine/core/styles.css';
import '@/app/globals.css';

import {MantineProvider,ColorSchemeScript,Container,Group,Button,Stack,Box,} from '@mantine/core';
import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-mantine-color-scheme="light">
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/*Mantine UI Provider */}
        <MantineProvider withGlobalStyles withNormalizeCSS defaultColorScheme="light">
          {/*Navigation: zentriert, stilisiert als Card*/}
          <Box
            style={{
              maxWidth: '800px',               
              margin: '1rem auto',             
              backgroundColor: 'var(--card)',  
              boxShadow: 'var(--shadow)',      
              borderRadius: 'var(--radius)',   
              padding: '0.75rem 1.5rem',       
            }}
          >
            <Stack align="center" spacing="xs">
              <Group spacing="sm">
                <Link href="/" passHref>
                  <Button variant="outline" color="gray" w={133}>
                    Home
                  </Button>
                </Link>

                <Link href="/leads/new" passHref>
                  <Button variant="outline" color="white" w={133}>
                    Create new lead
                  </Button>
                </Link>

                <Link href="/leads" passHref>
                  <Button variant="outline" color="white" w={133}>
                    Leads
                  </Button>
                </Link>

                <Link href="/customers" passHref>
                  <Button variant="outline" color="white" w={133}>
                    Customers
                  </Button>
                </Link>
              </Group>
            </Stack>
          </Box>

          {/* Hauptinhalt der jeweiligen Seite*/}
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
