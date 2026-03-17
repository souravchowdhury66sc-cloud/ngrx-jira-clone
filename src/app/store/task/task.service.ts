import { inject, Injectable } from "@angular/core";
import { collection, collectionData, Firestore } from "@angular/fire/firestore";
import { Task } from "./task.model";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor() {}
  private firestore : Firestore = inject(Firestore);
  getTasks(): Observable<Task[]> {
    // Implement Firestore query to fetch tasks
    const tasksCollection = collection(this.firestore, 'tasks');
    return collectionData(tasksCollection, { idField: 'id' }) as Observable<Task[]>;

  }
}
