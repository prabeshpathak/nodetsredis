class HashTable {
  private hash: { [key: string]: { [field: string]: string } } = {};

  public set(key: string, value: string): void {
    this.hash[key] = { value };
  }

  public get(key: string): string | null {
    return this.hash[key]?.value || null;
  }

  public getAll() {
    return this.hash;
  }

  public del(key: string): void {
    delete this.hash[key];
  }

  public hset(hashKey: string, field: string, value: string): void {
    if (!this.hash[hashKey]) {
      this.hash[hashKey] = {};
    }

    this.hash[hashKey][field] = value;
  }

  public hget(hashKey: string, field: string): string | null {
    if (!this.hash[hashKey]) {
      return null;
    }

    return this.hash[hashKey][field] || null;
  }

  public hgetall(hashKey: string): string | null {
    return (
      this.hash[hashKey] &&
      Object.entries(this.hash)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n")
    );
  }

  public flushall(): void {
    this.hash = {};
  }
}

export default HashTable;
