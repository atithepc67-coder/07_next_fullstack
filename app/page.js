// app/page.js

import Image from 'next/image';
import Link from 'next/link';

// ฟังก์ชันสำหรับดึงข้อมูล
async function getPlayers() {
  // เราเรียก API ที่เราเพิ่งสร้างขึ้นมา
  // (นี่คือการ fetch ข้อมูลแบบ Server-side)
  const res = await fetch('http://localhost:3000/api/players', {
    cache: 'no-store' // เพื่อให้ข้อมูลอัปเดตเสมอ
  });

  if (!res.ok) {
    throw new Error('Failed to fetch players');
  }
  return res.json();
}

export default async function HomePage() {
  const players = await getPlayers();

  return (
    <main style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#EF0107' }}>Arsenal Players 2023/24</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {players.map((player) => (
          <Link href={`/players/${player.id}`} key={player.id} style={{ textDecoration: 'none', color: 'black', border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
            <Image
              src={player.coverimage}
              alt={player.name}
              width={300} // ต้องกำหนดขนาด
              height={169} // ต้องกำหนดขนาด
              style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
            />
            <h2>{player.name}</h2>
            <p>{player.position}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}