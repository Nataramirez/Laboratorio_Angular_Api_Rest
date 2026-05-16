
import { Component, OnInit, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { User } from '../models/user.interface';
import { Post } from '../models/post.interface';
import { ApiService } from '../service/app-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  usuarios = signal<User[]>([]);
  cargando = signal(true);
  error = signal('');
  post = signal<Post[]>([]);

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.obtenerUsuarios().subscribe({
      next: (data: User[]) => {
        this.usuarios.set(data);
        this.cargando.set(false);
      },
      error: (err: Error) => {
        this.error.set('Error al cargar usuarios: ' + err.message);
        this.cargando.set(false);
        console.error('Error:', err);
      }
    });

    this.apiService.obtenerPosts().subscribe({
      next: (data: Post[]) => {
        this.post.set(data);
        this.cargando.set(false);
      },
      error: (err: Error) => {
        this.error.set('Error al cargar usuarios: ' + err.message);
        this.cargando.set(false);
        console.error('Error:', err);
      }
    })
  }
}
