// app/page.js

// ... imports

// ✅ เพิ่มฟังก์ชันนี้ (ถ้ายังไม่ได้แยกไฟล์ utils)
function getBaseUrl() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

async function getPlayers() {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/players`, { // <--- ใช้ baseUrl
    cache: 'no-store'
  });
  // ...
}

// ... (ส่วนที่เหลือเหมือนเดิม)

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