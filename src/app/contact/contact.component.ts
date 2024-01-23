import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';
import { ToastService } from '../service/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder và FormGroup
import { ContactService } from '../service/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  userData: any;
  contactForm: any 
  

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private contactService: ContactService,
    private toastService: ToastService,

  ) {}
  
  
ngOnInit(): void {
  this.authService.userData$.subscribe((userData) => {
    console.log("🤜 ~ userData:", userData)
    if (userData) {
      this.userData = userData;
      this.contactForm = this.fb.group({
        content: ['', Validators.required],
        userId: [this.userData?.id],
        email: ['', [Validators.required, Validators.email]],
      });
      this.getUserInfo(this.userData?.account, this.userData?.password);
    }
  });
}
  getUserInfo(account: string, password:string){
    this.userService.getuserinfo({account,password}).subscribe((data) =>{
      this.userData = data;
      console.log("🤜 ~ data:", data)
    })
  }
  add() {
    const contact = {
      'content': this.contactForm.value.content,
      'users_id':this.userData?.id
    }
      console.log("🤜 ~ this.contactForm.value.content:", this.contactForm.value.content)
      console.log("🤜 ~ userData?.id:", this.userData?.id)

    this.contactService.addContact(contact).subscribe(res => {
    }, (err) => {
      switch(err?.error?.text) {
        
        case "inserted": {
          this.toastService.show(`Cảm ơn ${this.userData?.name} Đã góp ý`);
          this.clearForm();
          break;
        }
        case "insert fail": {
          this.toastService.show(`Thất bại`);
          this.clearForm();
          break;
        }
      }
    })
  }
  clearForm() {
    this.contactForm = this.fb.group({
      content: ['', Validators.required],
    });
  }
  
}
