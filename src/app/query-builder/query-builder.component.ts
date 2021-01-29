import { Component, Input, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "query-builder",
  templateUrl: "./query-builder.component.html",
  styleUrls: ["./query-builder.component.css"]
})
export class QueryBuilderComponent implements OnInit {
  @Input()
  queryForm: FormGroup;
  filterForm: FormGroup;

  count = 0;

  filterString: string;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeData();
  }

  initializeData(): void {
    this.filterForm = new FormGroup({
      logicalOperator: new FormControl("AND", Validators.required),
      filters: new FormArray([])
    });
    // this.filterForm.disable();
    // this.queryForm.controls.filters = new FormGroup({
    // 	logicalOperator: new FormControl("OR"),
    // 	filters: new FormArray([
    // 		new FormGroup({
    // 			logicalOperator: new FormControl("AND"),
    // 			filters: new FormArray([
    // 				new FormGroup({
    // 					name: new FormControl("3333"),
    // 					type: new FormControl("string"),
    // 					value: new FormControl("3333"),
    // 					relationalOperator: new FormControl("="),
    // 					filters: new FormArray([]),
    // 				}),
    // 				new FormGroup({
    // 					name: new FormControl("4444"),
    // 					type: new FormControl("string"),
    // 					value: new FormControl("4444"),
    // 					relationalOperator: new FormControl("="),
    // 					filters: new FormArray([]),
    // 				}),
    // 			]),
    // 		}),
    // 		new FormGroup({
    // 			name: new FormControl("2222"),
    // 			type: new FormControl("string"),
    // 			value: new FormControl("2222"),
    // 			relationalOperator: new FormControl("="),
    // 			filters: new FormArray([]),
    // 		}),
    // 	]),
    // });

    // this.queryForm.controls.columns.valueChanges.subscribe((value) => {
    // 	if (value.length !== 0 && value[0].groupingType) {
    // 		this.filterForm.enable();
    // 	} else {
    // 		this.filterForm.enable();
    // 	}
    // });

    this.filterForm.valueChanges.subscribe(value => {
      if (value) {
        console.log("filterForm changes", value);

        this.filterString = this.computed(value);
      }
    });
  }

  get field(): FormGroup {
    return new FormGroup({
      name: new FormControl("field-" + this.count),
      type: new FormControl("type-" + this.count),
      value: new FormControl(this.count++),
      relationalOperator: new FormControl("="),
      filters: new FormArray([])
    });
  }

  get filter(): FormGroup {
    return new FormGroup({
      logicalOperator: new FormControl("OR"),
      filters: new FormArray([])
    });
  }

  addField(form: FormGroup) {
    (form.get("filters") as FormArray).push(this.field);
  }

  removeField(form: FormGroup, fieldIndex: number) {
    (form.get("filters") as FormArray).removeAt(fieldIndex);
  }

  addGroup(form: FormGroup) {
    (form.get("filters") as FormArray).push(this.filter);
  }

  removeGroup(groupToRemove: any) {
    (groupToRemove.group.get("filters") as FormArray).removeAt(
      groupToRemove.index
    );
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
      if (filter.filters[i] && filter.filters[i].filters.length !== 0) {
        str += this.computed(filter.filters[i]);
      } else {
        str +=
          filter.filters[i].name +
          " " +
          this.htmlEntities(filter.filters[i].relationalOperator) +
          " " +
          filter.filters[i].value;
      }
    }

    return str + ")";
  }
}
