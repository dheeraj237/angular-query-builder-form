import { Component, Input, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-query-builder",
  templateUrl: "./query-builder.component.html",
  styleUrls: ["./query-builder.component.css"]
})
export class QueryBuilderComponent implements OnInit {
  @Input()
  queryForm: FormGroup;
  filterForm: FormGroup;

  filterString: string;

  constructor() {}

  ngOnInit() {
    this.initializeData();
  }

  initializeData(): void {
    this.filterForm = new FormGroup({
      name: new FormControl(""),
      logicalOperator: new FormControl(""),
      type: new FormControl(""),
      value: new FormControl(""),
      relationalOperator: new FormControl(""),
      filters: new FormArray([])
    });
    this.filterForm.disable();
    this.queryForm.controls.filters = new FormGroup({
      logicalOperator: new FormControl("OR"),
      filters: new FormArray([
        new FormGroup({
          logicalOperator: new FormControl("AND"),
          filters: new FormArray([
            new FormGroup({
              name: new FormControl("3333"),
              type: new FormControl("string"),
              value: new FormControl("3333"),
              relationalOperator: new FormControl("="),
              filters: new FormArray([])
            }),
            new FormGroup({
              name: new FormControl("4444"),
              type: new FormControl("string"),
              value: new FormControl("4444"),
              relationalOperator: new FormControl("="),
              filters: new FormArray([])
            })
          ])
        }),
        new FormGroup({
          name: new FormControl("2222"),
          type: new FormControl("string"),
          value: new FormControl("2222"),
          relationalOperator: new FormControl("="),
          filters: new FormArray([])
        })
      ])
    });

    this.queryForm.controls.columns.valueChanges.subscribe(value => {
      if (value.length !== 0 && value[0].groupingType) {
        this.filterForm.enable();
      } else {
        this.filterForm.enable();
      }
    });

    this.queryForm.controls.filters.valueChanges.subscribe(value => {
      if (value) {
        this.filterString = this.computed(value);
      }
    });
  }
  htmlEntities(str) {
    return String(str)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  computed(filter: any) {
    if (!filter || Object.keys(filter).length === 0) {
      return "";
    }
    let str = "(";
    for (let i = 0; i < filter.filters.length; i++) {
      if (i > 0) {
        str += ` ` + filter.logicalOperator + ` `;
      }
      str +=
        filter.filters[i].filters.length !== 0
          ? this.computed(filter.filters[i])
          : filter.filters[i].name +
            " " +
            this.htmlEntities(filter.filters[i].relationalOperator) +
            " " +
            filter.filters[i].value;
    }

    return str + ")";
  }
}
