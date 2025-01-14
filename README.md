This project is a replica of RIP.ie (seeing as RIP.ie have started to charge for the service...)

Tech Stack is as follows:

Frontend: Next.js 14 (React) - Backend: Node.js with Express - Database: MongoDB (for flexible death notice schema) - Search: Elasticsearch (for powerful search capabilities) - Styling: Tailwind CSS

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result:

<img width="1424" alt="Screenshot 2025-01-14 at 23 03 46" src="https://github.com/user-attachments/assets/790e7eb5-1d71-4c78-bfe1-9a1b6e8a0d69" />

Click on counties to view death notices for that county. More county's geo-location data can be added in /app/MapSection.tsx . I have only added Kildare and Dublin for now!

Death notices are added using the button in the top right, and condoolences are added from the Death Notice page itself:

<img width="1424" alt="Screenshot 2025-01-14 at 23 07 01" src="https://github.com/user-attachments/assets/dbc65f01-dd4b-4dc5-86eb-6ee8bfb673fb" />

Death notices can also be searched using either name or address

<img width="1424" alt="Screenshot 2025-01-14 at 23 07 55" src="https://github.com/user-attachments/assets/cc82735b-8ff1-4d20-964c-7f8ee9f755b7" />
