import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/Alertify.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
@Input() user: User;
  constructor(private authService: AuthService, private alertify: AlertifyService,
              private userService: UserService) { }

  ngOnInit() {
 }

 sendLike(id: number){
   this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(data => {
     this.alertify.success('you have liked :' + this.user.knownAs);
   }, error => {
      this.alertify.error(error);
   });
 }

}
