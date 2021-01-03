import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CreateQuestionService} from '../services/create-question.service';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-question-dialog',
  templateUrl: './add-question-dialog.component.html',
  styleUrls: ['./add-question-dialog.component.css']
})
export class AddQuestionDialogComponent implements OnInit {

  ass_id: string ;
  question: string='';
  ans: string='';
  marks: number;
  constructor(
    public dialogRef: MatDialogRef<AddQuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public createQuestionService: CreateQuestionService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.ass_id= this.data.ass_id;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'left',
      verticalPosition: 'top',
    });
  }

  addQuestion(){
    const question_data={
      assessment_id:this.ass_id,
      question:this.question,
      ans:this.ans,
      marks:this.marks
    };
    let response;
    this.createQuestionService.createQuestion(question_data).subscribe( res => {
      if(res.status == 200){
        response =res;
        this.openSnackBar(response.body.message,'close');
      }
    }, err => {
      console.log(err);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
