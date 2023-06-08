import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StorageComponent } from './components/storage/storage.component';
import { StorageResolver } from './shared/services/storage.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'storage', pathMatch: 'full' },
  { 
    path: 'storage', 
    component: StorageComponent,
    resolve: { storages: StorageResolver },
  },
  {
    path: 'storage/:id',
    component: StorageComponent 
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
