import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DataComponent } from './components/data/data.component';
import { TemplateComponent } from './components/template/template.component';


const routes: Routes = [
  {
    path: 'data',
    component: DataComponent
  },
  {
    path: 'template',
    component: TemplateComponent
  },
  {
    path: '**', pathMatch: 'full', redirectTo: 'data'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
