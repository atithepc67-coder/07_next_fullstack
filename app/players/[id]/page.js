// app/players/[id]/page.js

import Image from 'next/image';
import Link from 'next/link';

// ฟังก์ชันสำหรับดึงข้อมูลผู้เล่นคนเดียว
async function getPlayerById(id) {
  // เราจะเรียก API ที่คุณเพิ่งทำเสร็จ
  const res = await fetch(`http://localhost:3000/api/players/${id}`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch player');
  }
  return res.json();
}

export default async function PlayerDetailPage({ params }) {
  const { id } = params;
  const player = await getPlayerById(id);

  if (!player) {
    return (
      <main style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h1>Player Not Found</h1>
        <Link href="/">Back to Home</Link>
      </main>
    );
  }

  return (
    <main style={{ padding: '20px', fontFamily: 'Arial' }}>
      <Link href="/">← Back to Home</Link>
      <div style={{ marginTop: '20px' }}>
        <Image
          src={player.coverimage}
          alt={player.name}
          width={600}
          height={338}
          style={{ width: '100%', maxWidth: '600px', height: 'auto', borderRadius: '8px' }}
        />
        <h1 style={{ color: '#EF0107', marginTop: '10px' }}>{player.name}</h1>
        <h2>Position: {player.position}</h2>
        <p>Team: {player.team}</p>
        <p>Player ID: {player.id}</p>
      </div>
    </main>
  );
}