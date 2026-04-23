import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg'; // ✅ ต้องใช้ตัวนี้
import { Pool } from 'pg'; // ✅ ต้องใช้ตัวนี้

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // 1. สร้าง Pool เชื่อมต่อกับ Postgres (ดึงค่าจาก .env)
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    
    // 2. สร้าง Adapter สำหรับ Postgres
    const adapter = new PrismaPg(pool);
    
    // 3. ส่ง adapter ให้ PrismaClient
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

