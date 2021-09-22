import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { ApuracaoComponent } from "./apuracao/apuracao.component";
import { LoginComponent } from "./login/login.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { VotacaoComponent } from "./votacao/votacao.component";

export const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: "full"},
  {path: "login", component: LoginComponent},
  {path: "admin", component: AdminComponent},
  {path: "votacao", component: VotacaoComponent},
  {path: "**", component: PageNotFoundComponent},
  {path: "apuracao", component: ApuracaoComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{

}
