import Dexie, { type EntityTable } from 'dexie';
import { type Image } from './types';

export class AppDB extends Dexie {
  images!: EntityTable<Image, 'name'>;

  constructor(dbName: string) {
    super(dbName);
    this.version(1).stores({
      images: 'name, hash, img',
    });
    this.images.mapToClass(Image);
  }
  // Get an item using the given key.
  async get(key: string) {
    return this.images.get(key);
  }
  // Set an item to db.
  async add(data: Image) {
    await this.images.put(data);
  }
  // Get an item. If not exist, set the given item to db.
  async tryGet(key: string, data: Image) {
    let result = await this.get(key);
    if (result === undefined) {
      await this.add(data);
      result = data;
    }
    return result;
  }
  // Update an item using the given key.
  async update(key: string, data: Partial<Image>) {
    await db.images.update(key, { ...data });
  }
  // Delete an item.
  // NOTE THE DIFFERENCE BETWEEN delete() AND deleteItem().
  async deleteItem(key: string) {
    await db.images.delete(key);
  }
  // Delete all items without closing the db.
  // NOTE THE DIFFERENCE BETWEEN delete() AND deleteAll().
  async deleteAll() {
    await db.images.clear();
  }
}

export const db = new AppDB('BANavDB');
