export interface RepositoryInterface<T> {
  create(Entity: T): Promise<void>;
  update(Entity: T): Promise<void>;
  find(id: string): Promise<T>;
  findAll(): Promise<T[]>;
}
