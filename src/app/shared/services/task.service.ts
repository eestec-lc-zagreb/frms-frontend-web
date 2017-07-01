import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { TaskStatistics } from '../models/task-statistics.model';
import { Observable } from 'rxjs/Observable';
import { API_BASE } from '../app.constants';
import 'rxjs/add/operator/map';
import { Task } from '../models/task.model';
import { TaskData } from '../models/task-data.model';

@Injectable()
export class TaskService {

  static options(): RequestOptions {
    const headers = new Headers({'Content-Type': 'application/json'});
    return new RequestOptions({headers: headers, withCredentials: true});
  }

  constructor(private http: Http) {
  }

  getStatisticsForUser(userId: number): Observable<TaskStatistics> {
    return this.http.get(API_BASE + '/users/' + userId + '/statistics', TaskService.options())
      .map(response => <TaskStatistics>response.json())
      .catch(this.handleError);
  }

  getActiveTasksOfUser(userId: number): Observable<Task[]> {
    return this.http.get(API_BASE + '/users/' + userId + '/tasks?status=IN_PROGRESS', TaskService.options())
      .map(response => <Task[]>response.json())
      .catch(this.handleError);
  }

  getAllTasksOfUser(userId: number): Observable<Task[]> {
    return this.http.get(API_BASE + '/users/' + userId + '/tasks', TaskService.options())
      .map(response => <Task[]>response.json())
      .catch(this.handleError);
  }

  getTask(taskId: number): Observable<Task> {
    return this.http.get(API_BASE + '/tasks/' + taskId, TaskService.options())
      .map(response => <Task>response.json())
      .catch(this.handleError);
  }

  createTask(taskData: TaskData): Observable<Response> {
    return this.http.post(API_BASE + '/tasks', taskData, TaskService.options())
      .catch(this.handleError);
  }

  updateTask(taskId: number, task: TaskData): Observable<Response> {
    return this.http.put(API_BASE + '/tasks/' + taskId, task, TaskService.options())
      .catch(this.handleError);
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get(API_BASE + '/tasks', TaskService.options())
      .map(response => <Task>response.json())
      .catch(this.handleError);
  }

  filterTasks(eventId: number, companyId: number, userId: number, type: string, status: string): Observable<Task[]> {
    return this.http.get(
      API_BASE +
      '/tasks/search' +
      '?eventId=' + (eventId != null ? eventId : '') +
      '&companyId=' + (companyId != null ? companyId : '') +
      '&userId=' + (userId != null ? userId : '') +
      '&type=' + (type != null ? type : '') +
      '&status=' + (status != null ? status : ''),
      TaskService.options())
      .map(response => <Task>response.json())
      .catch(this.handleError);
  }

  handleError(error: Response | any) {
    let errMsg: string;

    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.statusMessage || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = 'Error while loading data.';
    }

    return Observable.throw({status: error.status, message: errMsg});
  }
}
