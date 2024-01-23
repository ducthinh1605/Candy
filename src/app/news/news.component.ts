import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../service/loading.service';
import { NewsService } from '../service/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
 news:any;
 newsId:any;

  constructor(
    
    private router: Router,
    public loadingService: LoadingService,
    public newsService: NewsService,
    public rout: ActivatedRoute,

  ) { }

  ngOnInit() {
    
    this.rout.queryParams.subscribe(params => {
      this.newsId = params['newsId'];
      console.log("🤜 ~ newsId:", this.newsId)
      this.newsService.getById(this.newsId).subscribe((data) => {
        this.news = data;
          console.log("🤜 ~ data:", data)
          this.loadingService.hideLoading();
        });
      });
    }
  }