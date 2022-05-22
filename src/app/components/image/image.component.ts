import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagesService } from '../../services/images.service';
import { Image } from '../../models/image.interface';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent implements OnInit {
  image: Image | undefined;
  showDetailsBool: boolean = false;
  constructor(
    private imagesService: ImagesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const identifier = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('id ==> ', identifier);

    this.imagesService.getImageById(identifier!).subscribe((image) => {
      if (!image) {
        return this.router.navigateByUrl('/');
      }

      this.image = image;
      console.log('Image ==> ', this.image);
      return true;
    });
  }

  showDetails(): void {
    this.showDetailsBool = !this.showDetailsBool;
    console.log(this.showDetailsBool);
  }
}
