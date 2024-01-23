import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BreakingNewsService } from '../service/breakingnews.service';
import { takeWhile } from 'rxjs';

@Component({
  selector: 'app-breakingnews',
  templateUrl: './breakingnews.component.html',
  styleUrls: ['./breakingnews.component.scss']
})
export class BreakingnewsComponent implements OnInit {
  processedLanguages: any[] = [];

  constructor(private breakingNewsService: BreakingNewsService) {}

  ngOnInit() {
    this.breakingNewsService.getLanguages().subscribe(data => {
      console.log("🤜 ~ data:", data.data)
      
      this.processLanguages(data.data.languages);
    });
  }
  
  processLanguages(languages: any[]): void {
    console.log("🤜 ~ languages:", languages)
    
    // Kiểm tra xem languages có tồn tại và là một mảng không
    if (languages && Array.isArray(languages)) {
      // Sử dụng forEach chỉ khi languages là một mảng hợp lệ
      languages.forEach(language => {
        const code = language.code;
        const name = language.name;
  
        const processedLanguage = { code, name };
        this.processedLanguages.push(processedLanguage);
      });
    }
    console.log(this.processedLanguages);
  }

}
