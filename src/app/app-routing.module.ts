import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { LoginComponent } from "./login/login.component";

export const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: "full"},
  {path: "login", component: LoginComponent},
  {path: "admin", component: AdminComponent},
/*   {path: "votacao", component: VotacaoComponent},
  {path: "apuracao", component: ApuracaoComponent} */
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{

}
