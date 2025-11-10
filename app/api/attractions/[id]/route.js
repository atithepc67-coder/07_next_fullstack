// app/api/players/[id]/route.js

import { players } from '@/lib/data'; // นำเข้าข้อมูลจำลอง
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id } = params; // ดึง id จาก URL

    // ค้นหา player ในข้อมูลจำลอง
    // (ใน SQL จริง จะเป็น: SELECT * FROM players WHERE id = ?)
    const player = players.find((p) => p.id === parseInt(id));

    if (!player) {
      // ถ้าไม่พบ
      return NextResponse.json({ message: 'Player not found' }, { status: 404 });
    }

    // ถ้าพบ
    return NextResponse.json(player);

  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}