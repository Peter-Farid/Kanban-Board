import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TasksService } from '../services/tasks.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  tasksData: any[] = [];
  to_do: any[] = [];
  in_progress: any[] = [];
  done: any[] = [];
  modalRef?: BsModalRef;
  modalTemplate: any;
  currentDate:any;
  constructor(private _taskService:TasksService, private _modalService:BsModalService,private _router:Router) {
    const currentDate = new Date();
    this.currentDate = currentDate.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.tasksData = this._taskService.tasks
    if(this.tasksData){
      this.filterData()
    }
  }
  filterData() {
    this.to_do = []
    this.in_progress = []
    this.done = []
    if (this.tasksData) {
      for (let i = 0; i < this.tasksData.length; i++) {
        if (this.tasksData[i].state == 1) {
          this.to_do.push(this.tasksData[i])
        }
        else if (this.tasksData[i].state == 2) {
          this.in_progress.push(this.tasksData[i])
        }
        else if (this.tasksData[i].state == 3) {
          this.done.push(this.tasksData[i])
        }
      }
    }
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  addTaskForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    desc: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    due_date: new FormControl(null),
  })

  addTask(formData:any){
    this._taskService.addTask(formData.value)
    this.getData()
    this.modalRef?.hide()
  }

  deleteTask(taskId:any){
    this._taskService.deleteTask(taskId)
    this.getData()
  }

  taskDetails(taskId:any){
    this._router.navigate(['/task',taskId])
  }
  openModal(template: any) {
    this.modalRef = this._modalService.show(template, Object.assign({}, { class: 'modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable' }));
  }
}
