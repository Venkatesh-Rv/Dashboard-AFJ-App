import { Component, OnInit, Input } from '@angular/core';
import { PostService } from "../services/post.service"

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  @Input() getvalue

  constructor(private po: PostService) { }
  objprod: any = {}
  ngOnInit(): void {
    console.log(this.getvalue);
    this.getdata(this.getvalue)
    

  }


  private getdata(id) {

    this.po.getProduct().subscribe(ele => {

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
}
