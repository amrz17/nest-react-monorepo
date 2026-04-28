// src/database/seeds/location.seed.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationEntity } from '../locations/locations.entity';
import { Repository } from 'typeorm';
import { UserEntity, UserRole } from '../user/user.entity';
import { ItemsEntity } from '../items/items.entity';
import { SupplierEntity } from '../suppliers/suppliers.entity';
import { CustomerEntity } from '../customers/customer.entity';

@Injectable()
export class LocationSeedService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepo: Repository<LocationEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(ItemsEntity)
    private readonly itemRepo: Repository<ItemsEntity>,
    @InjectRepository(SupplierEntity)
    private readonly supplierRepo: Repository<SupplierEntity>,
    @InjectRepository(CustomerEntity)
    private readonly customerRepo: Repository<CustomerEntity>
  ) {}

  async run() {
    await this.seedLocations();
    await this.seedUser();
    await this.seedItems();
    await this.seedSupplier();
    await this.seedCustomer();
    console.log('Location seeds completed!');
  }

  private async seedUser() {
    const user =  [ {
        username: 'admin_wms',
        full_name: 'Admin Warehouse',
        email: 'admin@warehouse.com',
        role: UserRole.ADMIN,
        password: 'Admin123',
      }
    ];
    // Cek dan simpan user jika belum ada
    for (const u of user) {
      const exists = await this.userRepo.findOne({ where: { email: u.email } });
      if (!exists) await this.userRepo.save(this.userRepo.create(u));
    }
  }

  private async seedItems() {
    const items = [
      {
        sku: 'ITEM-001',
        name: 'Laptop Gaming G15',
        description: 'Electronics',
        price: 20000000,
      },
      {
        sku: 'ITEM-002',
        name: 'Monitor 24 Inch',
        description: 'Electronics',
        price: 1800000,
      },
      {
        sku: 'ITEM-003',
        name: 'Keyboard Mechanical',
        description: 'Accessories',
        price: 400000,
      },
      {
        sku: "ELEC-LAP-ASUS-V5",
        name: "Laptop Asus Vivobook 15",
        description: "Electronics",
        price: 6500000,
      },
      {
        sku: "OFF-CHR-ERG-01",
        name: "Kursi Kantor Ergonomis",
        description: "Furniture",
        price: 300000,
      },
      {
        sku: "STAT-PAPER-A4-70",
        name: "Kertas A4 70gsm (Sinar Dunia)",
        description: "Stationery",
        price: 150000,
      },
      {
        sku: "ELEC-MOUSE-LOG-G3",
        name: "Mouse Logitech G304 Wireless",
        description: "Electronics",
        price: 120000,
      }
    ];

    for (const data of items) {
      const exists = await this.itemRepo.findOne({ where: { sku: data.sku } });
      if (!exists) {
        await this.itemRepo.save(this.itemRepo.create(data));
      }
    }
  }

  private async seedLocations() {
    const locations = [
      // 1. RECEIVING & INBOUND
      { bin_code: 'RCV-ZONE-01', description: 'Area Inbound / Pembongkaran Barang' },
      { bin_code: 'RCV-STAGING-01', description: 'Area Pemeriksaan Barang (QC)' },

      // 2. STORAGE (Rak A - Aisle 1)
      { bin_code: 'STG-A1-01-1', description: 'Rak A1-01 Level 1' },
      { bin_code: 'STG-A1-01-2', description: 'Rak A1-01 Level 2' },
      { bin_code: 'STG-A1-01-3', description: 'Rak A1-01 Level 3' }, // Penambahan level

      // 3. STORAGE (Rak B - Aisle 1)
      { bin_code: 'STG-B1-01-1', description: 'Rak Utama Aisle B1 Tingkat 1' },
      { bin_code: 'STG-B1-01-2', description: 'Rak Utama Aisle B1 Tingkat 2' },

      // 4. PICKING & PACKING
      { bin_code: 'PCK-ZONE-01', description: 'Area Picking / Pengambilan Barang' },
      { bin_code: 'PKG-ZONE-01', description: 'Area Packing / Pengemasan' },

      // 5. SHIPPING & OUTBOUND
      { bin_code: 'SHP-ZONE-01', description: 'Area Outbound / Keberangkatan' },

      // 6. SPECIAL ZONES
      { bin_code: 'DMG-ZONE-01', description: 'Area Karantina Barang Rusak' },
      { bin_code: 'RTN-ZONE-01', description: 'Area Barang Retur' },
      { bin_code: 'OVS-ZONE-01', description: 'Area Barang Overstock' },
    ];

    // Cek dan simpan lokasi jika belum ada
    for (const location of locations) {
      const exists = await this.locationRepo.findOne({ where: { bin_code: location.bin_code } });
      if (!exists) await this.locationRepo.save(this.locationRepo.create(location));
    }
  }

  private async seedSupplier() {
      const suppliers = [
        {
          name: "PT. Global Teknologi Industri",
          suppliers_address: "Kawasan Industri Jababeka Blok C-12, Cikarang, Bekasi",
          pic_name: "Budi Santoso"
        },
        {
          name: "CV. Maju Jaya Logistik",
          suppliers_address: "Jl. Gatot Subroto No. 45, Jakarta Selatan",
          pic_name: "Siti Aminah"
        },
        {
          name: "PT. Sinar Terang Abadi",
          suppliers_address: "Ruko Surya Kencana Kav. 8, Surabaya",
          pic_name: "Hendra Wijaya"
        },
        {
          name: "PT. Retail Makmur Sejahtera",
          suppliers_address: "Jl. Lingkar Luar No. 88, Jakarta Barat",
          pic_name: "Andi Wijaya",
        },
        {
          name: "Toko Berkah Abadi",
          suppliers_address: "Pasar Baru Blok A-15, Bandung",
          pic_name: "Ibu Ratna",
        },
        {
          name: "PT. Logistik Nusantara Perkasa",
          suppliers_address: "Kawasan Industri SIER, Surabaya",
          pic_name: "Rizky Pratama",
        }
      ];

    // Cek dan simpan supplier jika belum ada
    for (const supplier of suppliers) {
      const exists = await this.supplierRepo.findOne({ where: { name: supplier.name } });
      if (!exists) await this.supplierRepo.save(this.supplierRepo.create(supplier));
    }
  }

  private async seedCustomer() {
    const customers = [
      {
        customer_name: "PT. Retail Makmur Sejahtera",
        customer_address: "Jl. Lingkar Luar No. 88, Jakarta Barat",
        customer_phone: "021-5556677"
      },
      {
        customer_name: "Toko Berkah Abadi",
        customer_address: "Pasar Baru Blok A-15, Bandung",
        customer_phone: "08123456789"
      },
      {
        customer_name: "PT. Logistik Nusantara Perkasa",
        customer_address: "Kawasan Industri SIER, Surabaya",
        customer_phone: "031-7778899"
      },
      {
        customer_name: "PT. Global Teknologi Industri",
        customer_address: "Kawasan Industri Jababeka Blok C-12, Cikarang, Bekasi",
        customer_phone: "021-5556677"
      },
      {
        customer_name: "CV. Maju Jaya Logistik",
        customer_address: "Jl. Gatot Subroto No. 45, Jakarta Selatan",
        customer_phone: "021-5556677"
      },
      {
        customer_name: "PT. Sinar Terang Abadi",
        customer_address: "Ruko Surya Kencana Kav. 8, Surabaya",
        customer_phone: "031-7778899"
      },
    ];

    // Cek dan simpan customer jika belum ada
    for (const customer of customers) {
      const exists = await this.customerRepo.findOne({ where: { customer_name: customer.customer_name } });
      if (!exists) await this.customerRepo.save(this.customerRepo.create(customer));
    }
  }
}