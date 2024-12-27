export class IndexedDBService<T> {
  private dbName: string;
  private storeName: string;
  private version: number;

  constructor(
    storeName: string,
    version: number = 1,
    dbName: string = 'database',
  ) {
    this.dbName = dbName;
    this.storeName = storeName;
    this.version = version;
  }

  private async openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onupgradeneeded = (event) => {
        const db = request.result;

        // Crea el almacén de objetos si no existe
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'id' });
          console.log(`Object store '${this.storeName}' creado.`);
        }
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  private async detectVersion(): Promise<number> {
    return new Promise((resolve) => {
      const request = indexedDB.open(this.dbName);
      request.onsuccess = () => {
        const db = request.result;
        const currentVersion = db.version;
        db.close();
        resolve(currentVersion);
      };
      request.onupgradeneeded = () => {
        // Si no existe, asumimos la versión 1
        resolve(1);
      };
      request.onerror = () => {
        resolve(1); // Si hay un error, asumimos la versión inicial
      };
    });
  }

  private async updateVersionIfNeeded(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName);

      request.onsuccess = () => {
        const db = request.result;

        // Si no existe el almacén, incrementamos la versión
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.close();
          console.log(
            `Incrementando versión para agregar '${this.storeName}'.`,
          );
          this.version += 1;
          // indexedDB.deleteDatabase(this.dbName); // Opcional: Solo si quieres forzar la limpieza
          resolve();
        } else {
          db.close();
          resolve();
        }
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async init(): Promise<IDBDatabase> {
    this.version = Math.max(this.version, await this.detectVersion());
    await this.updateVersionIfNeeded();
    return await this.openDB();
  }

  async insert(item: T & { id: string | number }): Promise<string | number> {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(item);

      request.onsuccess = () => {
        db.close();
        resolve(request.result as string | number);
      };

      request.onerror = () => {
        db.close();
        reject(request.error);
      };
    });
  }

  async upsert(item: T & { id: string | number }): Promise<void> {
    const db = await this.init();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);

      const checkRequest = store.get(item.id);

      checkRequest.onsuccess = () => {
        if (checkRequest.result) {
          // Si existe, actualizamos
          const updateRequest = store.put(item);
          updateRequest.onsuccess = () => {
            db.close();
            resolve();
          };
          updateRequest.onerror = () => {
            db.close();
            reject(updateRequest.error);
          };
        } else {
          // Si no existe, insertamos
          const insertRequest = store.add(item);
          insertRequest.onsuccess = () => {
            db.close();
            resolve();
          };
          insertRequest.onerror = () => {
            db.close();
            reject(insertRequest.error);
          };
        }
      };

      checkRequest.onerror = () => {
        db.close();
        reject(checkRequest.error);
      };
    });
  }

  async get(id: string | number): Promise<T | undefined> {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(id);

      request.onsuccess = () => {
        db.close();
        resolve(request.result);
      };

      request.onerror = () => {
        db.close();
        reject(request.error);
      };
    });
  }

  async getAll(): Promise<T[]> {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        db.close();
        resolve(request.result as T[]);
      };

      request.onerror = () => {
        db.close();
        reject(request.error);
      };
    });
  }

  async update(item: T & { id: string | number }): Promise<void> {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.put(item);

      request.onsuccess = () => {
        db.close();
        resolve();
      };

      request.onerror = () => {
        db.close();
        reject(request.error);
      };
    });
  }

  async delete(id: string | number): Promise<void> {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(id);

      request.onsuccess = () => {
        db.close();
        resolve();
      };

      request.onerror = () => {
        db.close();
        reject(request.error);
      };
    });
  }
}
