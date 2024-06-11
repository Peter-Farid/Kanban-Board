import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private _toastrService: ToastrService) { }

  tasks: any[] = [
    {
      id: 1,
      title: 'Task 1',
      desc: 'Task Des',
      due_date: "2024-06-25",
      state: 1
    },
    {
      id: 2,
      title: 'Task 2',
      desc: 'Task Des',
      due_date: "2024-06-15",
      state: 2
    },
    {
      id: 3,
      title: 'Task 3',
      desc: 'Task Des',
      due_date: "2024-06-20",
      state: 3
    },
    {
      id: 4,
      title: 'Task 4',
      desc: 'Task Des',
      due_date: "2024-07-25",
      state: 1
    },
    {
      id: 5,
      title: 'Task 5',
      desc: 'Task Des',
      due_date: "2024-07-20",
      state: 2
    },
    {
      id: 6,
      title: 'Task 6',
      desc: 'Task Des',
      due_date: "2024-07-15",
      state: 3
    },
    {
      id: 7,
      title: 'Task 7',
      desc: 'Task Des',
      due_date: "2024-08-25",
      state: 1
    },
    {
      id: 8,
      title: 'Task 8',
      desc: 'Task Des',
      due_date: "2024-08-20",
      state: 2
    },
    {
      id: 9,
      title: 'Task 9',
      desc: 'Task Des',
      due_date: "2024-08-15",
      state: 3
    }
  ]

  getTaskData(taskId: any) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id == taskId) {
        return this.tasks[i]
      }
    }
  }
  addTask(formData: any) {
    const task = {
      id: Math.random(),
      title: formData.title,
      desc: formData.desc,
      due_date: formData.due_date,
      state: 1
    }
    this.tasks.push(task)
    this._toastrService.success('Task Added Successfully !')
  }

  deleteTask(taskId: any) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id == taskId) {
        this.tasks.splice(i, 1)
      }
    }
    this._toastrService.success('Task Deleted Successfully !')
  }
}
