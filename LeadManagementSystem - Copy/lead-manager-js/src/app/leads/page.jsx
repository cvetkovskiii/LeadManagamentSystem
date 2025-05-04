'use client';
import Link from 'next/link';
import { useLeadStore } from '@/store/useLeadStore';
import {Container,Title,Card,Text,Badge,Stack,Group,Button,} from '@mantine/core';

export default function LeadsPage() {
  // Zugriff auf useLeadStore - Leads Daten
  const leads = useLeadStore((state) => state.leads);
  const deleteLead = useLeadStore((state) => state.deleteLead);
  const convertToCustomer = useLeadStore((state) => state.convertToCustomer);

  return (
    <Container size="md" mt="xl">
      <Title order={2} mb="lg">Leads</Title>

      {/* Wenn keine Leads vorhanden sind, Hinweis anzeigen*/}
      {leads.length === 0 ? (
        <Text>No leads found. Try adding one.</Text>
      ) : (
        <Stack>
          {/* Durch alle vorhandenen Leads iterieren*/}
          {leads.map((lead) => (
            <Card key={lead.id} withBorder shadow="sm" radius="md" p="md">
              <Group position="apart" mb="xs">
                <Text fw={500}>{lead.name}</Text>
                <Badge color="blue">Lead</Badge>
              </Group>

              
              <Text size="sm" c="dimmed">
                {lead.sex && `Sex: ${lead.sex} · `}
                {lead.gender && `Gender: ${lead.gender} · `}
                {lead.address && `Address: ${lead.address}`}
              </Text>

              <Text size="xs" mt="xs" c="dimmed">
                Source: {lead.leadSource}
              </Text>

              {/* Aktions-Buttons: Bearbeiten, Konvertieren, Löschen */}
              <Group mt="sm" spacing="xs">
                <Button
                  component={Link}
                  href={`/leads/${lead.id}/edit`}
                  variant="light"
                  size="xs"
                  color="blue"
                >
                  Edit
                </Button>

                <Button
                  size="xs"
                  color="green"
                  variant="outline"
                  onClick={() => convertToCustomer(lead.id)}
                >
                  Convert to Customer
                </Button>

                <Button
                  size="xs"
                  color="red"
                  variant="outline"
                  onClick={() => deleteLead(lead.id)}
                >
                  Delete
                </Button>
              </Group>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
}
