
export class MyDB<T> {
    private db: { [id: string]: T };
  
    constructor() {
      this.db = {};
    }

    list(): T[] {
        return Object.values(this.db);
    }

    getById(id: string): T {
        const result: T = this.db[id];
        return result;
    }

    add(id:string, dto: T): T {
        this.db[id] = dto;
        return dto;
    }

    delete(id: string): T {
        const result = this.getById(id);
        if (result) {
          delete this.db[id];
        }
        return result;
    }

    update(id: string, dto: T): T {
        const result = this.getById(id);
        if (result) {
          this.db[id] = dto;
        }
        return result;
    }

}
