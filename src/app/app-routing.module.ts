import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'auth-screen', pathMatch:'full' },
  {
    path:'intro', loadChildren: () => import('./auth-screens/intro/intro.module').then(m => m.IntroPageModule)
  },
  {
    path: 'auth-screen',
    loadChildren: () => import('./auth-screens/auth-screen/auth-screen.module').then( m => m.AuthScreenPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
