import { Component,Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewsService } from 'src/app/service/news.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-newedit',
  templateUrl: './newedit.component.html',
  styleUrls: ['./newedit.component.scss']
})
export class NeweditComponent {
      news: any;
      editForm: any;
      uploadedImageUrl: any;
    
      constructor(
        private router: Router,
        private fb: FormBuilder,
        private toastService: ToastService,
        public dialogRef: MatDialogRef<NeweditComponent>,
        private NewsService: NewsService,
        @Inject(MAT_DIALOG_DATA) public dataNews: { news: any},
      ) {}
    
      ngOnInit(): void {
        this.news = this.dataNews.news;
        console.log("🤜 ~ data:", this.dataNews)
        this.buildForm();
      }

      buildForm() {
        this.editForm = this.fb.group({
          title: [this.news.title, Validators.required],
          // img: [this.news.img, Validators.required],
          content: [this.news.content, Validators.required],
        });
      }
      
    
      onNoClick(): void {
        this.dialogRef.close();
      }
      onUploadComplete(info: any) {
        this.uploadedImageUrl = info.cdnUrl;
        console.log("🤜 ~ info.cdnUrl:", info.cdnUrl)
        
      }
    
    clearForm() {
      this.editForm = this.fb.group({
      title: ['', Validators.required],
      // img: ['', Validators.required],
      content: ['', Validators.required],
  });
}

    
      edit() {
        const news = {  
          "id": this.news?.id,
          'title':this.editForm.value.title,
          // 'img': this.editForm.value.img,
          'img': this.uploadedImageUrl,
          'content': this.editForm.value.content,
        }
    
        this.NewsService.update(news).subscribe(res => {
        }, (err) => {
          switch(err?.error?.text) {
            case "updated": {
              this.toastService.show(`Update successfully!`);
              this.clearForm();
              break;
            }
          }
        })
      }
    }
