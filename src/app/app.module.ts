import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { Router, RouterModule } from "@angular/router"
import { HttpClientModule } from "@angular/common/http"
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { HomeComponent } from './home/home.component';
import { UploadbannerComponent } from './uploadbanner/uploadbanner.component';
import { FileDirective } from './directives/file.directive';

import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { PostService } from "./services/post.service"
import { SucesslogginggService } from "./services/sucessloggingg.service"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { CosmetictableComponent } from './datatable/cosmetictable/cosmetictable.component';
import { AcessoriesComponent } from './datatable/acessories/acessories.component';
import { LoaderComponent } from './core/loader/loader.component';
import { CreateproductComponent } from './createproduct/createproduct.component';
import { BannerComponent } from './banner/banner.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes = [
  { path: '', component: LoginComponent },
  { path: 'uploadbanner', component: UploadbannerComponent },
  { path: 'banner', component: BannerComponent },
  {path: 'Addprod', component: CreateproductComponent },

  // { path: 'AddCosmetic', component: CosmeticsCreateComponent },
  { path: 'Cosmetictabel', component: CosmetictableComponent },
  { path: 'acessoriestabel', component: AcessoriesComponent },
  { path: 'LoaderTesting', component: LoaderComponent },

]

@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    HomeComponent,
    UploadbannerComponent,
    FileDirective,
    // CosmeticsCreateComponent,
    LoginComponent,
    CosmetictableComponent,
    AcessoriesComponent,
    LoaderComponent,
    CreateproductComponent,
    BannerComponent,
    EditProductComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule.forRoot(routes),
    // ,{ scrollPositionRestoration: 'enabled' ,anchorScrolling:'enabled'}

    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    NgbModule
  ],
  providers: [PostService, SucesslogginggService],
  bootstrap: [AppComponent]
})
export class AppModule { }
