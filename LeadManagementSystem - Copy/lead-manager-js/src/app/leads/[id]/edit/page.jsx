'use client';

import {useParams, useRouter} from 'next/navigation';
import {useLeadStore} from '@/store/useLeadStore';
import {useEffect, useState} from 'react';
import {Container,Title,TextInput,Select,Textarea,Button,Stack,Text,} from '@mantine/core';

export default function EditLeadPage() {
  const {id} = useParams();
  const router = useRouter();

  const leads = useLeadStore((state) => state.leads);
  const updateLead = useLeadStore((state) => state.updateLead);

  const lead = leads.find((l) => l.id === id);

  const [form, setForm] = useState({
    name: '',
    sex: '',
    gender: '',
    address: '',
    leadSource: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (lead) {
      setForm({
        name: lead.name || '',
        sex: lead.sex || '',
        gender: lead.gender || '',
        address: lead.address || '',
        leadSource: lead.leadSource || '',
      });
    }
  }, [lead]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    const trimmedName = form.name.trim();
    const trimmedGender = form.gender.trim();

    if (!trimmedName || !/^[A-Za-z\s]+$/.test(trimmedName)) {
      newErrors.name = 'Name must contain only letters and cannot be empty';
    }

    if (trimmedGender && !/^[A-Za-z\s]+$/.test(trimmedGender)) {
      newErrors.gender = 'Gender must contain only letters';
    }

    if (!form.leadSource) {
      newErrors.leadSource = 'Lead source is required';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    updateLead({ ...form, id });
    router.push('/leads');
  };

  if (!lead) {
    return (
      <Container size="sm" mt="xl">
        <Title order={3}>Lead not found</Title>
        <Text>Return to the <a href="/leads">leads page</a>.</Text>
      </Container>
    );
  }

  return (
    <Container size="sm" mt="xl">
      <Title order={2} mb="md">Edit Lead</Title>
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            error={errors.name}
            required
          />

          <Select
            label="Sex"
            data={['Male', 'Female', 'Intersex', 'Undisclosed']}
            value={form.sex}
            onChange={(value) => setForm({ ...form, sex: value })}
            clearable
          />

          <TextInput
            label="Gender"
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
            error={errors.gender}
          />

          <Textarea
            label="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />

          <Select
            label="Lead Source"
            data={['Website', 'Referral', 'Cold Call', 'Event']}
            value={form.leadSource}
            onChange={(value) => setForm({ ...form, leadSource: value })}
            error={errors.leadSource}
            required
          />

          <Button type="submit" color="blue">Save Changes</Button>
        </Stack>
      </form>
    </Container>
  );
}
