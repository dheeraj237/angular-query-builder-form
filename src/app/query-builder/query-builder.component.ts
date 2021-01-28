import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-query-builder",
  templateUrl: "./query-builder.component.html",
  styleUrls: ["./query-builder.component.css"]
})
export class QueryBuilderComponent implements OnInit {
  @Input()
  queryForm: FormGroup;
  constructor() {}

  ngOnInit() {}
}
