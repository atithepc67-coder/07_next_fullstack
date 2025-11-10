// app/api/players/route.js

import { players } from '@/lib/data'; // นำเข้าข้อมูลจำลอง
import { NextResponse } from 'next/server';

export async function GET() {
  // ในโปรเจกต์จริง ตรงนี้คือส่วนที่คุณจะ query ฐานข้อมูล SQL
  // เช่น const [rows] = await db.query('SELECT * FROM players');
  // แต่ตอนนี้เราใช้ข้อมูลจำลอง
  return NextResponse.json(players);
}