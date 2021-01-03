import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CreateAssessmentService} from '../services/create-assessment.service';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-assessment-details',
  templateUrl: './add-assessment-details.component.html',
  styleUrls: ['./add-assessment-details.component.css']
})
export class AddAssessmentDetailsComponent implements OnInit {

  ass_title: String = '';
  ass_subject: String = '';
  ass_std: String = '';
  ass_marks: number;
  ass_passing_marks: number;
  ass_duration: number;
  start_date: Date = new Date();
  teacher_id: String = 'T101PAR';

  @ViewChild('picker') picker: any;
  constructor(
    public dialogRef: MatDialogRef<AddAssessmentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public createAssessmentService: CreateAssessmentService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'left',
      verticalPosition: 'top',
    });
  }

  createAssessment(){
    const ass_data = {
      title: this.ass_title,
      std: this.ass_std,
      duration: this.ass_duration,
      marks: this.ass_marks,
      passing_marks: this.ass_passing_marks,
      subject_code: this.ass_subject,
      teacher_id: this.teacher_id,
      start_date: this.start_date
    };
    let ass_response;
    this.createAssessmentService.createAssessment(ass_data).subscribe(res => {
      if (res.status === 200){
        ass_response = res;
        this.openSnackBar(ass_response.body.message, 'ok');
        this.dialogRef.close();
      }
    }, err => {
      console.log(err);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
