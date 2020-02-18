import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';

import { AlertifyService } from '../../_services/Alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from '../../_models/Pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  pagination: Pagination;

  constructor(private UserService: UserService, private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    //this.loadUsers();
    this.route.data.subscribe(data => {
      this.users = data["users"].result;
      this.pagination = data["users"].pagination;
    });
  }
pageChanged (event: any): void {
  this.pagination.currentPage = event.page;
  this.loadUsers();
}
  // loadUsers() { 
  //   this.UserService.getUsers().subscribe((users: User[]) => {
  //     this.users = users;

  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

   loadUsers() {
    this.UserService.getUsers(this.pagination.currentPage,this.pagination.itemsPerPage).subscribe((res: PaginatedResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

}
