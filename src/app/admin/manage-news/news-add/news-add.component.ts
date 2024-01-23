import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewsService } from 'src/app/service/news.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.scss']
})
export class NewsAddComponent {
  suppliers: any;
  uploadedImageUrl: any;

  addNewForm: any = this.fb.group({
    title: ['', Validators.required],
    // img: ['', Validators.required],
    content: ['', Validators.required],
  });


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    private newsService: NewsService,
    public dialogRef: MatDialogRef<NewsAddComponent>,

  ) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onUploadComplete(info: any) {
    this.uploadedImageUrl = info.cdnUrl;
    console.log("🤜 ~ info.cdnUrl:", info.cdnUrl)
    
  }

  add() {
    const news = {
      'title': this.addNewForm.value.title,
      // 'img': this.addNewForm.value.img,
      'img': this.uploadedImageUrl,
      'content': this.addNewForm.value.content,
    }

    this.newsService.add(news).subscribe(res => {
    }, (err) => {
      switch(err?.error?.text) {
        case "inserted": {
          this.toastService.show(`Add ${news?.title} successfully!`);
          this.clearForm();
          break;
        }
      }
    })
  }

  clearForm() {
    this.addNewForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

}
