import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { PostService } from '../services/post.service';
import { SucesslogginggService } from "../services/sucessloggingg.service"
import { ProductModel } from './createproduct.model';


@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css']
})
export class CreateproductComponent implements OnInit {

  name: string;
  cover: File;
  description: any = {};
  loaderbool: boolean = false;
  price: string;
  Discount: string;
  selectCat: string;
  changeporperty: string;
  buttonboool: boolean = true;

  //
  imageURL: string;
  formValue: FormGroup;
  productModelObj : ProductModel = new ProductModel();
  allproductData:any;
  showCreate:boolean;
  showUpdate:boolean;

  constructor(private http: HttpClient, private postMethod: PostService,
     private successmsg: SucesslogginggService, private fb: FormBuilder) { 
    // Reactive Form
    // this.uploadForm = this.fb.group({
    //   avatar: [null],
    //   name: ['']
    // })
  }

  ngOnInit(): void {
    this.formValue = this.fb.group({
      name:[''],
      sampleFile:[''],
      banner:[''],
      description:[''],
      price:[''],
      offerprice:[''],
      category:['']
    })

    this.getAllProduct();
  }


  onNameChanged(event: any) {

    this.name = event.target.value;
    console.log(this.name)

  }

  onFileSelect(event) {

    this.cover = (event.target as HTMLInputElement).files[0];
    console.log(this.cover)

    // const file=(event.target as HTMLInputElement).files[0];
    this.formValue.patchValue({
      sampleFile: this.cover
    });
    // this.formValue.get('sampleFile').updateValueAndValidity();
  }


  onDesChanged(event) {
    this.description.des = event.target.value;
  }


  onPriceChanged(event) {
    this.price = event.target.value;
  }


  onDiscountChanged(event) {
    this.Discount = event.target.value;
  }


  onSelectChange(event) {
    this.selectCat = event.target.value;
    console.log(this.selectCat);
    this.buttonboool = false
    this.chooseswitch(this.selectCat);
  }

  upload() {
    const uploadData = new FormData();
    uploadData.append('name', this.name);
    console.log(this.description)

    console.log(this.changeporperty);

    uploadData.append(`${this.changeporperty}_cosmetics_image`, this.cover, this.cover.name);
    uploadData.append('description ', JSON.stringify(this.description));
    uploadData.append('price', this.price);
    uploadData.append('weight', this.Discount);
    uploadData.append('category', this.selectCat);

    this.loaderbool = true;

    this.postMethod.postData(`http://ec2-13-232-92-217.ap-south-1.compute.amazonaws.com/${this.selectCat}/create/`, uploadData).subscribe(ele => this.successmsg.SuccessLog(ele, 'acessoriestabel'))


  }

  //

  clickAddProduct(){
    this.formValue.reset();
    this.showCreate = true;
    this.showUpdate = false;
  }

  postProductDetails(){
    this.productModelObj.name = this.formValue.value.name;
    this.productModelObj.image = this.formValue.value.get("sampleFile").value;
    this.productModelObj.description = this.formValue.value.description;
    this.productModelObj.price = this.formValue.value.price;
    this.productModelObj.offerprice = this.formValue.value.offerprice;
    this.productModelObj.category = this.formValue.value.category;

    this.postMethod.postProduct(this.productModelObj).subscribe(res=>{
      console.log(res);
      alert('Product added Successfully')
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllProduct()
    },
    err=>{
      alert('Failed to add product')
    })
  }

  getAllProduct(){
    this.postMethod.getProduct().subscribe(res=>{
      this.allproductData =res;
    })
  }


  deleteProduct(row:any){
    this.postMethod.deleteProduct(row.id).subscribe(res=>{
      alert('deleted successfully')
      this.getAllProduct();
    })
  }

  onEdit(row:any){
    this.showCreate = false;
    this.showUpdate = true;
    this.productModelObj.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['description'].setValue(row.description);
    this.formValue.controls['price'].setValue(row.price);
    this.formValue.controls['offerprice'].setValue(row.offerprice);
    this.formValue.controls['category'].setValue(row.category);
  }

  editProductDetails(){
    this.productModelObj.name = this.formValue.value.name;
    this.productModelObj.description = this.formValue.value.description;
    this.productModelObj.price = this.formValue.value.price;
    this.productModelObj.offerprice = this.formValue.value.offerprice;
    this.productModelObj.category = this.formValue.value.category;

    this.postMethod.updateProduct(this.productModelObj,this.productModelObj.id)
    .subscribe(res=>{
      alert("Updated Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllProduct()
    })

  }

  private chooseswitch(getinput) {

    switch (getinput) {
      case 'Please Select the option':
        this.buttonboool = true;

      case 'eye':

        this.changeporperty = 'face'

        break

      case 'face':

        this.changeporperty = 'face'
        break

      case 'foot/and/nail':
        this.changeporperty = 'foot_and_nail'
        break
      case 'lip':
        this.changeporperty = 'lips'

    }

  }

   // Image Preview
  //  showPreview(event) {
  //   const file = (event.target as HTMLInputElement).files[0];
  //   this.uploadForm.patchValue({
  //     avatar: file
  //   });
  //   this.uploadForm.get('avatar').updateValueAndValidity()

  //   // File Preview
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imageURL = reader.result as string;
  //   }
  //   reader.readAsDataURL(file)
  // }

  // Submit Form
//   submit() {
//     console.log(this.uploadForm.value)
//   }



}
