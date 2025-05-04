'use client';

import { Container, Title, Text, Button, Stack, Paper } from '@mantine/core';
import Link from 'next/link';

export default function HomePage() {
  return (
    // HomePage Container Gestaltung
    <Container size="sm" mt="xl">
      <Paper
        withBorder
        shadow="xl"
        p="xl"
        radius="lg"
        style={{
          backgroundColor: 'var(--card)',
          boxShadow: 'var(--shadow)',
        }}
      >
        <Stack align="center" spacing="sm">
          <Title order={1} ta="center">
            Welcome to LMS
          </Title>
          <Text ta="center" c="dimmed">
            Lead Management System - A simple tool to create, manage, and convert leads into customers.
          </Text>

          <Stack w="100%" mt="md" spacing="xs">
            <Button
              component={Link}
              href="/leads/new"
              size="lg"
              fullWidth
              variant="outline"
              color="white"
              radius="md"
            >
              Create new lead
            </Button>

            <Button
              component={Link}
              href="/leads"
              size="lg"
              fullWidth
              variant="outline"
              color="white"
              radius="md"
            >
              View leads
            </Button>

            <Button
              component={Link}
              href="/customers"
              size="lg"
              fullWidth
              variant="outline"
              color="white"
              radius="md"
            >
              View customers
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
