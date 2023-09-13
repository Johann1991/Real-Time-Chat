import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'chat-frontend';
  public username: string = '';
  private socket: any;
  public message: string = '';
  public messages: string[] = [];

  ngOnInit(): void {
    // Connect to the Socket.io server running on localhost:3000
    this.socket = io('http://localhost:3000');

    // Listen for 'message' events from the server
    this.socket.on('message', (message: string) => {
      this.messages.push(message);
    });
  }

  // Function to send messages
  sendMessage(): void {
    if (this.message && this.username) {
      this.socket.emit('message', `${this.username}: ${this.message}`);
    } else {
      alert("Username and message can't be empty!");
    }
    this.message = '';
  }
  
}
