import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { Employee } from '../shared/employee';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})

export class EmployeeListComponent implements OnInit {
  p: number = 1;
 Employee: Employee[];
  hideWhenNoEmployee: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;

  constructor(public crudApi: CrudService, public toastr: ToastrService) {}

  ngOnInit() {
    this.dataState();
    let s = this.crudApi.GetEmployeesList();
    s.snapshotChanges().subscribe((data) => {
      this.Employee = [];
      data.forEach((item) => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Employee.push(a as Employee);
      });
    });
  }

  dataState() {
    this.crudApi
      .GetEmployeesList()
      .valueChanges()
      .subscribe((data) => {
        this.preLoader = false;
        if (data.length <= 0) {
          this.hideWhenNoEmployee = false;
          this.noData = true;
        } else {
          this.hideWhenNoEmployee = true;
          this.noData = false;
        }
      });
  }

  deleteEmployee(employee) {
    if (window.confirm('Are sure you want to delete this employee ?')) {
      this.crudApi.DeleteEmployee(employee.$key);
      this.toastr.success(employee.firstName + ' successfully deleted!');
    }
  }
}
