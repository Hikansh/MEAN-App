import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../services/task.service';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import {Task} from '../../../../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  animations:[

    trigger('tasks',[   //to start an animation this is the first func to be called
      transition('* => *',[  //any state to any state this transition will occur
        query(':enter',style({ opacity:0 }),{ optional:true }),

        query(':enter', stagger('300ms',[
          animate('.6s ease-in',keyframes([
            style({ opacity:0 , transform:'translateY(-75%)',offset:0 }),
            style({ opacity:0.5 , transform:'translateY(35px)',offset:0.3 }),
            style({ opacity:1 , transform:'translateY(0)',offset:1 })
          ]))]),{optional:true}),
         
          query(':leave', stagger('300ms',[
            animate('.6s ease-in',keyframes([
              style({ opacity:1 , transform:'translateY(0)',offset:0 }),
              style({ opacity:0.5 , transform:'translateY(35px)',offset:0.3 }),
              style({ opacity:0 , transform:'translateY(-75%)',offset:1 })
            ]))]),{optional:true})
      ])
    ])

  ]
})
export class TasksComponent implements OnInit {

  tasks:Task[];
  title:string;
  updtTitle:string;  

  constructor(private taskService:TaskService) { 
    this.taskService.getTasks().subscribe(tasks=> {
      this.tasks=tasks;
    })
  }

  ngOnInit() {
  }

  addTask(event){
    event.preventDefault();
    var newTask={
      title:this.title,
      isDone:false
    }

    this.taskService.addTask(newTask).subscribe(task=>{
      this.tasks.push(task);
      this.title='';
    });
    
  }

  deleteTask(id){
    var task=this.tasks;
    this.taskService.deleteTask(id).subscribe(data=>{
      if(data.n==1){
        for(var i=0;i<this.tasks.length;i++){
          if(this.tasks[i]._id==id){
            this.tasks.splice(i,1);
          }
        }
      }
    })
  }

  updateStatus(task){
    var _task={
      _id:task._id,
      title:task.title,
      isDone:!task.isDone
    }
    this.taskService.updateStatus(_task).subscribe(data=>{
      task.isDone=!task.isDone
    });
  }

  updateStatus2(task){
    var _task={
      _id:task._id,
      title:this.updtTitle,
      isDone:task.isDone
    }
    this.taskService.updateStatus(_task).subscribe(data=>{
      //this.tasks.push(_task);
      task.isDone=task.isDone;
    });
  }

  updateTask(task){
    task.isUpdate=true;
  }
  cancelTask(task){
    task.isUpdate=false;
  }
  submitTask(task){
    task.isUpdate=false;
    this.updateStatus2(task);
    window.location.reload();
  }

}
