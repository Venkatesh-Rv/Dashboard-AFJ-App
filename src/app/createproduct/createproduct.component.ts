import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
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
  reader = new FileReader();
  description: any = {};
  loaderbool: boolean = false;
  price: string;
  Discount: string;
  selectCat: string;
  changeporperty: string;
  buttonboool: boolean = true;
  closeResult = '';

  //
  imageURL: string;
  imgName: string = 'Upload Image'
  formValue: FormGroup;
  productModelObj : ProductModel = new ProductModel();
  allproductData:any;
  showCreate:boolean;
  showUpdate:boolean;

  objprod: any = {}
 getid:number
  constructor(private http: HttpClient, private postMethod: PostService,
     private successmsg: SucesslogginggService, private fb: FormBuilder,
     private modalService: NgbModal) { 
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

    this.cover = event.target.files[0];
    this.reader.readAsDataURL(event.target.files[0])
    console.log(this.reader);
    console.log(this.cover);
    this.imgName = this.cover.name

    // const file=(event.target as HTMLInputElement).files[0];
    // this.formValue.patchValue({
    //   sampleFile: this.cover
    // });
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

  create() {
    const uploadData = new FormData();
    uploadData.append('name', this.name);
    console.log(this.description)

    console.log(this.changeporperty);
    console.log(this.selectCat)

    // uploadData.append(`${this.changeporperty}_cosmetics_image`, this.cover, this.cover.name);
    uploadData.append('image', this.cover);
    uploadData.append('description ', JSON.stringify(this.description));
    uploadData.append('price', this.price);
    uploadData.append('offer', this.Discount);
    uploadData.append('category', this.selectCat);

    this.loaderbool = true;

    this.postMethod.postData(`http://ec2-13-232-92-217.ap-south-1.compute.amazonaws.com/product/create/`, uploadData)
    .subscribe(ele => this.successmsg.SuccessLog(ele, 'acessoriestabel')
    ,error => {
      this.loaderbool=false;
      alert('Please enter the details correctly!!')
      })

  }
 
  //

  clickAddProduct(){
    this.formValue.reset();
    this.showCreate = true;
    this.showUpdate = false;
  }

  postProductDetails(){
    this.productModelObj.name = this.formValue.value.name;
    // this.productModelObj.image = this.formValue.value.get("sampleFile").value;
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
      console.log(res)
      this.allproductData =res;
    })
  }


  deleteProduct(row:any){
    this.postMethod.deleteProduct(row.id).subscribe(res=>{
      alert('deleted successfully')
      this.getAllProduct();
    })
  }

  onNameChangededit(event: any) {

    this.name = event.target.value;
    console.log(this.name)

  }

  onFileSelectedit(event) {

    this.cover = event.target.files[0];
    console.log(this.cover);
    this.imgName = this.cover.name
    

    // const file=(event.target as HTMLInputElement).files[0];
    // this.formValue.patchValue({
    //   sampleFile: this.cover
    // });
    // this.formValue.get('sampleFile').updateValueAndValidity();
  }


  onDesChangededit(event) {
    this.description.des = event.target.value;
  }


  onPriceChangededit(event) {
    this.price = event.target.value;
  }


  onDiscountChangededit(event) {
    this.Discount = event.target.value;
  }


  onSelectChangeedit(event) {
    this.selectCat = event.target.value;
    console.log(this.selectCat);
    this.buttonboool = false
    this.chooseswitch(this.selectCat);
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
    console.log(this.productModelObj.id)
    this.update(this.productModelObj.id)
  }

  update(id){
    this.postMethod.getProduct().subscribe(ele => {
  
      ele.forEach(ele => {
  
        if (ele.id === id) {
          console.log('hello')
          this.objprod = ele
          console.log(this.objprod)
  
        }
        return
      })
  
    })
    console.log(this.objprod)
   }

//product edit
   submitedit(){
    const editData = new FormData();
    editData.append('name', this.name);
    console.log(this.description)

    console.log(this.changeporperty);
    console.log(this.selectCat)

    // uploadData.append(`${this.changeporperty}_cosmetics_image`, this.cover, this.cover.name);
    // editData.append('image', this.cover);
    editData.append('description ', JSON.stringify(this.description));
    editData.append('price', this.price);
    editData.append('offer', this.Discount);
    editData.append('category', this.selectCat);

    for (var value of editData.values()) {
      console.log(value);
   }

  //  this.loaderbool = true;

  //   this.postMethod.postData(`http://ec2-13-232-92-217.ap-south-1.compute.amazonaws.com/product/create/`, uploadData)
  //   .subscribe(ele => this.successmsg.SuccessLog(ele, 'acessoriestabel')
  //   ,error => {
  //     this.loaderbool=false;
  //     alert('Please enter the details correctly!!')
  //     })
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

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
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
