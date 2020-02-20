import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/Alertify.service';
import { ActivatedRoute } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap';
// import { NgxGalleryImage, NgxGalleryOptions, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  @ViewChild('memberTabs', {static: true }) memberTabs: TabsetComponent;
  // galleryOptions: NgxGalleryOptions[];
  // galleryImages: NgxGalleryImage[];
  constructor(private userService: UserService, private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // this.loadUser();
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
    this.route.queryParams.subscribe(params => {
      const SelectedTab = params.tab;
      this.memberTabs.tabs[SelectedTab > 0 ? SelectedTab : 0].active = true;
      });
    // this.galleryOptions = [
    // {
    //   width: '500px',
    //   height: '500px',
    //   imagePercent: 100,
    //   thumbnailsColumns: 4,
    //   imageAnimation: NgxGalleryAnimation.Slide,
    //   preview: false
    // }];
    // this.galleryImages = this.getImages();

  }
// loadUser() {
//   this.userService.getUser(+this.route.snapshot.params['id']).subscribe((user: User) => {
//     this.user = user;
//   }, error => {
//     this.alertify.error(error);
//   })
//   ;
// }
getImages() {
  const imageUrls = [];
  for (const photo of this.user.photos) {
    imageUrls.push(
      {
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.description
      }
    );
  }
  return imageUrls;
}

selectTab(tabId: number) {
  this.memberTabs.tabs[tabId].active = true;
}

}
