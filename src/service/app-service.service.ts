import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.interface';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // La URL base de la API (como la base URL de tu backend Spring Boot)
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  // Inyecta HttpClient — igual que inyectar un RestTemplate en Spring
  constructor(private http: HttpClient) { }

  // GET /posts → Observable<Post[]>
  obtenerPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts`);
  }

  // GET /posts/:id → Observable<Post>
  obtenerPostPorId(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`);
  }

  // GET /users → Observable<User[]>
  obtenerUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  // POST /posts → Observable<Post> (crear un nuevo post)
  crearPost(post: Partial<Post>): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/posts`, post);
  }

  // DELETE /posts/:id → Observable<{}>
  eliminarPost(id: number): Observable<{}> {
    return this.http.delete(`${this.baseUrl}/posts/${id}`);
  }
}
