// app/players/[id]/page.js

import Image from 'next/image';
import Link from 'next/link';

// ✅ เพิ่มฟังก์ชันนี้ไว้บนสุดของไฟล์ (หรือแยกไปไว้ใน utils ก็ได้)
function getBaseUrl() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

async function getPlayerById(id) {
  // ✅ เรียกใช้ฟังก์ชันเพื่อเอา URL ที่ถูกต้อง
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/players/${id}`, { // <--- ใช้ baseUrl
    cache: 'no-store'
  });

  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error('Failed to fetch player');
  }
  return res.json();
}

// ... (ส่วนที่เหลือเหมือนเดิม)
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