'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {Container,Title,TextInput,Select,Textarea,Button,Stack,} from '@mantine/core';
import {useLeadStore} from '@/store/useLeadStore';

export default function NewLeadPage() {
  const router = useRouter();
  const addLead = useLeadStore((state) => state.addLead);

  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [leadSource, setLeadSource] = useState('');

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Trim whitespace from inputs
    const trimmedName = name.trim();
    const trimmedGender = gender.trim();

    // Name validation: must have letters and not be empty after trim
    if (!trimmedName || !/^[A-Za-z\s]+$/.test(trimmedName)) {
      newErrors.name = 'Name must contain only letters and cannot be empty';
    }

    // Optional gender validation: only letters and spaces allowed
    if (trimmedGender && !/^[A-Za-z\s]+$/.test(trimmedGender)) {
      newErrors.gender = 'Gender must contain only letters';
    }

    if (!leadSource) {
      newErrors.leadSource = 'Please select a lead source';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Save lead with trimmed name/gender
    addLead({
      name: trimmedName,
      sex,
      gender: trimmedGender,
      address,
      leadSource,
    });

    router.push('/leads');
  };

  return (
    <Container size="sm" mt="xl">
      <Title order={2} mb="md">Create new lead</Title>
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            required
          />

          <Select
            label="Sex"
            data={['Male', 'Female', 'Intersex', 'Undisclosed']}
            value={sex}
            onChange={setSex}
            clearable
          />

          <TextInput
            label="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            error={errors.gender}
          />

          <Textarea
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <Select
            label="Lead Source"
            data={['Website', 'Referral', 'Cold Call', 'Event']}
            value={leadSource}
            onChange={setLeadSource}
            error={errors.leadSource}
            required
          />

          <Button type="submit" color="green">Save Lead</Button>
        </Stack>
      </form>
    </Container>
  );
}
