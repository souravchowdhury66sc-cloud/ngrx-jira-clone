import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../../store/task/task.model';
import { selectDoneTasks, selectInProgressTasks, selectTodoTasks } from '../../store/task/task.selector';
import { TaskAction } from '../../store/task/task.action';
import { CommonModule } from '@angular/common';
import { TaskCard } from '../task-card/task-card';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kanban-board',
  imports: [CommonModule, TaskCard,DragDropModule],
  templateUrl: './kanban-board.html',
  styleUrl: './kanban-board.scss',
})
export class KanbanBoard implements OnInit {

//inject
private store = inject(Store);
//todo
//in
//done
todoTask$ : Observable<Task[]> = this.store.select(selectTodoTasks);
inProgressTask$ : Observable<Task[]> = this.store.select(selectInProgressTasks);
doneTask$ : Observable<Task[]> = this.store.select(selectDoneTasks);


ngOnInit(): void {
this.store.dispatch(TaskAction.loadTasks());

}

}
