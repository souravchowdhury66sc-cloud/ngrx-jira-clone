import { inject, Injectable } from "@angular/core";
import { collection, collectionData, Firestore, addDoc, DocumentReference, updateDoc } from "@angular/fire/firestore";
import { Task } from "./task.model";
import { Observable } from "rxjs/internal/Observable";
import { from } from "rxjs";
import { deleteDoc, doc } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor() {}
  private firestore : Firestore = inject(Firestore);
  private tasksCollection = collection(this.firestore, 'tasks');

  getTasks(): Observable<Task[]> {
    // Implement Firestore query to fetch tasks
    const tasksCollection = collection(this.firestore, 'tasks');
    return collectionData(tasksCollection, { idField: 'id' }) as Observable<Task[]>;

  }
  //add
  addTask(taskData: Omit<Task, 'id'>): Observable<DocumentReference> {
    return from(addDoc(this.tasksCollection,taskData));
  }

  //delete
  deleteTask(taskId: string): Observable<void> {
    const taskDocRef = doc(this.firestore, `tasks/${taskId}`);
    return from(deleteDoc(taskDocRef));
  }

  //update
  updateTask(taskUpate: Partial<Task> & { id: string }): Observable<void> {
    const taskDocRef = doc(this.firestore, `tasks/${taskUpate.id}`);
    return from(updateDoc(taskDocRef, taskUpate));
  }
}
