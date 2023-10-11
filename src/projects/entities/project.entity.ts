import { Column, Entity, PrimaryColumn } from 'typeorm';
import { randomUUID } from 'crypto';

export enum ProjectStatus {
  Pending = 'pending',
  Active = 'active',
  Cancelled = 'cancelled',
  Completed = 'completed',
}

@Entity()
export class Project {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  started_at: Date | null;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  cancelled_at: Date | null;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  finished_at: Date | null;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  forecasted_at: Date | null;

  @Column({
    type: 'simple-enum',
  })
  status: ProjectStatus = ProjectStatus.Pending;

  constructor(
    props: {
      name: string;
      description: string;
      started_at?: Date | null;
      cancelled_at?: Date | null;
      forecasted_at?: Date | null;
      finished_at?: Date | null;
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? randomUUID();

    if (props?.started_at) {
      this.start(props.started_at);
    }
  }

  start(started_at: Date) {
    if (this.status === ProjectStatus.Active) {
      throw new Error('Cannot start actived project');
    }

    if (this.status === ProjectStatus.Cancelled) {
      throw new Error('Cannot start cancelled project');
    }

    this.started_at = started_at;
    this.status = ProjectStatus.Active;
  }

  cancel(cancelled_at: Date) {
    if (this.status === ProjectStatus.Completed) {
      throw new Error('Cannot cancel completed project');
    }

    if (this.status === ProjectStatus.Cancelled) {
      throw new Error('Cannot cancel cancelled project');
    }

    if (this.cancelled_at < this.started_at) {
      throw new Error('Cannot cancel project before it started');
    }

    this.cancelled_at = cancelled_at;
    this.status = ProjectStatus.Cancelled;
  }

  finish(finished_at: Date) {
    if (this.status === ProjectStatus.Completed) {
      throw new Error('Cannot finish completed project');
    }

    if (this.status === ProjectStatus.Cancelled) {
      throw new Error('Cannot finish cancelled project');
    }

    if (this.finished_at < this.started_at) {
      throw new Error('Cannot cancel project before it started');
    }

    this.finished_at = finished_at;
    this.status = ProjectStatus.Completed;
  }
}
