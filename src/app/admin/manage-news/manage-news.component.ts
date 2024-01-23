import { DatePipe } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageViewComponent } from 'src/app/image-view/image-view.component';
import { NewsService } from 'src/app/service/news.service';
import { ToastService } from 'src/app/service/toast.service';
import { NewsAddComponent } from './news-add/news-add.component';
import { NeweditComponent } from './newedit/newedit.component';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-manage-news',
  templateUrl: './manage-news.component.html',
  styleUrls: ['./manage-news.component.scss']
})
export class ManageNewsComponent {
  currentPage: number = 1;
  dataNews: any = [];
  supplier: any;
  constructor(
    private newsService: NewsService,
    private toastService: ToastService,
    public dialog: MatDialog,
    private elementRef: ElementRef,
    private datePipe: DatePipe
    ) {}

  formatDate(date: string | Date): string {
      return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm:ss') || '';
    }
    viewImage(url: string) {
    const dialogRef = this.dialog.open(ImageViewComponent, {
      width: '600px',
      height: '600px',
      data: {
        imageUrl: url
      }
    });
  }
  ngOnInit(): void {
    this.getNews();
  }
  

  getNews() {
    this.newsService.getNews().subscribe(data => {
      this.dataNews = data;
      console.log("🤜 ~ dataNews:", this.dataNews)
    });
  }

  addNews() {
    const dialogRef = this.dialog.open(NewsAddComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getNews();
    });
  }

  updateSup(item: any) {
    const dialogRef = this.dialog.open(NeweditComponent, {
      width: '700px',
      data: {
        news: item,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getNews();
    });
  }


  deleteSup(id: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `Are you sure you want to delete?`,
        message: `Confirm delete?`
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.newsService.delete(id).subscribe(res => {
        }, (err) => {
          this.getNews();
          switch(err?.error?.text) {
            case 'deleted': {
              this.toastService.show('Delete Successfully!!!', 'err');
              break;
            }
          }
          }
        )
      }
    });
  }
}
