import { Subject } from 'rxjs';

export function destroyStream(subject: Subject<boolean>): void {
  subject.next(true);
  subject.complete();
}

