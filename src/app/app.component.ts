import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToDo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = "";
  description = "";
  todos:any = [];
  editName="";
  editDesc="";
  editButton=false;
  selectedTodo={name:"",text:"",_id:""};
  constructor( private http:HttpClient ){

  }

  ngOnInit(){
    this.getToDos();
  }

  edit(id:any){
    
    this.selectedTodo = this.todos.find((todo:any)=> todo._id == id);
    
    console.log(this.selectedTodo);
    this.editButton=true;
  }

  deleteTodo(id:any){
    this.http.delete(`http://todoapptp.herokuapp.com/api/deleteTask/${id}`).subscribe((data:any)=>this.getToDos());
  }

  getToDos(){
    //console.log("get called");
    let resp = this.http.get("http://todoapptp.herokuapp.com/api/gettodo").subscribe((data:any)=>this.todos=data.data);
    //let res = this.http.get("http://todoapptp.herokuapp.com/api/gettodo").subscribe((data:any)=>console.log(data));

  }

  addToDo(){
    console.log(this.name, this.description);
    if( this.name !== "" && this.description !== "" ){
      let resp = this.http.post("http://todoapptp.herokuapp.com/api/addtodo",{name:this.name, description:this.description}).subscribe((data:any)=>this.getToDos());
      this.name="";
      this.description="";
    }
  }
  
  updateToDo(id:any){
    let resp = this.http.put(`http://todoapptp.herokuapp.com/api/completedTask/${id}`,{}).subscribe((data:any)=>console.log(data));

  }

  editTodo(){
    if( this.selectedTodo.name !== "" && this.selectedTodo.text !== "" ){
      let resp = this.http.put(`http://todoapptp.herokuapp.com/api/addtodo/${this.selectedTodo._id}`,{name:this.selectedTodo.name, description:this.selectedTodo.text}).subscribe((data:any)=>this.getToDos());
      this.editButton=false;
    }
  }
}
