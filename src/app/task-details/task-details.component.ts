import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../services/tasks.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent {
  taskId: any
  taskDetails: any
  constructor(private _activatedRoute: ActivatedRoute,private _location:Location, private _tasksService:TasksService) {
    this.taskId = this._activatedRoute.snapshot.params['id'];
    this.getTaskDetails(this.taskId)
  }

  getTaskDetails(taskId: any) {
    this.taskDetails = this._tasksService.getTaskData(taskId)
  }

  goBack():void{
    this._location.back();
  }
}
