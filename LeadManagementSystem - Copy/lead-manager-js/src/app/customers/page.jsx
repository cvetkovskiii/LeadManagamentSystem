'use client';

import { useLeadStore } from '@/store/useLeadStore';
import {Container,Title,Card,Text,Badge,Stack,Group,Button,} from '@mantine/core';

export default function CustomersPage() {
  // Zustand (State) für Kunden abrufen
  const customers = useLeadStore((state) => state.customers);

  // Funktion zum Löschen eines Kunden
  const deleteCustomer = useLeadStore((state) => state.deleteCustomer);

  return (
    <Container size="md" mt="xl">
      <Title order={2} mb="lg">Customers</Title>

        {/* Wenn keine Kunden vorhanden sind, zeige eine Info */}
      {customers.length === 0 ? (
        <Text>No customers yet. Try converting a lead.</Text>
      ) : (
        // Liste aller Kunden als Cards anzeigen
        <Stack>
          {customers.map((customer) => (
            <Card key={customer.id} withBorder shadow="sm" radius="md" p="md">
              <Group position="apart" mb="xs">
                <Text fw={500}>{customer.name}</Text>
                <Badge color="teal" variant="light">Customer</Badge>
              </Group>

              <Text size="sm" c="dimmed">
                {customer.sex && `Sex: ${customer.sex} · `}
                {customer.gender && `Gender: ${customer.gender} · `}
                {customer.address && `Address: ${customer.address}`}
              </Text>

              <Text size="xs" mt="xs" c="dimmed">
                Source: {customer.leadSource}
              </Text>

          {/* Kundeneintrag löschen*/} 
              <Button
                color="red"
                variant="outline"
                mt="sm"
                onClick={() => deleteCustomer(customer.id)}
              >
                Delete
              </Button>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
}
