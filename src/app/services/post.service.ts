import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'

import {HttpClient} from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }


url:string=''; /*TO BE CHANGED TO ENV VAR */

//
link:string ='';


postData(url,getData){

return this.http.post(url,getData)

}


postProduct(data:any){
  return this.http.post<any>("http://ec2-13-232-92-217.ap-south-1.compute.amazonaws.com/product/create/",data)
  // return this.http.post<any>("http://localhost:4000/posts/",data)
  .pipe(map((res:any)=>{
    return res;
  }))
}

getProduct(){
  return this.http.get<any>("http://localhost:4000/posts")
  .pipe(map((res:any)=>{
    return res;
  }))
}

updateProduct(data:any,id:number){
  return this.http.put<any>("http://localhost:4000/posts/"+id,data)
  .pipe(map((res:any)=>{
    return res;
  }))
}

deleteProduct(id:number){
  return this.http.delete<any>("http://localhost:4000/posts/"+id)
  .pipe(map((res:any)=>{
    return res;
  }))
}


}
