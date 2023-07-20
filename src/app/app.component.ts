import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'reactive-forms';
  form: FormGroup = this.fb.group([]);
  forbiddenProjectName = ['Test'];
  projectStatus: Array<string> = [
    "Stable",
    "Critical",
    "Finished"
  ]

  constructor(
    private fb: FormBuilder
  ){
  }

  ngOnInit() {
   this.form = new FormGroup({
    project_name: new FormControl(null, [Validators.required,
      this.forbiddenNames.bind(this)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    project_status: new FormControl(null, Validators.required)
   }) 
   console.log('show me form', this.form);
   console.log('show me form controls',  this.form.get('project_name')?.hasError('required'));
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } | null {
    if (this.forbiddenProjectName.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  onSubmit():void {
    console.log(this.form);
  }
}
