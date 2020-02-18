import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/Alertify.service';
import { User } from 'src/app/_models/user';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  @ViewChild('editForm', { static: true }) editForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  photoUrl: string;
  
  constructor(private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      this.user = data['user'];
    });
    this.authService.currentPhotoUrl.subscribe(photourl=>this.photoUrl=photourl);
  }

  updateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user)
      .subscribe(next => {
        this.alertify.success('Profile updated Successfully');
        this.editForm.reset(this.user);
      }, error => {
        this.alertify.error(error);
      });
  }

  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }
}
