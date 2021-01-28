import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { QueryBuilderComponent } from './query-builder/query-builder.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, QueryBuilderComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
