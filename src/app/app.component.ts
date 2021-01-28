import { Component, OnInit, VERSION } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  queryForm: FormGroup;

  ngOnInit(): void {
    this.queryForm = new FormGroup({
      id: new FormControl("q-" + new Date().getTime(), Validators.required),
      dataset: new FormControl(""),
      columns: new FormArray([]),
      filters: new FormGroup({})
    });
  }
}
