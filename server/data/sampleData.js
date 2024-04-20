export const openings = [
  {
    referrer_id: "60aebd4e8e2e4e001f8e6a1a",
    company: "Company A",
    status: "waiting",
  },
  {
    referrer_id: "60aebd4e8e2e4e001f8e6a1c",
    request_id: "60aebd4e8e2e4e001f8e6a1d",
    company: "Company B",
    status: "matched",
  },
  {
    referrer_id: "60aebd4e8e2e4e001f8e6a1e",
    request_id: "60aebd4e8e2e4e001f8e6a1f",
    company: "Company C",
    status: "approved",
  },
  {
    referrer_id: "60aebd4e8e2e4e001f8e6a20",
    request_id: "60aebd4e8e2e4e001f8e6a21",
    company: "Company D",
    status: "referred",
  },
  {
    referrer_id: "60aebd4e8e2e4e001f8e6a22",
    company: "Company E",
    status: "waiting",
  },
];

export const requests = [
  {
    candidate_id: "60aebd4e8e2e4e001f8e6a1a",
    company: "Company A",
    priority: 1,
    status: "waiting",
    scale: 5,
  },
  {
    candidate_id: "60aebd4e8e2e4e001f8e6a1c",
    opening_id: "60aebd4e8e2e4e001f8e6a1d",
    company: "Company B",
    priority: 2,
    status: "matched",
    scale: 4,
  },
  {
    candidate_id: "60aebd4e8e2e4e001f8e6a1e",
    opening_id: "60aebd4e8e2e4e001f8e6a1f",
    company: "Company C",
    priority: 3,
    status: "approved",
    scale: 3,
  },
  {
    candidate_id: "60aebd4e8e2e4e001f8e6a20",
    opening_id: "60aebd4e8e2e4e001f8e6a21",
    company: "Company D",
    priority: 4,
    status: "referred",
    scale: 2,
  },
  {
    candidate_id: "60aebd4e8e2e4e001f8e6a22",
    company: "Company E",
    priority: 5,
    status: "waiting",
    scale: 1,
  },
];

export const users = [
  {
    linkedin_id: "linkedin1",
    email: "user1@example.com",
    first_name: "John",
    last_name: "Doe",
  },
  {
    linkedin_id: "linkedin2",
    email: "user2@example.com",
    first_name: "Jane",
    last_name: "Doe",
  },
  {
    linkedin_id: "linkedin3",
    email: "user3@example.com",
    first_name: "Alice",
    last_name: "Johnson",
  },
  {
    linkedin_id: "linkedin4",
    email: "user4@example.com",
    first_name: "Bob",
    last_name: "Johnson",
  },
  {
    linkedin_id: "linkedin5",
    email: "user5@example.com",
    first_name: "Charlie",
    last_name: "Brown",
  },
];
