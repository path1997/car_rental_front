import {CommonModule} from "@angular/common";
import {ImageSliderComponent} from "./image-slider.component";
import {NgModule} from "@angular/core";

@NgModule({
  imports: [CommonModule],
  exports: [ImageSliderComponent],
  declarations: [ImageSliderComponent],
})
export class ImageSliderModule {}
