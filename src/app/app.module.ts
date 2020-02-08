import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RecipeComponent} from './dashboard/recipe/recipe.component';
import {RecipeViewComponent} from './dashboard/recipe-view/recipe-view.component';
import {UserComponent} from './dashboard/user/user.component';
import { RecipeFormComponent } from './dashboard/recipe-form/recipe-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule } from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule} from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavigationBarComponent,
    DashboardComponent,
    RecipeComponent,
    RecipeViewComponent,
    UserComponent,
    RecipeFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgFlashMessagesModule.forRoot(),
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
