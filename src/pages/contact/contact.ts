import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactProvider } from '../../providers/contact/contact';


@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  title: string;
  form: FormGroup;
  contact: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private provider: ContactProvider,
    private toast: ToastController,
    private formBuilder: FormBuilder) {
      this.contact = this.navParams.data.contact || {};
      this.createForm();
      this.setupPageTitle();
  }


  private setupPageTitle(){
    this.title = this.navParams.data.contact ? 'Alterando contato' : 'Novo Contato';
  }

  createForm(){
    this.form = this.formBuilder.group({
      key: [this.contact.key],
      name: [this.contact.name, Validators.required],
      tel: [this.contact.tel, Validators.required]
    });
  }

  onSubmit(){
    if(this.form.valid){
      this.provider.save(this.form.value)
      .then(()=>{
        this.toast.create({message:'Contato salvo com suceesso.', duration: 3000}).present();
        this.navCtrl.pop();
      })
      .catch((e)=>{
        this.toast.create({message:'Erro ao salvar contato.', duration: 3000}).present();
        console.error(e);
      })
    }
  }

}
